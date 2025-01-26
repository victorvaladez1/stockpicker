import React from "react";
import { useLocation } from "react-router-dom";

const Analysis = () => {
  const { state } = useLocation();
  const { goal, risk, investment } = state || {}; // Ensure fallback if state is missing

  return (
    <div>
      <h1>Analysis Page</h1>
      <p><strong>Goal:</strong> {goal || "No goal specified"}</p>
      <p><strong>Risk Tolerance:</strong> {risk || "No risk level specified"}</p>
      <p><strong>Investment Amount:</strong> ${investment || "No amount specified"}</p>
    </div>
  );
};

export default Analysis;
