import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ImprovementPlan.css';

const WEEKS = [
    { id: 1, title: 'Week 1: Foundations', days: 7 },
    { id: 2, title: 'Week 2: Emotional Balance', days: 7 },
    { id: 3, title: 'Week 3: Social Mastery', days: 7 },
    { id: 4, title: 'Week 4: Long-term Growth', days: 7 }
];

const PLAN_TASKS = {
    // --- WEEK 1: FOUNDATIONS OF SELF-AWARENESS ---
    1: {
        icon: "🧭",
        theme: "Self-Awareness",
        title: "Emotional Baseline",
        desc: "Every journey starts with knowing where you are. Today, you'll take an honest snapshot of your current emotional state — no judgment, just pure observation. This awareness is the first building block of emotional intelligence.",
        bullets: [
            "Sit quietly for 5 minutes and take 5 slow deep breaths.",
            "Write down your dominant emotion right now and rate its intensity (1–10).",
            "Notice where you physically feel this emotion in your body (chest, throat, stomach)."
        ]
    },
    2: {
        icon: "⏸️",
        theme: "Self-Regulation",
        title: "The Power of the Pause",
        desc: "Reacting impulsively is the enemy of emotional intelligence. Today, you'll practice the single most powerful EQ skill: pausing before you respond. This small habit rewires how your brain handles stress and conflict.",
        bullets: [
            "When a stressful situation arises, physically step away for 5 minutes before responding.",
            "Draft any important message or reply — then wait 10 minutes before sending it.",
            "Review your draft and ask: 'Is my tone calm, clear, and objective?'"
        ]
    },
    3: {
        icon: "👂",
        theme: "Social Mastery",
        title: "The Art of Active Listening",
        desc: "Most people listen to reply, not to understand. Today, your goal is to truly hear the people around you. Active listening is the foundation of deep, trusting relationships and is a hallmark of high EQ individuals.",
        bullets: [
            "In every conversation, maintain comfortable eye contact and resist the urge to interrupt.",
            "After someone speaks, pause 2 seconds before replying — let their words land.",
            "Practice reflecting back: 'What I hear you saying is...' at least once today."
        ]
    },
    4: {
        icon: "🌟",
        theme: "Positive Mindset",
        title: "The Gratitude Shift",
        desc: "Gratitude is a scientifically proven mood-elevator and stress reducer. Today, you'll train your brain to actively seek out the good — even in small, ordinary moments. This daily habit can rewire your baseline happiness level.",
        bullets: [
            "Write down 3 specific things you're grateful for — be detailed, not generic.",
            "Choose one item from your list and genuinely share it with someone in your life.",
            "Before bed, reflect on why each thing matters and how life would feel without it."
        ]
    },
    5: {
        icon: "🚶",
        theme: "Empathy",
        title: "The Empathy Walk",
        desc: "Empathy is not just feeling for others — it's actively working to understand their inner world. Today, pick one person in your life and make it your mission to truly understand their perspective on something that matters to them.",
        bullets: [
            "Ask someone an open-ended question about their day, their work, or a challenge they face.",
            "Listen without forming your own opinion — your only job is to understand their experience.",
            "Validate their feeling by saying: 'That makes sense that you'd feel that way.'"
        ]
    },
    6: {
        icon: "📵",
        theme: "Mindfulness",
        title: "Digital Detox Hour",
        desc: "Constant connectivity fragments your attention and numbs your emotional awareness. Today, you'll reclaim one uninterrupted hour for yourself, completely screen-free. This simple act can dramatically reduce anxiety and sharpen mental clarity.",
        bullets: [
            "Set a timer for 60 minutes and put all devices in another room or on airplane mode.",
            "Choose one analog activity: reading, journaling, stretching, or a slow walk outside.",
            "At the end of the hour, notice how you feel — calmer, more creative, more present?"
        ]
    },
    7: {
        icon: "🪞",
        theme: "Reflection",
        title: "Week 1 Mirror Session",
        desc: "Reflection transforms experience into wisdom. You've just completed 6 days of dedicated emotional work. Today, you'll look back honestly to understand what's shifted, what's still stuck, and what you want to carry into Week 2.",
        bullets: [
            "Review your journal or memories from Days 1–6 and note your single biggest insight.",
            "Identify one moment where you handled your emotions better than you might have before.",
            "Set one clear, specific emotional intention for the week ahead and write it down."
        ]
    },

    // --- WEEK 2: EMOTIONAL BALANCE & REGULATION ---
    8: {
        icon: "🔥",
        theme: "Trigger Awareness",
        title: "Name Your Trigger",
        desc: "You can't disarm a trigger you can't see. Today's work is about building a precise map of what specifically activates your stress response, so you can begin to change your automatic reactions to it.",
        bullets: [
            "Think back to the last time you felt a strong surge of stress or anger — what was the exact situation?",
            "Write it down in detail: Who was there? What was said? What were you feeling in your body?",
            "Brainstorm one healthy, constructive response you could use the next time this trigger appears."
        ]
    },
    9: {
        icon: "🍽️",
        theme: "Presence & Mindfulness",
        title: "Mindful Eating",
        desc: "We eat so quickly and so distracted that we rarely taste our food or hear our body's signals. Today, you'll use a meal as a mindfulness laboratory — a chance to practice being fully present in the simplest act of nourishing yourself.",
        bullets: [
            "Choose one meal today to eat in complete silence, away from screens and distractions.",
            "Before your first bite, take three slow breaths and notice the colors, smells, and textures on your plate.",
            "Eat at half your normal speed, chewing each bite thoroughly and noticing the flavors evolve."
        ]
    },
    10: {
        icon: "🛡️",
        theme: "Boundaries",
        title: "The Sacred 'No'",
        desc: "Saying 'yes' to everything is a fast track to resentment and burnout. Healthy boundaries are an act of self-respect — and they actually improve your relationships. Today, you'll practice the liberating skill of a clear, kind 'no'.",
        bullets: [
            "Identify one request or obligation this week that you agreed to but genuinely shouldn't have.",
            "Craft a polite, firm, and honest response that declines without excessive explanation or apology.",
            "Notice any anxiety or guilt that arises — and remind yourself: protecting your energy is not selfish."
        ]
    },
    11: {
        icon: "💨",
        theme: "Stress Relief",
        title: "The 4-7-8 Breath Reset",
        desc: "Your breath is the fastest on-ramp to your nervous system. The 4-7-8 technique activates the parasympathetic response, literally slowing your heart rate and quieting anxiety within minutes. Today, you'll make it a tool you actually use.",
        bullets: [
            "Find a quiet spot, sit upright, and rest your tongue gently behind your upper front teeth.",
            "Inhale silently through your nose for 4 counts, hold your breath for 7 counts, then exhale completely through your mouth for 8 counts.",
            "Repeat this cycle 4 times — morning, when stressed, and just before bed."
        ]
    },
    12: {
        icon: "🌻",
        theme: "Positive Social Habits",
        title: "The Genuine Compliment",
        desc: "Specific, heartfelt compliments create real human connection and elevate the mood of everyone involved — including you. Today, you'll go beyond surface-level pleasantries and genuinely acknowledge something meaningful in someone else.",
        bullets: [
            "Observe the people around you and look for a real quality, effort, or achievement worth acknowledging.",
            "Deliver a specific compliment — not 'you're nice' but 'the way you handled that situation showed real patience.'",
            "Notice the energy shift in the conversation and how it makes you feel to spread genuine appreciation."
        ]
    },
    13: {
        icon: "🔄",
        theme: "Cognitive Flexibility",
        title: "The Reframe Lab",
        desc: "Cognitive reframing is one of the most powerful tools in therapy and high-performance coaching. It means changing not just how you think, but how your brain interprets events — turning obstacles into data and failures into feedback.",
        bullets: [
            "Catch one negative or catastrophic thought you've had recently and write it down exactly as it appeared.",
            "Ask: 'Is this 100% true? What evidence contradicts it? What would I tell a friend who thought this?'",
            "Write a balanced, realistic alternative thought — not toxic positivity, but a fair reappraisal of the situation."
        ]
    },
    14: {
        icon: "🤝",
        theme: "Relationship Audit",
        title: "Your Inner Circle Audit",
        desc: "You are, on average, the emotional sum of the five people you spend the most time with. Today, you'll audit your closest relationships honestly — not to judge anyone, but to consciously choose who you invest your time and energy in.",
        bullets: [
            "List the 5 people you interact with most and rate whether each leaves you feeling energized or depleted.",
            "Reach out to one person who consistently uplifts you and make concrete plans to spend more time together.",
            "Identify one relationship where you need to gently create more distance or stronger limits — and reflect on why."
        ]
    },

    // --- WEEK 3: SOCIAL MASTERY & DEEPER CONNECTION ---
    15: {
        icon: "🌅",
        theme: "Intentionality",
        title: "The Morning Intention Ritual",
        desc: "The way you start your morning sets the emotional thermostat for the entire day. Instead of letting the day happen to you, today you'll practice setting a deliberate, specific emotional intention before you engage with the world.",
        bullets: [
            "Before checking your phone, sit up and choose one word that represents how you want to feel and act today (e.g., 'patient', 'bold', 'present').",
            "Write your intention word on a sticky note and place it where you'll see it at midday.",
            "At night, journal for 5 minutes on one moment where you embodied that intention and one where you fell short."
        ]
    },
    16: {
        icon: "🧘",
        theme: "Body Intelligence",
        title: "The Full Body Scan",
        desc: "Your body stores emotional data long before your conscious mind catches on. Tension in your shoulders, tightness in your jaw, a heavy chest — these are emotional messages. Today, you'll learn to listen to them.",
        bullets: [
            "Lie down or sit comfortably and close your eyes. Start at the tips of your toes and slowly move your attention upward through your entire body.",
            "At each area, ask: 'Is there tightness, heaviness, or discomfort here?' — breathe into those areas without trying to change anything.",
            "Finish with your face and jaw — consciously release any clenching or tension, then sit in stillness for 2 full minutes."
        ]
    },
    17: {
        icon: "🎯",
        theme: "Growth Mindset",
        title: "Receiving Feedback Gracefully",
        desc: "How you receive criticism reveals your emotional maturity more than almost anything else. Today, you'll work on separating your ego from feedback and treating it as the valuable performance data it actually is.",
        bullets: [
            "Think of one recent piece of critical feedback (from work, a friend, or even yourself) that triggered a defensive reaction.",
            "Write down the feedback and then list: 1) What's valid about it? 2) What can I actually do about it?",
            "The next time someone gives you feedback today, respond with: 'Thank you — I'll genuinely reflect on that.'"
        ]
    },
    18: {
        icon: "💃",
        theme: "Embodied Joy",
        title: "Joyful Movement",
        desc: "Exercise doesn't have to be a punishment. Moving your body in a way that feels genuinely good is one of the fastest paths to emotional regulation and self-connection. Today, you'll move for joy — not for calories or metrics.",
        bullets: [
            "For 15 minutes, engage in movement that makes you feel alive — dance, swim, a brisk walk in nature, stretching to music.",
            "Turn off the fitness tracker and focus entirely on the physical sensation of moving, not the output.",
            "After you finish, scan your emotional state — most people feel a meaningful shift in mood within 10 minutes of joyful movement."
        ]
    },
    19: {
        icon: "🍃",
        theme: "Release & Letting Go",
        title: "The Clean Slate Ritual",
        desc: "Holding onto minor annoyances and grudges is like drinking poison and expecting the other person to feel it. Today, you'll identify one thing that's been occupying rent-free space in your mind — and consciously evict it.",
        bullets: [
            "Name the annoyance clearly — a comment, a situation, a perceived slight — and write it down explicitly.",
            "Ask honestly: 'Is replaying this benefiting me or the other person in any way?' If not, it's costing you energy.",
            "Perform a release ritual: crumple the paper, delete the note, or take a long exhale and consciously decide to redirect your attention."
        ]
    },
    20: {
        icon: "🎨",
        theme: "Creativity & Flow",
        title: "Your Creative Hour",
        desc: "Creative expression is one of the most underrated tools for emotional processing and self-discovery. When you create without expectation of a result, you access parts of yourself that logical thought can't reach.",
        bullets: [
            "Spend 20–30 minutes engaging in something creative that you chose purely because it interests you — draw, write a story, play an instrument, cook an experimental dish, or doodle.",
            "Commit fully to the rule that the output does not matter — perfection is not the goal, expression is.",
            "At the end, sit quietly and notice: what emotions came up during the process? What did it feel like to create without judgment?"
        ]
    },
    21: {
        icon: "🌍",
        theme: "Present-Moment Awareness",
        title: "The Mindful Commute",
        desc: "We spend so much of our transit time mentally somewhere else — rehearsing conversations, scrolling feeds, or ruminating on problems. Today, you'll reclaim your commute as a mindfulness practice.",
        bullets: [
            "For your entire commute (or one specific journey today), put your phone away and leave your earphones out.",
            "Engage all five senses: identify 5 things you can see, 4 you can hear, 3 you can feel, 2 you can smell, and 1 you can taste.",
            "Arrive at your destination and take one slow breath before entering — notice how much more grounded you feel."
        ]
    },

    // --- WEEK 4: LONG-TERM GROWTH & MASTERY ---
    22: {
        icon: "💪",
        theme: "Strengths & Identity",
        title: "Lead With Your Strength",
        desc: "Most people are so aware of their weaknesses they forget the enormity of what they're actually good at. Today, you'll identify one of your core natural strengths and use it as a conscious strategy to navigate a challenge.",
        bullets: [
            "Name one undeniable strength of yours — persistence, creativity, empathy, analytical thinking, communication.",
            "Look at your current biggest challenge or task and ask: 'How can this specific strength help me tackle this?' Then apply it.",
            "Journal tonight on the experience: How did it feel to lead with your strength? What shift did you notice?"
        ]
    },
    23: {
        icon: "💛",
        theme: "Authentic Connection",
        title: "The Courage of Vulnerability",
        desc: "True intimacy and trust are built through authentic sharing — not through always appearing strong, perfect, or unaffected. Today, you'll practice sharing something real with someone you trust, and discover how it deepens connection.",
        bullets: [
            "Choose someone in your life whom you genuinely trust and identify a small, real struggle or uncertainty you've been carrying alone.",
            "Share it with them authentically: 'I've been finding it hard to...' — without minimizing or oversharing.",
            "Notice the connection that follows. Vulnerability is not weakness — it is the path to real belonging."
        ]
    },
    24: {
        icon: "🌿",
        theme: "Nature Therapy",
        title: "The Nature Reset",
        desc: "Science consistently shows that time in natural environments lowers cortisol, reduces mental fatigue, and boosts mood. Urban life disconnects us from nature — and, consequently, from something essential in ourselves.",
        bullets: [
            "Spend at least 20 minutes in a natural environment — a park, garden, trail, or even a quiet street with trees.",
            "Leave your phone on silent in your pocket (or at home) and use all your senses to observe the living world around you.",
            "Find one thing in nature that quietly amazes you — the pattern of a leaf, the sound of wind, the complexity of a tree — and sit with it."
        ]
    },
    25: {
        icon: "🤍",
        theme: "Self-Compassion",
        title: "The Self-Compassion Break",
        desc: "We speak to ourselves in ways we would never dare speak to a friend. Today's practice is about interrupting that inner critic and replacing it with the same warmth and understanding you would offer someone you genuinely care about.",
        bullets: [
            "Recall a mistake or failure from this week — something you've been quietly criticizing yourself for.",
            "Write down what you would genuinely say to a close friend who told you they'd made that exact same mistake.",
            "Read those words back to yourself — slowly, out loud — and let them land. This is what healthy self-talk sounds like."
        ]
    },
    26: {
        icon: "⚖️",
        theme: "Values Alignment",
        title: "The Values Check-In",
        desc: "When your daily actions are misaligned with your deepest values, you feel a subtle but persistent sense of dissatisfaction — even when things look fine from the outside. Today, you'll audit that alignment honestly.",
        bullets: [
            "Write down your top 3 core personal values — what matters most to you at your core (e.g., honesty, creativity, family, freedom, growth).",
            "Review yesterday in your mind: which moments aligned with those values? Which did not?",
            "Make one specific, concrete adjustment today that brings your actions back into alignment with what you say you stand for."
        ]
    },
    27: {
        icon: "🏆",
        theme: "Celebrating Growth",
        title: "Honor Your Journey",
        desc: "Growth that goes unacknowledged rarely sticks. Today, you'll take time to genuinely celebrate how far you've come in just 27 days. This is not vanity — it is the essential emotional act of recognizing that your effort has produced real change.",
        bullets: [
            "Re-read your Day 1 emotional baseline. Compare it honestly — what has shifted in how you respond, perceive, and relate to yourself and others?",
            "Write down 3 specific, concrete emotional wins from this program — moments where you responded differently than you would have a month ago.",
            "Do something to genuinely honor yourself today: a long bath, a special meal, a meaningful conversation — whatever feels like a real reward to you."
        ]
    },
    28: {
        icon: "✉️",
        theme: "Legacy & Commitment",
        title: "Letter to Your Future Self",
        desc: "You have completed something genuinely difficult and meaningful. On Day 28, you will write a letter to the person you are becoming — a commitment document to your own emotional growth that you can re-read whenever doubt or old patterns resurface.",
        bullets: [
            "Write a full letter to yourself to be read 6 months from now. Open with: 'You've just finished 28 days of emotional growth. Here is what you learned...'",
            "Document your 3 most transformative shifts in mindset, habit, or emotional awareness from this program.",
            "Close with a specific, heartfelt commitment to the emotional practices you will continue to prioritize — and why your future self deserves that care."
        ]
    }
};


// Custom Animated SVG Icons
const StatusIcon = ({ type }) => {
    switch (type) {
        case 'completed':
            return (
                <svg className="icon-svg completed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            );
        case 'current':
            return (
                <svg className="icon-svg current-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            );
        case 'unlocked':
            return (
                <svg className="icon-svg unlocked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
            );
        default:
            return (
                <svg className="icon-svg locked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            );
    }
};

const ImprovementPlan = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTask, setActiveTask] = useState(null); // The task currently being viewed

    const email = localStorage.getItem('mind-thinker-user');

    useEffect(() => {
        if (!email) {
            navigate('/try-now');
            return;
        }
        fetchUserStatus();
    }, [email]);

    const fetchUserStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/user/${email}/status`);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Plan data not found');
            }
        } catch (error) {
            console.error('Error fetching status:', error);
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const response = await fetch(`/api/user/${email}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskId })
            });
            const data = await response.json();
            if (data.success) {
                setUser({ ...user, completedTasks: data.completedTasks });
                setActiveTask(null);
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    if (loading) return (
        <div className="global-loader-container">
            <div className="loader-ring">
                <span className="loader-icon-inner">✨</span>
            </div>
            <p className="loader-text">Architecting your path...</p>
        </div>
    );

    if (error || !user) {
        return (
            <div className="plan-error-container">
                <div className="error-card glass-card">
                    <span className="error-icon">🗺️</span>
                    <h2>Plan Not Found</h2>
                    <p>{error === 'Plan data not found' ? "We couldn't find your personalized growth plan. You'll need to complete an assessment first." : (error || "There was a problem loading your plan.")}</p>
                    <div className="error-actions">
                        <button className="btn btn-primary" onClick={() => navigate('/try-now')}>✨ Start New Assessment</button>
                        <button className="btn btn-outline" onClick={() => navigate('/')}>Home</button>
                    </div>
                </div>
            </div>
        );
    }

    if (user.status !== 'active') {
        return (
            <div className="locked-dashboard">
                <div className="container">
                    <motion.div
                        className="locked-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="lock-icon">{user.status === 'awaiting_approval' ? '⏳' : '🔒'}</div>
                        <h2>{user.status === 'awaiting_approval' ? 'Awaiting Approval' : 'Plan Locked'}</h2>
                        <p>
                            {user.status === 'awaiting_approval'
                                ? 'We are verifying your payment screenshot. This usually takes 1-2 hours.'
                                : 'Please complete your payment to unlock your 4-week improvement plan.'}
                        </p>
                        {user.status === 'pending' || !user.plan ? (
                            <button className="btn btn-primary" onClick={() => navigate('/plan')}>✨ Unlock Full Plan</button>
                        ) : user.status === 'awaiting_approval' ? (
                            <div className="status-badge">Verifying Payment...</div>
                        ) : null}
                        <button className="btn btn-outline" onClick={() => navigate('/try-now')}>Start New Assessment</button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Helper to check if a day is unlocked
    const isDayUnlocked = (dayNum) => {
        if (dayNum === 1) return true;
        // Current day is unocked if previous day is completed
        return user.completedTasks.includes(`day-${dayNum - 1}`);
    };

    // Helper to identify the CURRENT active day that needs focus
    const getCurrentDay = () => {
        for (let i = 1; i <= 28; i++) {
            if (!user.completedTasks.includes(`day-${i}`)) return i;
        }
        return 28;
    };

    const currentActiveDay = getCurrentDay();

    return (
        <div className="dashboard-page">
            <div className="container">
                <header className="dashboard-header">
                    <h1>Your 1-Month Plan</h1>
                    <p>Complete each day's task to unlock the next level. Current target: <strong>Day {currentActiveDay}</strong></p>
                </header>

                <div className="map-container snake-layout">
                    {/* Decorative Background Elements */}
                    <div className="decorations">
                        <div className="decoration cloud c1">☁️</div>
                        <div className="decoration cloud c2">☁️</div>
                        <div className="decoration island i1">🏝️</div>
                        <div className="decoration island i2">⛰️</div>
                        <div className="decoration sparkle s1">✨</div>
                        <div className="decoration sparkle s2">✨</div>
                    </div>

                    <div className="weeks-wrapper">
                        {[0, 1, 2, 3].map(weekIndex => (
                            <div key={weekIndex} className={`week-row ${weekIndex % 2 === 1 ? 'reverse' : 'normal'}`}>
                                {Array.from({ length: 7 }).map((_, dayInWeek) => {
                                    const dayNum = weekIndex * 7 + (dayInWeek + 1);
                                    const taskId = `day-${dayNum}`;
                                    const isUnlocked = isDayUnlocked(dayNum);
                                    const isCompleted = user.completedTasks.includes(taskId);
                                    const isCurrent = dayNum === currentActiveDay;
                                    const isWeekEnd = dayNum % 7 === 0;

                                    return (
                                        <motion.div
                                            key={taskId}
                                            className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isWeekEnd ? 'week-end' : ''}`}
                                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: (dayNum % 7) * 0.05
                                            }}
                                            onClick={() => isUnlocked && !isCompleted && setActiveTask(dayNum)}
                                        >
                                            {isCurrent && (
                                                <motion.div
                                                    className="character-indicator"
                                                    animate={{
                                                        y: [0, -15, 0],
                                                        rotate: [-2, 2, -2]
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                                >
                                                    <div className="character-bubble">Next Step!</div>
                                                    <div className="character-icon">✨</div>
                                                </motion.div>
                                            )}

                                            <div className="node-3d-wrapper">
                                                <div className="node-content">
                                                    <div className="node-inner">
                                                        <div className="node-number">{dayNum < 10 ? `0${dayNum}` : dayNum}</div>
                                                        <div className="node-status-icon">
                                                            <StatusIcon type={isCompleted ? 'completed' : isCurrent ? 'current' : isUnlocked ? 'unlocked' : 'locked'} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="node-shadow"></div>
                                                {isCurrent && <div className="node-aura"></div>}
                                            </div>
                                            <div className="node-label">Day {dayNum}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {activeTask && (
                        <motion.div
                            className="task-modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="task-content"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                            >
                                <div className="modal-day-header">
                                    <span className="modal-day-icon">{PLAN_TASKS[activeTask]?.icon || "✨"}</span>
                                    <div className="modal-day-meta">
                                        <span className="modal-day-theme">{PLAN_TASKS[activeTask]?.theme || "Emotional Intelligence"}</span>
                                        <h2>Day {activeTask}: {PLAN_TASKS[activeTask]?.title || "Task"}</h2>
                                    </div>
                                </div>
                                <div className="lesson-text">
                                    <p>{PLAN_TASKS[activeTask]?.desc || "Complete this day's emotional intelligence exercise."}</p>
                                    <ul>
                                        {(PLAN_TASKS[activeTask]?.bullets || []).map((bullet, idx) => (
                                            <li key={idx}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-outline" onClick={() => setActiveTask(null)}>Close</button>
                                    <button className="btn btn-primary" onClick={() => handleCompleteTask(`day-${activeTask}`)}>Mark as Completed</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ImprovementPlan;
