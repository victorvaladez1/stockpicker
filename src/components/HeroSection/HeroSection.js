import React from "react";
import "../HeroSection/HeroSection.css"

const HeroSection = () => {
    return(
        <section className="hero-section">
            <div className="hero-content">
                <h1>Stock Picker</h1>
                <p>Powered by Alpha Vantage</p>
                <button className="get-started-btn">Get Started</button>
            </div>
        </section>
    );
};

export default HeroSection;
