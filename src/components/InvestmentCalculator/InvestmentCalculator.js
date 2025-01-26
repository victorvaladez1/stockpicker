import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InvestmentCalculator.css";

const InvestmentCalculator = () => {
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("");
  const [investment, setInvestment] = useState("");
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (!goal || !risk || !investment) {
      alert("Please fill in all fields.");
      return;
    }

    // Redirect to Analysis page with state
    navigate("/analysis", {
      state: {
        goal,
        risk,
        investment: parseFloat(investment),
      },
    });
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
      </div>
    </div>
  );
};

export default InvestmentCalculator;
