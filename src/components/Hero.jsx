import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroIllustration from '../assets/hero_illustration.png';
import './Hero.css';

const FLOATING_BADGES = [
    { emoji: '🧘', text: 'Control Stress', cls: 'badge-top-right', delay: 0 },
    { emoji: '🧠', text: 'Understand Emotions', cls: 'badge-mid-left', delay: 0.8 },
    { emoji: '🌱', text: 'Build Better Habits', cls: 'badge-bottom-right', delay: 1.6 },
    { emoji: '✨', text: 'EQ Score +18 pts', cls: 'badge-top-left', delay: 2.4 },
];

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-grid">

                {/* ── LEFT: Text Content ── */}
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <span className="hero-badge">Mind Orbit — Emotions Coach</span>
                    <h1 className="hero-title">
                        Master Your Inner World with{' '}
                        <span className="highlight">Mind Orbit</span>
                    </h1>
                    <p className="hero-subtitle">
                        Take control of stress, anxiety, and anger. Understand your emotions
                        and build life-changing habits with your AI-powered companion.
                    </p>
                    <div className="hero-actions">
                        <Link to="/try-now" className="btn btn-primary">
                            Start Your Journey
                        </Link>
                        <div className="rating">
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <p>Premium Emotional Coaching</p>
                        </div>
                    </div>

                    {/* trust row */}
                    <div className="hero-trust-row">
                        <div className="trust-item">
                            <strong>12K+</strong>
                            <span>Active Users</span>
                        </div>
                        <div className="trust-divider" />
                        <div className="trust-item">
                            <strong>98%</strong>
                            <span>Satisfaction</span>
                        </div>
                        <div className="trust-divider" />
                        <div className="trust-item">
                            <strong>28 Days</strong>
                            <span>Transformation</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── RIGHT: Illustration Visual ── */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
                >
                    {/* Glow backdrop */}
                    <div className="visual-glow" />

                    {/* Image */}
                    <motion.img
                        src={heroIllustration}
                        alt="Emotional Intelligence Illustration"
                        className="hero-illustration"
                        animate={{ y: [0, -14, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    />

                    {/* Live activity chip — bottom center */}
                    <motion.div
                        className="live-chip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="live-dot" />
                        <span>3,240 people growing their EQ today</span>
                    </motion.div>

                    {/* Floating Badges */}
                    {FLOATING_BADGES.map((b, i) => (
                        <motion.div
                            key={i}
                            className={`hero-float-badge ${b.cls}`}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -10, 0],
                            }}
                            transition={{
                                opacity: { duration: 0.5, delay: b.delay + 0.5 },
                                scale: { duration: 0.5, delay: b.delay + 0.5 },
                                y: { repeat: Infinity, duration: 4 + i * 0.5, ease: 'easeInOut', delay: b.delay },
                            }}
                        >
                            <span className="fl-emoji">{b.emoji}</span>
                            <span className="fl-text">{b.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
