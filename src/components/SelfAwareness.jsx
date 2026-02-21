import React from 'react';
import { motion } from 'framer-motion';
import './SelfAwareness.css';

const SelfAwareness = () => {
    return (
        <section id="self-awareness" className="self-awareness">
            <div className="container">
                <div className="sa-card">
                    <motion.div
                        className="sa-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>We're hiring! Join the team.</h3>
                        <p>Help us build the future of emotional health. We're looking for passionate individuals to join our mission.</p>
                        <button className="btn btn-outline">See open positions</button>
                    </motion.div>

                    <motion.div
                        className="sa-test"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="test-badge">Take the test</div>
                        <h2>How self-aware are you?</h2>
                        <p>Our science-backed test takes only 5 minutes and provides deep insights into your personality.</p>
                        <button className="btn btn-primary">Start the test</button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SelfAwareness;
