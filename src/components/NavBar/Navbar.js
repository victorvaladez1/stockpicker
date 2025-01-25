import React from "react";
import "../NavBar/NavBar.css";

const NavBar = () => {
    return (
        <nav className="navBar">
            <ul className="navList">
                <li className="navItem">
                    <a href="#account" className="navLink">Account</a>
                </li>
                <li className="navItem">
                    <a href="#mystocks" className="navLink">My Stocks</a>
                </li>
                <li className="navItem">
                    <a href="#watchlist" className="navLink">Watchlist</a>
                </li>
                <li className="navItem">
                    <a href="#marketnews" className="navLink">Market News</a>
                </li>
                <li className="navItem">
                    <a href="#analytics" className="navLink">Analytics</a>
                </li>
                <li className="navItem">
                    <a href="#signin" className="navItemButton navButtonGrey">Sign in</a>
                </li>
                <li className="navItem">
                    <a href="#register" className="navItemButton navButtonDarkGrey">Register</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
