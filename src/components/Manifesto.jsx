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
                        <h2>The Mind Orbit Manifesto</h2>
                    </div>
                    <div className="manifesto-content">
                        <p>At Mind Orbit, our mission is to redefine the intersection of technology and emotional intelligence. We bridge the gap between behavioral science and daily life, providing you with the tools to master your internal landscape.</p>
                        <p>We believe that managing stress, anxiety, and habits is not just a goal, but a lifelong skill. Mind Orbit is your architect for a more centered and purposeful future.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Manifesto;
