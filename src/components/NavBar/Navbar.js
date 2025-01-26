import React from "react";
import { Link } from "react-router-dom";
import "../NavBar/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <Link to="/" className="navLink">Home</Link> {/* Redirects to Home */}
                </li>
                <li className="navItem">
                    <a href="#analysis" className="navLink">Analysis</a>
                </li>
                <li className="navItem">
                    <a href="#marketnews" className="navLink">Market News</a>
                </li>
                <li className="navItem">
                    <a href="#portfolio" className="navLink">Portfolio</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
