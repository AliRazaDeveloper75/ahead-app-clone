import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const Emotions = () => {
    return (
        <div className="content-page emotions-page">
            <div className="container">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="page-header"
                >
                    <h1>Master Your Emotions</h1>
                    <p>Understanding the vocabulary of your heart is the first step to emotional intelligence.</p>
                </motion.header>

                <div className="content-grid">
                    <motion.div
                        className="content-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="icon">🌈</span>
                        <h3>The Emotional Spectrum</h3>
                        <p>Emotions aren't just good or bad; they are signals. Learn to identify the subtle differences between frustration and anger, or joy and contentment.</p>
                    </motion.div>

                    <motion.div
                        className="content-card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="icon">🌊</span>
                        <h3>Emotional Regulation</h3>
                        <p>Learn techniques to ride the waves of intense feelings without being swept away by them. Develop the "pause" between stimulus and response.</p>
                    </motion.div>
                </div>

                <section className="page-section">
                    <h2>Why It Matters</h2>
                    <p>People with high emotional clarity make better decisions, have more stable relationships, and experience less chronic stress. Our program helps you build this clarity through daily exercises.</p>
                </section>
            </div>
        </div>
    );
};

export default Emotions;
