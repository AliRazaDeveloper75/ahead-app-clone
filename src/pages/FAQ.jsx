import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Pages.css';

const FAQS = [
    {
        category: '🧠 About Mind Orbit',
        items: [
            {
                q: 'What is Mind Orbit?',
                a: 'Mind Orbit is a personalised emotional intelligence (EQ) coaching app. It gives you a science-backed assessment of your emotional skills — self-awareness, empathy, regulation, and social mastery — then guides you through a structured 28-day improvement plan to build lasting habits.',
            },
            {
                q: 'Is Mind Orbit a replacement for therapy or professional mental health support?',
                a: 'No. Mind Orbit is a self-improvement and educational platform, not a licensed therapy or clinical service. If you are experiencing serious mental health challenges, we strongly encourage you to seek support from a qualified professional. Mind Orbit is designed for personal growth, not medical treatment.',
            },
            {
                q: 'Who is Mind Orbit designed for?',
                a: 'Mind Orbit is for anyone who wants to better understand their emotions, improve their relationships, manage stress more effectively, and build sustainable emotional habits. It is equally useful for students, professionals, leaders, and anyone seeking personal growth.',
            },
        ],
    },
    {
        category: '📋 The Assessment',
        items: [
            {
                q: 'How does the assessment work?',
                a: 'The assessment is a short, thoughtful questionnaire that explores your typical emotional responses across different life situations. Based on your answers, we generate a personalised EQ snapshot and create your tailored 28-day plan.',
            },
            {
                q: 'How long does the assessment take?',
                a: 'Most users complete the assessment in 5–10 minutes. There are no right or wrong answers — just answer as honestly as possible for the most accurate and useful results.',
            },
            {
                q: 'Can I retake the assessment?',
                a: 'Yes. If your account is still in the "pending" state (before payment), you can retake the assessment using the same email. Once a plan is activated, a new assessment can be requested by contacting our support team.',
            },
        ],
    },
    {
        category: '💳 Plans & Payment',
        items: [
            {
                q: 'How does the manual payment process work?',
                a: 'After selecting a plan, you will be shown our bank/payment details. Complete the transfer, take a screenshot of the receipt, and upload it on the payment page. Our team will verify it within 1–24 hours and activate your plan.',
            },
            {
                q: 'How long does payment verification take?',
                a: 'Typically within 1–2 hours during business hours. In rare cases during peak periods, it may take up to 24 hours. You will see your plan status update to "Active" once approved.',
            },
            {
                q: 'Are payments refundable?',
                a: 'Payments are non-refundable once your 28-day plan has been activated and you have accessed the content. If you have a technical issue preventing access within 72 hours of payment, please contact us and we will resolve it.',
            },
        ],
    },
    {
        category: '📅 The 28-Day Plan',
        items: [
            {
                q: 'How does the 28-day plan work?',
                a: 'Each day unlocks a new emotional intelligence exercise, guided reflection, or mindfulness practice. You complete the day\'s task, mark it as done, and the next day unlocks. The plan covers 4 thematic weeks: Foundations, Emotional Balance, Social Mastery, and Long-term Growth.',
            },
            {
                q: 'What if I miss a day?',
                a: 'No problem — your progress is saved permanently. You can pick up exactly where you left off at any time. There is no expiry on your plan once activated. Life happens, and your growth journey can resume whenever you\'re ready.',
            },
            {
                q: 'Can I access the plan on multiple devices?',
                a: 'Yes. Your plan is tied to your email address. Simply go to "Find Profile", enter your email, and your full progress will load on any device with a browser.',
            },
        ],
    },
    {
        category: '🔒 Privacy & Security',
        items: [
            {
                q: 'Is my personal data safe?',
                a: 'Yes. All data is stored in a secured, encrypted MongoDB Atlas database. We use HTTPS for all data in transit and never sell or share your personal data with third parties.',
            },
            {
                q: 'How do I delete my account and data?',
                a: 'Email us at hi@mind-orbit.com with your registered email address and request for deletion. All your data — including assessment results, task progress, and payment records — will be permanently deleted within 30 days.',
            },
        ],
    },
];

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`faq-item ${open ? 'faq-open' : ''}`} onClick={() => setOpen(!open)}>
            <div className="faq-question">
                <span>{q}</span>
                <span className="faq-chevron">{open ? '−' : '+'}</span>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <p>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => (
    <div className="content-page faq-page">
        <div className="container">
            <motion.header
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Frequently Asked Questions</h1>
                <p>Everything you need to know about Mind Orbit — our assessments, plans, payments, and more.</p>
            </motion.header>

            <div className="faq-sections">
                {FAQS.map((cat, i) => (
                    <motion.div
                        key={i}
                        className="faq-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <h3 className="faq-category-title">{cat.category}</h3>
                        <div className="faq-list">
                            {cat.items.map((item, j) => (
                                <FAQItem key={j} q={item.q} a={item.a} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="legal-contact-note"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span>💬</span>
                <p>Still have a question? We'd love to help — reach out at <a href="mailto:hi@mind-orbit.com">hi@mind-orbit.com</a></p>
            </motion.div>
        </div>
    </div>
);

export default FAQ;
