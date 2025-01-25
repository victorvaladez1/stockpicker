import React from "react";
import "../NavBar/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <a href="#home" className="navLink">Home</a>
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
