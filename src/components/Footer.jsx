import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={logo} alt="logo" style={{ height: '60px' }} />
                            {/* <span className="logo-icon">✨</span> */}
                            {/* <span className="logo-text">Mind Orbit</span> */}
                        </div>
                        <p className="footer-tagline">
                            Master your emotions, transform your habits, and orbit around a better version of yourself.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">FB</a>
                            <a href="#" className="social-link" aria-label="Twitter">TW</a>
                            <a href="#" className="social-link" aria-label="Instagram">IG</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">LN</a>
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/emotions">Emotions</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><Link to="/try-now">Try Now</Link></li>
                                <li><Link to="/manifesto">Manifest</Link></li>
                                <li><Link to="/emotions">Emotions</Link></li>
                                <li><Link to="/self-awareness">Self Awareness</Link></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Legal</h4>
                            <ul>
                                <li><Link to="/find-profile">Find Profile</Link></li>
                                <li><Link to="/find-profile">User Dashboard</Link></li>
                                <li><Link to="/admin-login">Admin Dashboard</Link></li>
                                <li><Link to="/try-now">Take Assessment</Link></li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} Mind Orbit Solutions. All rights reserved.</p>
                        <div className="footer-address">
                            <span>📍 Mind Orbit
                                Suite 405, Innovation Tower
                                1234 Silicon Avenue United States</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
