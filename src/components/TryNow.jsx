import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './TryNow.css';

const questions = [
    {
        id: 1,
        type: 'single',
        question: "How old are you?",
        icon: "🎂",
        options: [
            { text: "18-24", icon: "🧒" },
            { text: "25-34", icon: "🧑" },
            { text: "35-44", icon: "🧔" },
            { text: "45+", icon: "👴" }
        ]
    },
    {
        id: 2,
        type: 'single',
        question: "Select your gender",
        icon: "👤",
        options: [
            { text: "Male", icon: "👨" },
            { text: "Female", icon: "👩" },
            { text: "Other", icon: "🌈" }
        ]
    },
    {
        id: 3,
        type: 'multi',
        question: "Choose areas you'd want to focus on first",
        icon: "🎯",
        options: [
            { text: "Emotions", icon: "🎭" },
            { text: "Motivation", icon: "🚀" },
            { text: "Stress relief", icon: "😌" },
            { text: "Habits", icon: "🔄" },
            { text: "Confidence", icon: "💪" },
            { text: "Mindset", icon: "🧠" },
            { text: "Self-care", icon: "🛁" },
            { text: "Trauma healing", icon: "🩹" },
            { text: "Empathy", icon: "🤝" },
            { text: "Relationships", icon: "💖" },
            { text: "Inner peace", icon: "🧘" },
            { text: "Self-growth", icon: "🌱" }
        ]
    },
    {
        id: 4,
        type: 'single',
        question: "How do you feel about your childhood?",
        icon: "🧸",
        options: [
            { text: "Mostly positive", icon: "☀️" },
            { text: "Mostly negative", icon: "🌧️" },
            { text: "Mixed feelings", icon: "⛅" },
            { text: "Hard to remember", icon: "🌫️" }
        ]
    },
    {
        id: 5,
        type: 'single',
        question: "How would you describe your parents growing up?",
        icon: "🏡",
        options: [
            { text: "Supportive & loving", icon: "❤️" },
            { text: "Strict & demanding & loving", icon: "📏" },
            { text: "Emotionally distant", icon: "❄️" },
            { text: "Abusive & harmful", icon: "⚠️" },
            { text: "I grew up without parents", icon: "👤" }
        ]
    },
    {
        id: 6,
        type: 'scale',
        question: "Did your parents encourage you to express your feelings?",
        icon: "🗣️",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 7,
        type: 'multi',
        question: "Have you faced any of these negative effects of trauma?",
        icon: "🌩️",
        options: [
            { text: "Low self-esteem", icon: "😔" },
            { text: "Procrastination", icon: "⏳" },
            { text: "Overthinking", icon: "🌀" },
            { text: "Trouble focusing", icon: "🎯" },
            { text: "Anxiety", icon: "😰" },
            { text: "Feeling exhausted", icon: "🔋" },
            { text: "Poor sleep", icon: "😴" },
            { text: "None of the above", icon: "✨" }
        ]
    },
    {
        id: 8,
        type: 'scale',
        question: "I feel stressed or anxious most days",
        icon: "😰",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 9,
        type: 'scale',
        question: "I often find it challenging to make a decision quickly",
        icon: "🤔",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 10,
        type: 'scale',
        question: "Do you get distracted easily?",
        icon: "🦋",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 11,
        type: 'scale',
        question: "Do you often put others first?",
        icon: "🤲",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 12,
        type: 'scale',
        question: "Is it easy for you to say no without guilt?",
        icon: "🛡️",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 13,
        type: 'scale',
        question: "Do you often let people cross your boundaries?",
        icon: "🚧",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 14,
        type: 'scale',
        question: "I tend to apologize even when it's not my fault",
        icon: "🙇",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 15,
        type: 'scale',
        question: "I have trouble quieting racing thoughts",
        icon: "🌪️",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 16,
        type: 'scale',
        question: "Do you often feel drained or moody?",
        icon: "🔋",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 17,
        type: 'single',
        question: "What drains your energy most?",
        icon: "🔌",
        options: [
            { text: "Work overload", icon: "💼" },
            { text: "Difficult relationships", icon: "💔" },
            { text: "Family responsibilities", icon: "👪" },
            { text: "Health issues", icon: "🏥" },
            { text: "None of the above", icon: "✨" }
        ]
    },
    {
        id: 18,
        type: 'single',
        question: "When you make a mistake, your inner voice says...",
        icon: "🗯️",
        options: [
            { text: "You always mess up", icon: "❌" },
            { text: "Let's learn from that", icon: "✅" }
        ]
    },
    {
        id: 19,
        type: 'scale',
        question: "I've lost interest in things I used to enjoy",
        icon: "🕯️",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 20,
        type: 'scale',
        question: "Do you feel cynical or negative about your job?",
        icon: "💼",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 21,
        type: 'scale',
        question: "Do you often worry you're not good enough?",
        icon: "😟",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 22,
        type: 'multi',
        question: "Are there any habits you'd like to quit?",
        icon: "🚭",
        options: [
            { text: "Procrastination", icon: "⏳" },
            { text: "Doomscrolling", icon: "📱" },
            { text: "Self-doubt", icon: "🤷" },
            { text: "Drinking alcohol", icon: "🍺" },
            { text: "Eating junk food", icon: "🍔" },
            { text: "Binge watching", icon: "📺" },
            { text: "Going to bed late", icon: "🌙" }
        ]
    },
    {
        id: 23,
        type: 'single',
        question: "Was Mind Orbit recommended to you by an expert?",
        icon: "🩺",
        options: [
            { text: "Yes", icon: "👩‍⚕️" },
            { text: "No", icon: "❌" }
        ]
    },
    {
        id: 24,
        type: 'multi',
        question: "What do you want to achieve with your well-being plan?",
        icon: "🌈",
        options: [
            { text: "Reduce stress and anxiety", icon: "🧘" },
            { text: "Get more confident", icon: "🦁" },
            { text: "Increase productivity", icon: "📈" },
            { text: "Improve my relationships", icon: "💌" },
            { text: "Have more energy", icon: "⚡" },
            { text: "Feel better in my body", icon: "🤸" },
            { text: "Lose weight", icon: "⚖️" },
            { text: "Improve sleep quality", icon: "💤" },
            { text: "Heal childhood trauma", icon: "💖" }
        ]
    },
    {
        id: 25,
        type: 'single',
        question: "Choose your daily goal for working on your wellbeing",
        icon: "📅",
        options: [
            { text: "Easy (5 min/day)", icon: "🌱" },
            { text: "Common (10 min/day)", icon: "🌿" },
            { text: "Serious (15 min/day)", icon: "🌳" },
            { text: "Intensive (20+ min/day)", icon: "⛰️" }
        ]
    },
    {
        id: 26,
        type: 'single',
        question: "Do you self-reflect?",
        icon: "🪞",
        options: [
            { text: "No", icon: "❌" },
            { text: "Yes", icon: "✅" }
        ]
    }
];

const TryNow = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [multiSelect, setMultiSelect] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [email, setEmail] = useState('');

    const handleSingleSelect = (optionText) => {
        const updatedAnswers = { ...answers, [questions[currentStep].id]: optionText };
        setAnswers(updatedAnswers);
        nextStep(updatedAnswers);
    };

    const handleMultiToggle = (optionText) => {
        if (multiSelect.includes(optionText)) {
            setMultiSelect(multiSelect.filter(item => item !== optionText));
        } else {
            setMultiSelect([...multiSelect, optionText]);
        }
    };

    const handleScaleSelect = (value) => {
        const updatedAnswers = { ...answers, [questions[currentStep].id]: value };
        setAnswers(updatedAnswers);
        nextStep(updatedAnswers);
    };

    const nextStep = (updatedAnswers = answers) => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setMultiSelect([]);
            window.scrollTo(0, 0);
        } else {
            setIsFinished(true);
            // Save results to localStorage
            localStorage.setItem('mind-orbit-results', JSON.stringify(updatedAnswers));
        }
    };

    const handleMultiSubmit = () => {
        const updatedAnswers = { ...answers, [questions[currentStep].id]: multiSelect };
        setAnswers(updatedAnswers);
        nextStep(updatedAnswers);
    };

    const handleGetPlan = async () => {
        if (email && email.includes('@')) {
            try {
                const response = await fetch('/api/assessment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, results: answers })
                });
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem('mind-orbit-user', email);
                    navigate('/plan');
                } else {
                    alert(data.error || 'Failed to save assessment.');
                }
            } catch (error) {
                console.error('Error saving assessment:', error);
                alert('Failed to connect to server. Please ensure the backend is running.');
            }
        } else {
            alert('Please enter a valid email address.');
        }
    };

    const renderQuestion = () => {
        const q = questions[currentStep];
        switch (q.type) {
            case 'single':
                return (
                    <div className="options-grid">
                        {q.options.map((option, idx) => (
                            <button key={idx} className="option-btn" onClick={() => handleSingleSelect(option.text)}>
                                <span className="option-icon">{option.icon}</span>
                                <span className="option-text">{option.text}</span>
                            </button>
                        ))}
                    </div>
                );
            case 'multi':
                return (
                    <div className="multi-options-container">
                        <div className="options-grid grid-2">
                            {q.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={`option-btn ${multiSelect.includes(option.text) ? 'selected' : ''}`}
                                    onClick={() => handleMultiToggle(option.text)}
                                >
                                    <span className="option-icon">{option.icon}</span>
                                    <span className="option-text">{option.text}</span>
                                </button>
                            ))}
                        </div>
                        <button className="btn btn-primary submit-btn" onClick={handleMultiSubmit} disabled={multiSelect.length === 0}>
                            Continue
                        </button>
                    </div>
                );
            case 'scale':
                return (
                    <div className="scale-container">
                        <div className="scale-labels">
                            <span>{q.labels[0]}</span>
                            <span>{q.labels[1]}</span>
                        </div>
                        <div className="scale-options">
                            {[
                                { val: 1, icon: '😤' },
                                { val: 2, icon: '😟' },
                                { val: 3, icon: '😐' },
                                { val: 4, icon: '😊' },
                                { val: 5, icon: '🤩' }
                            ].map(item => (
                                <button
                                    key={item.val}
                                    className="scale-btn-icon"
                                    onClick={() => handleScaleSelect(item.val)}
                                    title={`Level ${item.val}`}
                                >
                                    {item.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="try-now-page">
            <div className="container">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key="quiz"
                            className="quiz-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>

                            <motion.div
                                key={questions[currentStep].id}
                                className="question-card"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="step-count">Step {currentStep + 1} of {questions.length}</span>
                                <div className="question-header">
                                    <span className="question-icon-main">{questions[currentStep].icon}</span>
                                    <h2>{questions[currentStep].question}</h2>
                                </div>
                                {renderQuestion()}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            className="results-container"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="result-icon">🧘</div>
                            <h1>Your mental well-being plan is ready!</h1>
                            <p className="result-feedback">We've crafted a personalized journey to help you master your emotions and find peace of mind.</p>
                            <div className="email-capture">
                                <input
                                    type="email"
                                    placeholder="Enter your email to receive your plan"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleGetPlan}>Get my plan</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TryNow;
