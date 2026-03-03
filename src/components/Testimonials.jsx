import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
    {
        name: "Sarah Jenkins",
        text: "Mind Orbit has completely shifted how I handle stress at work. The real-time insights helped me spot my anger triggers before they spiraled.",
        role: "Creative Director",
        icon: "✨"
    },
    {
        name: "Michael Chen",
        text: "The habit architecture tools are a game-changer. I've finally broken a decade-long cycle of procrastination using their daily challenges.",
        role: "Software Architect",
        icon: "🚀"
    },
    {
        name: "Elena Rodriguez",
        text: "I used to feel overwhelmed by anxiety. This app gave me the vocabulary to understand my emotions and the techniques to find my flow again.",
        role: "User",
        icon: "🌊"
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials">
            <div className="container">
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Hear what the Mind Orbit family are saying</h2>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="quote-mark">"</div>
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{t.icon}</div>
                                <div className="author-info">
                                    <h4>{t.name}</h4>
                                    <p>{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
