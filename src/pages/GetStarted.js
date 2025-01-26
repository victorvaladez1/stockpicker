import React from "react";
import Navbar from "../components/NavBar/Navbar.js"
import Footer from "../components/Footer/Footer.js"
import GetStartedHero from "../components/GetStartedHero/GetStartedHero.js";
import InvestmentCalculator from "../components/InvestmentCalculator/InvestmentCalculator.js";

const GetStarted = () => {
    return (
        <div>
            <Navbar />
            <GetStartedHero />
            <InvestmentCalculator />
            <Footer />
        </div>
    );
};

export default GetStarted;