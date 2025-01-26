import React from "react";
import "./StockRecommendations.css";

const StockRecommendations = () => {
  const dummyStocks = [
    { title: "Stock A", symbol: "AAPL", price: "$150", change: "+1.5%" },
    { title: "Stock B", symbol: "MSFT", price: "$250", change: "+2.1%" },
    { title: "Stock C", symbol: "GOOGL", price: "$2800", change: "-0.5%" },
    { title: "Stock D", symbol: "AMZN", price: "$3400", change: "+1.2%" },
    { title: "Stock E", symbol: "TSLA", price: "$900", change: "+3.0%" },
  ];

  return (
    <div className="recommended-stocks-container">
      <h2>Stocks</h2>
      <div className="stocks-grid">
        {dummyStocks.map((stock, index) => (
          <div className="stock-card" key={index}>
            <div className="stock-image-placeholder">Image</div>
            <h3>{stock.title}</h3>
            <p>Symbol: {stock.symbol}</p>
            <p>Price: {stock.price}</p>
            <p>Change: {stock.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockRecommendations;
