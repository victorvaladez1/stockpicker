import axios from "axios";

const backendBaseURL = "https://stockpicker-2nv6.onrender.com/";

// Example: Fetch recommendations
const fetchRecommendations = async (goal, risk, amount) => {
  try {
    const response = await axios.post(`${backendBaseURL}/recommendations`, {
      goal,
      risk,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

// Example: Fetch portfolio
const fetchPortfolio = async () => {
  try {
    const response = await axios.get(`${backendBaseURL}/portfolio`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
  }
};