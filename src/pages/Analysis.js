import React from "react";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import AnalysisHero from "../components/AnalysisHero/AnalysisHero";
import StockRecommendations from "../components/StockRecommendations/StockRecommendations.js";
import RecommendedBonds from "../components/RecommendedBonds/RecommendedBonds.js";

const Analysis = () => {
    return (
        <div>
            <Navbar />
            <AnalysisHero />
            <StockRecommendations />
            <RecommendedBonds />
            <Footer />
        </div>
    );
};

export default Analysis;
