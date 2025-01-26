import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Portfolio from "./pages/Portfolio";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
