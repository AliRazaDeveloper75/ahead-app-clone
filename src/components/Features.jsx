import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const featureCards = [
    {
        title: "Stress Mastery",
        text: "Calm your mind instantly with science-backed exercises designed for high-pressure moments.",
        icon: "🧘",
        color: "#F3E8FF"
    },
    {
        title: "Emotional Mapping",
        text: "Decode your feelings in real-time. Understand the 'why' behind your moods.",
        icon: "🧠",
        color: "#E0F2FE"
    },
    {
        title: "Habit Architecture",
        text: "Build lasting positive habits and break toxic cycles with bite-sized daily challenges.",
        icon: "🌱",
        color: "#DCFCE7"
    },
    {
        title: "Anger Control",
        text: "Identify triggers and master the pause between impulse and action.",
        icon: "🔥",
        color: "#FEE2E2"
    },
    {
        title: "Peak Focus",
        text: "Eliminate anxiety-driven distractions and enter your zone of deep work.",
        icon: "🎯",
        color: "#FFEDD5"
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
                        Your Emotional Navigator
                    </motion.h2>
                    <motion.div
                        className="header-text"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p>Mind Orbit helps you navigate the complexities of your mind with precision and grace. Master your reactions and unlock a more balanced life.</p>
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
