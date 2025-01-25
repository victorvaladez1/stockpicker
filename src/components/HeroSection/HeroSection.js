import React from "react";
import { useNavigate } from "react-router-dom";
import "../HeroSection/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleGetStarted = () => {
    navigate("/get-started"); // Navigate to the Get Started page
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Stock Picker</h1>
        <p>Powered by Alpha Vantage</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
