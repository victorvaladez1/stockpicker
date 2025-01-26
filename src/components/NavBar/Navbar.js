import React from "react";
import { Link } from "react-router-dom";
import "../NavBar/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <Link to="/" className="navLink">Home</Link> {/* Proper React Router Link */}
                </li>
                <li className="navItem">
                    <Link to="/get-started" className="navLink">Get Started</Link> {/* Proper React Router Link */}
                </li>
                <li className="navItem">
                    <Link to="/portfolio" className="navLink">Portfolio</Link> {/* Proper React Router Link */}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
