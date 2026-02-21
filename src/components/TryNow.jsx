import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './TryNow.css';

const questions = [
    // ... (questions array remains same)
    {
        id: 1,
        type: 'single',
        question: "How old are you?",
        options: ["18-24", "25-34", "35-44", "45+"]
    },
    {
        id: 2,
        type: 'single',
        question: "Select your gender",
        options: ["Male", "Female", "Other"]
    },
    {
        id: 3,
        type: 'multi',
        question: "Choose areas you'd want to focus on first",
        options: ["Emotions", "Motivation", "Stress relief", "Habits", "Confidence", "Mindset", "Self-care", "Trauma healing", "Empathy", "Relationships", "Inner peace", "Self-growth"]
    },
    {
        id: 4,
        type: 'single',
        question: "How do you feel about your childhood?",
        options: ["Mostly positive", "Mostly negative", "Mixed feelings", "Hard to remember"]
    },
    {
        id: 5,
        type: 'single',
        question: "How would you describe your parents growing up?",
        options: ["Supportive & loving", "Strict & demanding & loving", "Emotionally distant", "Abusive & harmful", "I grew up without parents"]
    },
    {
        id: 6,
        type: 'scale',
        question: "Did your parents encourage you to express your feelings?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 7,
        type: 'multi',
        question: "Have you faced any of these negative effects of trauma?",
        options: ["Low self-esteem", "Procrastination", "Overthinking", "Trouble focusing", "Anxiety", "Feeling exhausted", "Poor sleep", "None of the above"]
    },
    {
        id: 8,
        type: 'scale',
        question: "I feel stressed or anxious most days",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 9,
        type: 'scale',
        question: "I often find it challenging to make a decision quickly",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 10,
        type: 'scale',
        question: "Do you get distracted easily?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 11,
        type: 'scale',
        question: "Do you often put others first?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 12,
        type: 'scale',
        question: "Is it easy for you to say no without guilt?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 13,
        type: 'scale',
        question: "Do you often let people cross your boundaries?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 14,
        type: 'scale',
        question: "I tend to apologize even when it's not my fault",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 15,
        type: 'scale',
        question: "I have trouble quieting racing thoughts",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 16,
        type: 'scale',
        question: "Do you often feel drained or moody?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 17,
        type: 'single',
        question: "What drains your energy most?",
        options: ["Work overload", "Difficult relationships", "Family responsibilities", "Health issues", "None of the above"]
    },
    {
        id: 18,
        type: 'single',
        question: "When you make a mistake, your inner voice says...",
        options: ["You always mess up", "Let's learn from that"]
    },
    {
        id: 19,
        type: 'scale',
        question: "I've lost interest in things I used to enjoy",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 20,
        type: 'scale',
        question: "Do you feel cynical or negative about your job?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 21,
        type: 'scale',
        question: "Do you often worry you're not good enough?",
        labels: ["Absolutely not", "Absolutely yes"]
    },
    {
        id: 22,
        type: 'multi',
        question: "Are there any habits you'd like to quit?",
        options: ["Procrastination", "Doomscrolling", "Self-doubt", "Drinking alcohol", "Eating junk food", "Binge watching", "Going to bed late"]
    },
    {
        id: 23,
        type: 'single',
        question: "Was Ahead recommended to you by an expert (psychologist, therapist, MD)?",
        options: ["Yes", "No"]
    },
    {
        id: 24,
        type: 'multi',
        question: "What do you want to achieve with your well-being plan?",
        options: ["Reduce stress and anxiety", "Get more confident", "Increase productivity", "Improve my relationships", "Have more energy", "Feel better in my body", "Lose weight", "Improve sleep quality", "Heal childhood trauma"]
    },
    {
        id: 25,
        type: 'single',
        question: "Choose your daily goal for working on your wellbeing",
        options: ["Easy (5 min/day)", "Common (10 min/day)", "Serious (15 min/day)", "Intensive (20+ min/day)"]
    },
    {
        id: 26,
        type: 'single',
        question: "Do you self-reflect?",
        options: ["No", "Yes"]
    }
];

const TryNow = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [multiSelect, setMultiSelect] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [email, setEmail] = useState('');

    const handleSingleSelect = (option) => {
        const updatedAnswers = { ...answers, [questions[currentStep].id]: option };
        setAnswers(updatedAnswers);
        nextStep(updatedAnswers);
    };

    const handleMultiToggle = (option) => {
        if (multiSelect.includes(option)) {
            setMultiSelect(multiSelect.filter(item => item !== option));
        } else {
            setMultiSelect([...multiSelect, option]);
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
            localStorage.setItem('mind-thinker-results', JSON.stringify(updatedAnswers));
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
                    localStorage.setItem('mind-thinker-user', email);
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
                            <button key={idx} className="option-btn" onClick={() => handleSingleSelect(option)}>
                                {option}
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
                                    className={`option-btn ${multiSelect.includes(option) ? 'selected' : ''}`}
                                    onClick={() => handleMultiToggle(option)}
                                >
                                    {option}
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
                            {[1, 2, 3, 4, 5].map(val => (
                                <button key={val} className="scale-btn" onClick={() => handleScaleSelect(val)}>
                                    {val === 3 ? '🦋' : val}
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
                                <h2>{questions[currentStep].question}</h2>
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
