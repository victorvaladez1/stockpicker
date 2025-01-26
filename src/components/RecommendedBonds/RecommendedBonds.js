import React from "react";
import "./RecommendedBonds.css";

const RecommendedBonds = () => {
    const bonds = [
        { title: "Bond A", symbol: "BND1", price: "$1,000", change: "+0.5%" },
        { title: "Bond B", symbol: "BND2", price: "$1,500", change: "+1.2%" },
    ];

    return (
        <div className="recommended-bonds-container">
            <h2>Bonds</h2>
            <div className="bonds-grid">
                {bonds.map((bond, index) => (
                    <div key={index} className="bond-card">
                        <div className="bond-image-placeholder">Image</div>
                        <h3>{bond.title}</h3>
                        <p>Symbol: {bond.symbol}</p>
                        <p>Price: {bond.price}</p>
                        <p>Change: {bond.change}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedBonds;
