import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Portfolio from "./pages/Portfolio";
import Analysis from "./pages/Analysis";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
