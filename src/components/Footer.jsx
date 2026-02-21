import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-top">
                    <div className="footer-logo">
                        <span className="logo-icon">🧠</span>
                        <span className="logo-text">mind-thinker</span>
                    </div>
                    <p className="footer-tagline">Your pocket coach to master emotions and transform your life.</p>
                </div>

                <div className="footer-grid">
                    <div className="footer-info">
                        <h4>Address</h4>
                        <p>Auguststraße 26, 10117 Berlin</p>
                        <p><a href="mailto:hi@mind-thinker.com">hi@mind-thinker.com</a></p>
                    </div>

                    <div className="footer-links">
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Mind-Thinker Solutions GmbH. All rights reserved.</p>
                    <div className="app-badges">
                        <span className="badge">App Store</span>
                        <span className="badge">Play Store</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
