import React from "react";
import Navbar from "../components/NavBar/Navbar.js"
import Footer from "../components/Footer/Footer.js"
import HeroSection from "../components/HeroSection/HeroSection.js"

const Home = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px"}}>
            <Navbar />
            <HeroSection />
            <Footer />
        </div>

    );
};

export default Home;