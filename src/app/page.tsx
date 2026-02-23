"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const quotes = [
  {
    text: "In a very real sense we have two minds, one that thinks and one that feels.",
    context: "On the dual nature of human intelligence",
  },
  {
    text: "There is perhaps no psychological skill more fundamental than resisting impulse.",
    context: "On self-regulation",
  },
  {
    text: "Self-awareness—recognizing a feeling as it happens—is the keystone of emotional intelligence.",
    context: "On knowing yourself",
  },
  {
    text: "The emotional brain responds to an event more quickly than the thinking brain.",
    context: "On emotional processing",
  },
];

const books = [
  {
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    year: "1995",
    description:
      "The groundbreaking book that introduced EQ to the mainstream and redefined what it means to be smart.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Emotional Intelligence 2.0",
    author: "Travis Bradberry & Jean Greaves",
    year: "2009",
    description:
      "A practical guide with strategies to increase your EQ, featuring an online assessment.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Working with Emotional Intelligence",
    author: "Daniel Goleman",
    year: "1998",
    description:
      "How emotional intelligence drives workplace success, leadership, and career achievement.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "The Language of Emotions",
    author: "Karla McLaren",
    year: "2010",
    description:
      "A revolutionary approach to understanding what your emotions are trying to tell you.",
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Permission to Feel",
    author: "Marc Brackett",
    year: "2019",
    description:
      "Yale professor reveals the power of emotional intelligence to transform our lives.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Primal Leadership",
    author: "Daniel Goleman, Richard Boyatzis & Annie McKee",
    year: "2002",
    description:
      "How emotional intelligence shapes great leadership and creates resonant organizations.",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "The EQ Edge",
    author: "Steven J. Stein & Howard E. Book",
    year: "2011",
    description:
      "Practical insights on using emotional intelligence for success in work and life.",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Social Intelligence",
    author: "Daniel Goleman",
    year: "2006",
    description:
      "The science of human relationships and how our brains are wired for connection.",
    color: "from-sky-500 to-indigo-600",
  },
  {
    title: "Nonviolent Communication",
    author: "Marshall B. Rosenberg",
    year: "1999",
    description:
      "A powerful framework for compassionate communication and resolving conflicts peacefully.",
    color: "from-lime-500 to-green-600",
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    year: "2012",
    description:
      "How vulnerability and emotional courage transform the way we live, love, and lead.",
    color: "from-orange-500 to-red-600",
  },
];

const emotionTypes = {
  self_aware: {
    name: "The Introspector",
    color: "from-indigo-500 to-purple-500",
    description:
      "You have a deep understanding of your own emotions. You recognize your feelings as they happen and understand how they influence your thoughts and actions. This self-knowledge helps you make better decisions.",
    strengths: [
      "Recognizing emotional patterns",
      "Understanding personal triggers",
      "Honest self-assessment",
    ],
    growth: "Practice sharing your insights with others to deepen connections.",
  },
  empathic: {
    name: "The Connector",
    color: "from-rose-500 to-pink-500",
    description:
      "You naturally tune into others' emotions and perspectives. Your ability to sense what others feel makes you an excellent listener and trusted confidant. People feel understood in your presence.",
    strengths: [
      "Reading emotional cues",
      "Active listening",
      "Building rapport",
    ],
    growth: "Remember to set boundaries so empathy doesn't become overwhelming.",
  },
  regulated: {
    name: "The Anchor",
    color: "from-emerald-500 to-teal-500",
    description:
      "You excel at managing your emotional responses. Even in challenging situations, you maintain composure and think clearly. Your stability is a calming presence for those around you.",
    strengths: [
      "Stress management",
      "Impulse control",
      "Adaptability under pressure",
    ],
    growth: "Allow yourself to fully experience emotions rather than always controlling them.",
  },
  motivated: {
    name: "The Driver",
    color: "from-amber-500 to-orange-500",
    description:
      "You possess strong internal motivation and optimism. Setbacks don't keep you down for long—you channel emotions into productive action and persist toward your goals with resilience.",
    strengths: [
      "Goal persistence",
      "Optimistic outlook",
      "Initiative and drive",
    ],
    growth: "Balance achievement focus with present-moment appreciation.",
  },
  social: {
    name: "The Orchestrator",
    color: "from-cyan-500 to-blue-500",
    description:
      "You navigate social situations with skill and grace. You build networks, resolve conflicts, and inspire cooperation. Your emotional intelligence shines brightest in group dynamics.",
    strengths: [
      "Conflict resolution",
      "Team building",
      "Persuasion and influence",
    ],
    growth: "Spend time in solitude to develop deeper self-reflection.",
  },
};

type EmotionTypeKey = keyof typeof emotionTypes;

const questions = [
  {
    id: 1,
    question: "When you wake up feeling off, what's your first instinct?",
    options: [
      { text: "Analyze why I'm feeling this way", type: "self_aware" as EmotionTypeKey },
      { text: "Reach out to someone who might understand", type: "empathic" as EmotionTypeKey },
      { text: "Use techniques to shift my mood", type: "regulated" as EmotionTypeKey },
      { text: "Focus on tasks to channel the energy", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 2,
    question: "In a heated group discussion, you typically:",
    options: [
      { text: "Notice how the tension affects you personally", type: "self_aware" as EmotionTypeKey },
      { text: "Sense what each person is really feeling", type: "empathic" as EmotionTypeKey },
      { text: "Stay calm and help de-escalate", type: "regulated" as EmotionTypeKey },
      { text: "Guide the group toward a resolution", type: "social" as EmotionTypeKey },
    ],
  },
  {
    id: 3,
    question: "When a friend shares a problem, you're most likely to:",
    options: [
      { text: "Share a similar experience of your own", type: "self_aware" as EmotionTypeKey },
      { text: "Really listen and validate their feelings", type: "empathic" as EmotionTypeKey },
      { text: "Help them see the situation more calmly", type: "regulated" as EmotionTypeKey },
      { text: "Suggest actionable solutions", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 4,
    question: "After making a mistake, your first response is to:",
    options: [
      { text: "Reflect on what led to the error", type: "self_aware" as EmotionTypeKey },
      { text: "Consider how it affected others involved", type: "empathic" as EmotionTypeKey },
      { text: "Manage any frustration before reacting", type: "regulated" as EmotionTypeKey },
      { text: "Immediately start fixing it", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 5,
    question: "At a party where you know few people, you:",
    options: [
      { text: "Observe and notice your comfort level", type: "self_aware" as EmotionTypeKey },
      { text: "Find someone who looks like they need company", type: "empathic" as EmotionTypeKey },
      { text: "Stay relaxed and let conversations happen naturally", type: "regulated" as EmotionTypeKey },
      { text: "Actively introduce yourself and connect people", type: "social" as EmotionTypeKey },
    ],
  },
  {
    id: 6,
    question: "When pursuing a difficult long-term goal, you rely most on:",
    options: [
      { text: "Understanding your deeper motivations", type: "self_aware" as EmotionTypeKey },
      { text: "Support and accountability from others", type: "social" as EmotionTypeKey },
      { text: "Staying patient during setbacks", type: "regulated" as EmotionTypeKey },
      { text: "Your inner drive and determination", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 7,
    question: "When someone criticizes you unfairly, you:",
    options: [
      { text: "Check in with yourself about what's true", type: "self_aware" as EmotionTypeKey },
      { text: "Try to understand their perspective", type: "empathic" as EmotionTypeKey },
      { text: "Take a breath before responding", type: "regulated" as EmotionTypeKey },
      { text: "Address it directly and move forward", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 8,
    question: "You're most energized when:",
    options: [
      { text: "Having a personal insight or breakthrough", type: "self_aware" as EmotionTypeKey },
      { text: "Deeply connecting with another person", type: "empathic" as EmotionTypeKey },
      { text: "Successfully navigating a stressful situation", type: "regulated" as EmotionTypeKey },
      { text: "Bringing people together for a common purpose", type: "social" as EmotionTypeKey },
    ],
  },
  {
    id: 9,
    question: "When feeling overwhelmed, your go-to strategy is:",
    options: [
      { text: "Journaling or self-reflection", type: "self_aware" as EmotionTypeKey },
      { text: "Talking it through with someone", type: "empathic" as EmotionTypeKey },
      { text: "Breathing exercises or meditation", type: "regulated" as EmotionTypeKey },
      { text: "Making a plan and taking action", type: "motivated" as EmotionTypeKey },
    ],
  },
  {
    id: 10,
    question: "People most often come to you for:",
    options: [
      { text: "Honest, thoughtful perspective", type: "self_aware" as EmotionTypeKey },
      { text: "Understanding and emotional support", type: "empathic" as EmotionTypeKey },
      { text: "Calm presence during chaos", type: "regulated" as EmotionTypeKey },
      { text: "Motivation and encouragement", type: "motivated" as EmotionTypeKey },
    ],
  },
];

const features = [
  {
    title: "Self-Awareness",
    description:
      "Understand your emotions, triggers, and patterns through guided reflection and mood tracking.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Empathy",
    description:
      "Develop deeper connections by recognizing and responding to others' emotional states.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Self-Regulation",
    description:
      "Master techniques to manage stress, anxiety, and intense emotions effectively.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Motivation",
    description:
      "Cultivate intrinsic drive and resilience to pursue goals despite setbacks.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    title: "Social Skills",
    description:
      "Improve communication, conflict resolution, and leadership capabilities.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Mindfulness",
    description:
      "Practice present-moment awareness to enhance emotional clarity and decision-making.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, EmotionTypeKey>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (type: EmotionTypeKey) => {
    const newAnswers = { ...answers, [currentQuestion]: type };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResult = (): EmotionTypeKey => {
    const counts: Record<EmotionTypeKey, number> = {
      self_aware: 0,
      empathic: 0,
      regulated: 0,
      motivated: 0,
      social: 0,
    };

    Object.values(answers).forEach((type) => {
      counts[type]++;
    });

    return Object.entries(counts).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0] as EmotionTypeKey;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const result = showResults ? emotionTypes[calculateResult()] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-[#0a0a0b]/80 backdrop-blur-xl z-50 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-light tracking-wider">
            <span className="text-white/90">EQ</span>
            <span className="text-indigo-400">Mind</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#quiz"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Assessment
            </a>
            <a
              href="/eibook"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              The Book
            </a>
            <a
              href="#books"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Reading List
            </a>
            <a
              href="#cta"
              className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-indigo-400 border border-indigo-400/30 rounded-full">
              Understand Yourself
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extralight leading-tight mb-8 tracking-tight"
          >
            Master the Art of
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-light">
              Emotional Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Discover your emotional type, develop self-awareness, and unlock
            your full potential with science-backed assessments and training.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#quiz"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Take the Assessment
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#quotes"
              className="px-8 py-4 text-white/70 hover:text-white transition-colors font-light"
            >
              Explore Wisdom →
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Discover Your Type
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              EQ Assessment
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-light">
              Answer 10 questions to discover your emotional intelligence profile
              and learn how you navigate the world of emotions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden">
              <AnimatePresence mode="wait">
                {!quizStarted ? (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-12 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light mb-4">
                      Ready to discover your emotional type?
                    </h3>
                    <p className="text-white/50 mb-8 max-w-md mx-auto">
                      This quick assessment will reveal your dominant emotional
                      intelligence style based on the five core competencies.
                    </p>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                    >
                      Start Assessment
                    </button>
                  </motion.div>
                ) : showResults && result ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-12"
                  >
                    <div className="text-center mb-8">
                      <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
                        Your Emotional Type
                      </span>
                      <h3
                        className={`text-4xl font-light mb-2 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}
                      >
                        {result.name}
                      </h3>
                    </div>

                    <p className="text-white/70 text-center mb-8 leading-relaxed">
                      {result.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
                          Your Strengths
                        </h4>
                        <ul className="space-y-2">
                          {result.strengths.map((strength, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-white/80"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
                          Growth Opportunity
                        </h4>
                        <p className="text-white/80">{result.growth}</p>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-3 border border-white/10 rounded-full text-white/70 hover:bg-white/5 transition-colors"
                      >
                        Retake Assessment
                      </button>
                      <a
                        href="#books"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                      >
                        Explore Books
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`question-${currentQuestion}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-12"
                  >
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-white/40 mb-2">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light mb-8 text-center">
                      {questions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option.type)}
                          className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                            answers[currentQuestion] === option.type
                              ? "bg-indigo-500/20 border-indigo-500/50"
                              : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                          }`}
                        >
                          <span className="text-white/80">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Wisdom from the Source
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Words That Transform
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-light">
              Insights from Daniel Goleman&apos;s groundbreaking work on
              Emotional Intelligence
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="absolute top-6 left-6 text-6xl text-indigo-500/20 font-serif">
                  &ldquo;
                </div>
                <blockquote className="relative z-10">
                  <p className="text-lg md:text-xl font-light leading-relaxed text-white/80 mb-4 pl-8">
                    {quote.text}
                  </p>
                  <footer className="pl-8 text-sm text-white/40">
                    — {quote.context}
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12 text-white/40 text-sm"
          >
            From &ldquo;Emotional Intelligence: Why It Can Matter More Than
            IQ&rdquo; by Daniel Goleman
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Core Competencies
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Build Emotional Mastery
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-light">
              Develop the five pillars of emotional intelligence through our
              comprehensive training program.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-3 text-white/90">
                  {feature.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Essential Reading
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Top 10 EI Books
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-light">
              The most influential books on emotional intelligence to deepen
              your understanding and transform your life.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {books.map((book, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-white/30 font-mono">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl font-light text-white/90">
                          {book.title}
                        </h3>
                      </div>
                      <p className="text-sm text-white/40">
                        {book.author} · {book.year}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-16 rounded bg-gradient-to-br ${book.color} opacity-80 flex-shrink-0`}
                    />
                  </div>
                  <p className="text-white/50 font-light leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extralight mb-6">
                Ready to Transform Your EQ?
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 font-light">
                Join thousands developing their emotional intelligence and
                building more meaningful relationships.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                  Get Access
                </button>
              </div>
              <p className="text-sm text-white/30 mt-6">
                Free 7-day trial · No credit card required
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/30 text-sm font-light">
            © 2025 EQMind. All rights reserved.
          </div>
          <div className="flex items-center gap-8 text-sm font-light">
            <a
              href="#"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
