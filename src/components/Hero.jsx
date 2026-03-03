import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="hero-badge">Mind Thinker - Emotions Coach</span>
                    <h1 className="hero-title">
                        The Duolingo for your <span className="highlight">emotional intelligence</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your AI pocket therapist, built by scientists trained at Universities of Oxford, Cambridge, and Harvard.
                    </p>
                    <div className="hero-actions">
                        <a href="/downloads/mind-thinker-app.zip" download className="btn btn-primary">Download App</a>
                        <div className="rating">
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <p>100k+ downloads globally</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="image-wrapper">
                        <div className="illustration-fallback">
                            <span className="brain-emoji">🧠</span>
                            <div className="orb orb-1"></div>
                            <div className="orb orb-2"></div>
                        </div>
                        <div className="floating-card emotion-1">😃 Enjoy</div>
                        <div className="floating-card emotion-2">🧘 Calm</div>
                        <div className="floating-card emotion-3">🚀 Grow</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
