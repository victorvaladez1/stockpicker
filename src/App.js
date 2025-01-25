import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import GetStarted from "./pages/GetStarted.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {}
        <Route path="/get-started" element={<GetStarted />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
