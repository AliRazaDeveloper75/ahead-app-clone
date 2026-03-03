import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
    {
        name: "Daneveryguy",
        text: "I downloaded this app last summer when I was in a really dark place in my life. It has helped me exponentially the last few months.",
        role: "User",
        icon: "🌟"
    },
    {
        name: "Shanteres",
        text: "Love this app and I never write reviews. For once in a long time I feel there’s hope with procrastination.",
        role: "User",
        icon: "🌈"
    },
    {
        name: "Jarbobius",
        text: "This app is amazing- it works so well in my busy schedule. The daily lessons provide great food for my brain.",
        role: "User",
        icon: "💎"
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
                    <h2>Hear what the Mind-Thinker family are saying</h2>
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
