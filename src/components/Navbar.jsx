import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('mind-thinker-user'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Listen for storage changes to update auth state
    const handleAuthChange = () => {
      setUser(localStorage.getItem('mind-thinker-user'));
    };
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mind-thinker-user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="logo-icon">🧠</span>
            <span className="logo-text">mind-thinker</span>
          </motion.div>
        </Link>

        <ul className="nav-links">
          <li><Link to="/emotions">Emotions</Link></li>
          <li><Link to="/manifesto">Manifesto</Link></li>
          <li><Link to="/self-awareness">Self-Awareness</Link></li>
          <li><Link to="/work">Work With Us</Link></li>
        </ul>

        <motion.div
          className="nav-cta"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user ? (
            <>
              <Link to="/profile" className="btn btn-outline" style={{ marginRight: '10px' }}>Profile</Link>
              <button onClick={handleLogout} className="btn btn-primary" style={{ background: '#EF4444' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/find-profile" className="btn btn-outline" style={{ marginRight: '10px' }}>My Profile</Link>
              <Link to="/try-now" className="btn btn-primary">Try now</Link>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
