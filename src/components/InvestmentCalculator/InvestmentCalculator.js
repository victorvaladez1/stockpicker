import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./InvestmentCalculator.css";

const InvestmentCalculator = () => {
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("");
  const [investment, setInvestment] = useState("");
  const [investmentData, setInvestmentData] = useState(null);

  const handleCalculate = () => {
    if (!goal || !risk || !investment) {
      alert("Please fill in all fields.");
      return;
    }

    const amount = parseFloat(investment);

    // Example breakdown logic
    let data = {};
    if (risk === "low") {
      data = { Bonds: amount * 0.7, Stocks: amount * 0.2, Cash: amount * 0.1 };
    } else if (risk === "medium") {
      data = { Bonds: amount * 0.4, Stocks: amount * 0.5, Cash: amount * 0.1 };
    } else if (risk === "high") {
      data = { Bonds: amount * 0.1, Stocks: amount * 0.8, Cash: amount * 0.1 };
    }

    setInvestmentData(data);
  };

  const chartData = {
    labels: investmentData ? Object.keys(investmentData) : [],
    datasets: [
      {
        data: investmentData ? Object.values(investmentData) : [],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        hoverBackgroundColor: ["#45a049", "#1976d2", "#ffa000"],
      },
    ],
  };

  return (
    <div className="investment-calculator-modern">
      <div className="calculator-grid">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="goal">Select Your Goal:</label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="retirement">Saving for Retirement</option>
              <option value="house">Saving for a House</option>
              <option value="car">Saving for a Car</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="risk">Select Your Risk Tolerance:</label>
            <select
              id="risk"
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="investment">Investment Amount ($):</label>
            <input
              type="number"
              id="investment"
              placeholder="Enter amount"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
            />
          </div>
          <button className="calculate-btn" onClick={handleCalculate}>
            Calculate
          </button>
        </div>
        <div className="chart-section">
          {investmentData && (
            <div>
              <h3>Investment Breakdown</h3>
              <Pie data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
