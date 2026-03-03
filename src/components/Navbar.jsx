import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('mind-orbit-user'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Listen for storage changes to update auth state
    const handleAuthChange = () => {
      setUser(localStorage.getItem('mind-orbit-user'));
    };
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mind-orbit-user');
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="Mind Orbit" className="logo-img" style={{ height: '80px', padding: '10px 0' }} />
            {/* <span className="logo-text">Mind Orbit</span> */}
          </motion.div>
        </Link>

        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/emotions" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>Emotions</motion.span>
          </Link></li>
          <li><Link to="/manifesto" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>Manifesto</motion.span>
          </Link></li>
          <li><Link to="/self-awareness" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>Self-Awareness</motion.span>
          </Link></li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>About Us</motion.span>
          </Link></li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>Contact Us</motion.span>
          </Link></li>
          <li className="mobile-only-cta">
            {user ? (
              <div className="mobile-auth-stack">
                <Link to="/profile" className="btn btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="btn btn-primary" style={{ background: '#EF4444' }}>Logout</button>
              </div>
            ) : (
              <div className="mobile-auth-stack">
                <Link to="/find-profile" className="btn btn-outline" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                <Link to="/try-now" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Try now</Link>
              </div>
            )}
          </li>
        </ul>

        <motion.div
          className="nav-cta desktop-only"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user ? (
            <>
              <Link to="/profile" className="btn btn-outline">Profile</Link>
              <button onClick={handleLogout} className="btn btn-primary" style={{ background: '#EF4444' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/find-profile" className="btn btn-outline">My Profile</Link>
              <Link to="/try-now" className="btn btn-primary">Try now</Link>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
