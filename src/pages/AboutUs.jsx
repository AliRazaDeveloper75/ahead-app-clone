import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const AboutUs = () => {
    return (
        <div className="content-page about-page">
            <div className="container">
                <motion.header
                    className="page-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Navigating Your Inner Universe</h1>
                    <p>Mind Orbit is dedicated to bridging the gap between cutting-edge behavioral science and your daily emotional well-being.</p>
                </motion.header>

                <div className="about-content">
                    <motion.section
                        className="page-section"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our Story</h2>
                        <p>Born from the belief that emotional intelligence is the most critical skill for the 21st century, Mind Orbit started as a small research project. Today, it's a global companion for thousands seeking clarity in a chaotic world.</p>
                    </motion.section>

                    <div className="content-grid" style={{ marginTop: '40px' }}>
                        <motion.div
                            className="content-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="icon">🎯</span>
                            <h3>Our Mission</h3>
                            <p>To provide every individual with the tools to decode their emotions and master their reactions, fostering a world of deeper empathy and resilience.</p>
                        </motion.div>

                        <motion.div
                            className="content-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="icon">🚀</span>
                            <h3>Our Vision</h3>
                            <p>A future where mental health is prioritized, understood, and managed with the same precision as physical fitness.</p>
                        </motion.div>
                    </div>

                    <motion.section
                        className="quote-box"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <blockquote>"The greatest orbit we can ever master is the one within ourselves."</blockquote>
                        <cite>— The Mind Orbit Team</cite>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
