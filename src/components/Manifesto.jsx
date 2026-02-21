import React from 'react';
import { motion } from 'framer-motion';
import './Manifesto.css';

const Manifesto = () => {
    return (
        <section id="manifesto" className="manifesto">
            <div className="container">
                <motion.div
                    className="manifesto-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="manifesto-header">
                        <span>Built by experts</span>
                        <h2>The Ahead Manifesto</h2>
                    </div>
                    <div className="manifesto-content">
                        <p>Our mission is to help people live more fulfilled lives through better self-understanding. We combine cutting-edge behavioral science with beautiful design to create tools that people actually love using.</p>
                        <p>We believe that emotional intelligence is a skill that can be learned, practiced, and mastered. Mind-Thinker is your companion on this journey of self-discovery and growth.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Manifesto;
