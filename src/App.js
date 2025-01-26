import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="p-4 bg-white shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recommendations">Analysis</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-black">Stock Picker</h1>
      <p className="text-lg text-gray-600 mt-2">Powered by Finnhub</p>
      <button
        onClick={() => navigate("/recommendations")}
        className="mt-6 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Get Started
      </button>
    </div>
  );
}

function Recommendations() {
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("medium");
  const [amount, setAmount] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post(
        "https://stockpicker-2nv6.onrender.com/recommendations",
        { goal, risk, amount }
      );
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Get Recommendations</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchRecommendations();
        }}
        className="space-y-4 mt-4"
      >
        <div>
          <label className="block font-medium">Goal:</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="e.g., retirement, education"
          />
        </div>
        <div>
          <label className="block font-medium">Risk Tolerance:</label>
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Investment Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Get Recommendations
        </button>
      </form>

      {recommendations && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-bold">Recommendations:</h3>
          <pre>{JSON.stringify(recommendations, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    axios
      .get("https://stockpicker-2nv6.onrender.com/portfolio")
      .then((response) => {
        setPortfolio(response.data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Portfolio</h2>
      {portfolio ? (
        <pre className="bg-gray-100 p-4 rounded-md">
          {JSON.stringify(portfolio, null, 2)}
        </pre>
      ) : (
        <p>Loading portfolio data...</p>
      )}
    </div>
  );
}

function AboutUs() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="text-lg mt-2">
        This project was created by Shaan Brahmbhatt as a tool for smart investment planning.
      </p>
    </div>
  );
}

export default App;
