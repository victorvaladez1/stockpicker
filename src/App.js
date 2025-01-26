import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [recommendations, setRecommendations] = useState(null); // State for recommendations
  const [portfolio, setPortfolio] = useState(null);             // State for portfolio
  const [loading, setLoading] = useState(true);                 // Loading state

  useEffect(() => {
    // Fetch recommendations
    axios
      .post("https://stockpicker-2nv6.onrender.com/recommendations", {
        goal: "retirement", // Example goal
        risk: "medium",     // Example risk level
        amount: 10000       // Example investment amount
      })
      .then((response) => {
        setRecommendations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });

    // Fetch portfolio
    axios
      .get("https://stockpicker-2nv6.onrender.com/portfolio")
      .then((response) => {
        setPortfolio(response.data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after all calls
      });
  }, []); // Empty dependency array ensures it runs once on component mount

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-500">Investment Dashboard</h1>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recommendations:</h2>
        {loading ? (
          <p>Loading recommendations...</p>
        ) : recommendations ? (
          <pre className="bg-gray-100 p-4 rounded-md">
            {JSON.stringify(recommendations, null, 2)}
          </pre>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Portfolio:</h2>
        {loading ? (
          <p>Loading portfolio...</p>
        ) : portfolio ? (
          <pre className="bg-gray-100 p-4 rounded-md">
            {JSON.stringify(portfolio, null, 2)}
          </pre>
        ) : (
          <p>No portfolio data available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
