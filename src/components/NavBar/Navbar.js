import React from "react";
import { Link } from "react-router-dom";
import "../NavBar/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <Link to="/" className="navLink">Home</Link>
                </li>
                <li className="navItem">
                    <Link to="/analysis" className="navLink">Analysis</Link> {/* Placeholder */}
                </li>
                <li className="navItem">
                    <Link to="/market-news" className="navLink">Market News</Link> {/* Placeholder */}
                </li>
                <li className="navItem">
                    <Link to="/portfolio" className="navLink">Portfolio</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
