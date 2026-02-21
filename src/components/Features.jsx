import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const featureCards = [
    {
        title: "Thinker's Block?",
        text: "Understand why your brain stops when things get tough and how to push through.",
        icon: "🧱",
        color: "#E9D5FF"
    },
    {
        title: "Emotional Control",
        text: "Learn to spot your emotions before they take control of your actions.",
        icon: "⚡",
        color: "#DBEAFE"
    },
    {
        title: "Focus and Flow",
        text: "Discover techniques to enter a state of flow and stay focused on what matters.",
        icon: "🌊",
        color: "#FEF3C7"
    },
    {
        title: "Social Intelligence",
        text: "Improve your relationships by understanding the feelings of those around you.",
        icon: "🤝",
        color: "#FEE2E2"
    },
    {
        title: "Daily Habits",
        text: "Build lasting habits with bite-sized lessons that fit into your busy schedule.",
        icon: "📅",
        color: "#D1FAE5"
    }
];

const Features = () => {
    return (
        <section id="emotions" className="features">
            <div className="container">
                <div className="features-header">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        EQ beats IQ
                    </motion.h2>
                    <motion.div
                        className="header-text"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p>People with high emotional intelligence (EQ) live more fulfilled lives. They tend to be more successful and have healthier relationships.</p>
                    </motion.div>
                </div>

                <div className="features-carousel-wrapper">
                    <motion.div
                        className="features-carousel"
                        drag="x"
                        dragConstraints={{ left: -1000, right: 0 }}
                    >
                        {featureCards.map((card, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                style={{ backgroundColor: card.color }}
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div className="card-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Features;
