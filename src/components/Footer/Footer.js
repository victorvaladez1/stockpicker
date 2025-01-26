import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>About Us</h4>
                <ul className="team-list">
                    <li className="team-member">
                        <span>Shaan Brahmbhatt | Backend Developer</span>
                        <iframe
                            src="https://www.linkedin.com/in/shaan-brahmbhatt-711369323/"
                            title="Shaan's LinkedIn"
                            className="linkedin-iframe"
                        ></iframe>
                    </li>
                    <li className="team-member">
                        <span>Victor Valadez | Frontend Developer</span>
                        <iframe
                            src="https://www.linkedin.com/in/victor-valadez-963512282/"
                            title="Victor's LinkedIn"
                            className="linkedin-iframe"
                        ></iframe>
                    </li>
                    <li className="team-member">
                        <span>Ayodele Aina | Backend Developer</span>
                        <iframe
                            src="https://www.linkedin.com/in/ayodele-aina/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            title="Ayodele's LinkedIn"
                            className="linkedin-iframe"
                        ></iframe>
                    </li>
                    <li className="team-member">
                        <span>Aganze Hamuli | Web Design</span>
                        <iframe
                            src="https://www.linkedin.com/in/aganze-hamuli-684b84279"
                            title="Aganze's LinkedIn"
                            className="linkedin-iframe"
                        ></iframe>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
