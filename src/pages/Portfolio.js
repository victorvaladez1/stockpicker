import React from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";

const Portfolio = () => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h1>My Portfolio</h1>
                <p>Welcome to the Portfolio page! Here you'll find information about your stock portfolio.</p>
                {/* Add portfolio details below */}
                <div>
                    <h2>Stocks Overview</h2>
                    <ul>
                        <li>Stock A: 10 shares at $100</li>
                        <li>Stock B: 5 shares at $50</li>
                        <li>Stock C: 20 shares at $200</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Portfolio;
