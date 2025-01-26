import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Portfolio from "./pages/Portfolio";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-white shadow-md">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recommendations">Analysis</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
