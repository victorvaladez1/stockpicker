import React from "react";
import { useNavigate } from "react-router-dom";
import "../HeroSection/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Stock Picker</h1>
        <p>Powered by Finnhub</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
