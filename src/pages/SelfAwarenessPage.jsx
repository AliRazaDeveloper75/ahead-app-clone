import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const SelfAwarenessPage = () => {
    return (
        <div className="content-page sa-page">
            <div className="container">
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="page-header"
                >
                    <h1>Self-Awareness: The Lens of Life</h1>
                    <p>You cannot change what you do not notice.</p>
                </motion.header>

                <div className="sa-grid">
                    <motion.div
                        className="sa-feature"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2>Introspection</h2>
                        <p>The practice of looking inward. Our tools help you journal and reflect on your daily triggers and successes.</p>
                    </motion.div>

                    <motion.div
                        className="sa-feature"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2>Feedback Loops</h2>
                        <p>Understanding how others perceive you is the bridge between internal and external self-awareness.</p>
                    </motion.div>
                </div>

                <div className="quote-box">
                    <blockquote>"Knowing yourself is the beginning of all wisdom."</blockquote>
                    <cite>— Aristotle</cite>
                </div>
            </div>
        </div>
    );
};

export default SelfAwarenessPage;
