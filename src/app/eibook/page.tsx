"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

// The 5 Components of Emotional Intelligence
const eiComponents = [
  {
    name: "Self-Awareness",
    description: "Recognizing your own emotions and how they affect your thoughts and behavior",
    skills: ["Emotional awareness", "Accurate self-assessment", "Self-confidence"],
    color: "from-violet-500 to-purple-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    name: "Self-Regulation",
    description: "Managing your emotions and impulses, adapting to changing circumstances",
    skills: ["Self-control", "Trustworthiness", "Adaptability", "Innovation"],
    color: "from-blue-500 to-cyan-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      </svg>
    ),
  },
  {
    name: "Motivation",
    description: "Using emotional factors to achieve goals, persist through setbacks",
    skills: ["Achievement drive", "Commitment", "Initiative", "Optimism"],
    color: "from-amber-500 to-orange-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Empathy",
    description: "Sensing others' emotions, understanding their perspective",
    skills: ["Understanding others", "Service orientation", "Developing others", "Leveraging diversity"],
    color: "from-rose-500 to-pink-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: "Social Skills",
    description: "Managing relationships, inspiring others, inducing desired responses",
    skills: ["Influence", "Communication", "Conflict management", "Leadership", "Collaboration"],
    color: "from-emerald-500 to-teal-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

// Key highlights from the book organized by parts
const bookParts = [
  {
    part: "Part One",
    title: "The Emotional Brain",
    color: "from-purple-500 to-indigo-600",
    chapters: [
      {
        title: "What Are Emotions For?",
        highlights: [
          "Emotions are impulses to act—instant plans for handling life",
          "Each emotion prepares the body for a different response",
          "The emotional mind is far quicker than the rational mind",
        ],
      },
      {
        title: "Anatomy of an Emotional Hijacking",
        highlights: [
          "The amygdala can trigger an emotional response before the cortex knows what's happening",
          "Emotional memories stored in the amygdala can be imprecise",
          "Neural pathways from amygdala to cortex are stronger than reverse pathways",
        ],
      },
    ],
  },
  {
    part: "Part Two",
    title: "The Nature of Emotional Intelligence",
    color: "from-blue-500 to-cyan-600",
    chapters: [
      {
        title: "When Smart Is Dumb",
        highlights: [
          "IQ contributes only about 20% to factors determining life success",
          "Emotional intelligence can be as powerful as IQ, sometimes more so",
          "Academic intelligence offers virtually no preparation for life's emotional challenges",
        ],
      },
      {
        title: "Know Thyself",
        highlights: [
          "Self-awareness is the keystone of emotional intelligence",
          "Alexithymia: inability to express feelings in words",
          "The gut feeling is a form of self-awareness—somatic markers guide decisions",
        ],
      },
      {
        title: "Passion's Slaves",
        highlights: [
          "Managing emotions is a full-time inner job",
          "Ventilating anger typically pumps up arousal rather than reducing it",
          "Worry is the core of all anxiety—rehearsing what might go wrong",
        ],
      },
      {
        title: "The Master Aptitude",
        highlights: [
          "Flow state: emotional intelligence at its best",
          "The marshmallow test predicts SAT scores better than IQ",
          "Hope and optimism predict academic achievement",
        ],
      },
      {
        title: "The Roots of Empathy",
        highlights: [
          "Empathy builds on self-awareness; the more open to our own emotions, the more skilled in reading feelings",
          "90% or more of emotional messages are nonverbal",
          "Empathy develops in infancy through attunement with caregivers",
        ],
      },
      {
        title: "The Social Arts",
        highlights: [
          "Expressing emotions is fundamental to social influence",
          "We transmit and catch moods from each other—emotional contagion",
          "Display rules: cultural norms for when to show what emotions",
        ],
      },
    ],
  },
  {
    part: "Part Three",
    title: "Emotional Intelligence Applied",
    color: "from-emerald-500 to-teal-600",
    chapters: [
      {
        title: "Intimate Enemies",
        highlights: [
          "Contempt is the most destructive emotion in marriage",
          "Flooding: being overwhelmed by partner's negativity",
          "Emotional intelligence in couples predicts relationship success",
        ],
      },
      {
        title: "Managing with Heart",
        highlights: [
          "Criticism is one of the most destructive ways to handle complaints",
          "The cost of emotional incompetence at work is enormous",
          "Group IQ depends on emotional intelligence of members",
        ],
      },
      {
        title: "Mind and Medicine",
        highlights: [
          "Chronic anger and anxiety are as dangerous as smoking",
          "Depression worsens prognosis for heart disease",
          "Emotional support improves medical outcomes",
        ],
      },
    ],
  },
  {
    part: "Part Four",
    title: "Windows of Opportunity",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        title: "The Family Crucible",
        highlights: [
          "Emotional learning begins in the earliest moments of life",
          "Three most harmful parenting styles: ignoring feelings, being too laissez-faire, being contemptuous",
          "Children absorb parents' emotional skills or deficits",
        ],
      },
      {
        title: "Trauma and Emotional Relearning",
        highlights: [
          "PTSD involves amygdala hypervigilance",
          "Recovery requires re-encoding traumatic memories with safety",
          "Art and play therapy help children process trauma nonverbally",
        ],
      },
      {
        title: "Temperament Is Not Destiny",
        highlights: [
          "About 15-20% of children are born timid, another 15-20% bold",
          "Childhood temperament can be modified by experience",
          "The brain remains plastic; emotional habits can change",
        ],
      },
    ],
  },
  {
    part: "Part Five",
    title: "Emotional Literacy",
    color: "from-rose-500 to-pink-600",
    chapters: [
      {
        title: "The Cost of Emotional Illiteracy",
        highlights: [
          "Rising rates of depression, violence, and eating disorders among youth",
          "Emotional deficits are risk factors for antisocial behavior",
          "Prevention programs work better than remediation",
        ],
      },
      {
        title: "Schooling the Emotions",
        highlights: [
          "SEL (Social and Emotional Learning) programs improve academic performance",
          "Emotional literacy should be taught alongside traditional subjects",
          "Schools are the one place reaching virtually all children",
        ],
      },
    ],
  },
];

// Research studies mentioned in the book
const researchStudies = [
  {
    title: "The Marshmallow Test",
    researcher: "Walter Mischel, Stanford University",
    year: "1960s-1970s",
    description: "Four-year-olds were given a marshmallow and told they could eat it now, or wait and get two. Those who waited showed dramatically better outcomes 14 years later.",
    findings: [
      "Children who waited scored 210 points higher on SATs",
      "Better able to cope with frustration and stress as adolescents",
      "More socially competent and self-assertive",
      "Better at pursuing goals despite setbacks",
    ],
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "The Nun Study",
    researcher: "University of Kentucky",
    year: "1990s",
    description: "Analysis of autobiographies written by nuns in the 1930s found emotional content predicted longevity decades later.",
    findings: [
      "Positive emotional content predicted longer life",
      "90% of most cheerful quarter alive at 85 vs 34% of least cheerful",
      "Emotions in early adulthood predict health outcomes 60 years later",
    ],
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Amygdala Studies",
    researcher: "Joseph LeDoux, NYU",
    year: "1980s-1990s",
    description: "Revolutionary research mapping the brain's emotional circuits and the role of the amygdala in emotional responses.",
    findings: [
      "Amygdala receives input before the neocortex",
      "Emotional memories can trigger without conscious awareness",
      "The 'low road' allows instant emotional responses",
      "Explains emotional hijacking phenomenon",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Facial Expression Research",
    researcher: "Paul Ekman, UCSF",
    year: "1970s-1990s",
    description: "Cross-cultural studies identifying universal facial expressions of emotion recognized across all cultures.",
    findings: [
      "Six basic emotions recognized universally: happiness, sadness, anger, fear, surprise, disgust",
      "Micro-expressions reveal true feelings in 1/25th of a second",
      "Display rules vary by culture, but base expressions are universal",
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Somatic Marker Hypothesis",
    researcher: "Antonio Damasio, University of Iowa",
    year: "1990s",
    description: "Patients with damage to emotion-related brain areas couldn't make good decisions despite intact IQ.",
    findings: [
      "Emotions are essential for rational decision-making",
      "'Gut feelings' are somatic markers guiding choices",
      "Pure reason without emotion leads to poor decisions",
      "Challenges the reason-vs-emotion dichotomy",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "PATHS Curriculum Evaluation",
    researcher: "Mark Greenberg, Penn State",
    year: "1990s",
    description: "Study of the Promoting Alternative Thinking Strategies program in schools teaching emotional intelligence.",
    findings: [
      "Improved ability to recognize and label emotions",
      "Reduced aggression and behavioral problems",
      "Better conflict resolution skills",
      "Improved academic performance",
    ],
    color: "from-cyan-500 to-blue-600",
  },
];

// Quotes from the book
const quotes = [
  {
    text: "In a very real sense we have two minds, one that thinks and one that feels.",
    chapter: "Chapter 1",
    context: "On the fundamental architecture of human cognition",
  },
  {
    text: "Self-awareness—recognizing a feeling as it happens—is the keystone of emotional intelligence.",
    chapter: "Chapter 4",
    context: "Defining the foundation of EQ",
  },
  {
    text: "There is perhaps no psychological skill more fundamental than resisting impulse. It is the root of all emotional self-control.",
    chapter: "Chapter 6",
    context: "On the importance of self-regulation",
  },
  {
    text: "The emotional brain responds to an event more quickly than the thinking brain.",
    chapter: "Chapter 2",
    context: "On the speed of emotional processing",
  },
  {
    text: "IQ and emotional intelligence are not opposing competencies, but rather separate ones.",
    chapter: "Chapter 3",
    context: "Distinguishing types of intelligence",
  },
  {
    text: "People who cannot marshal some control over their emotional life fight inner battles that sabotage their ability for focused work and clear thought.",
    chapter: "Chapter 5",
    context: "On the cost of emotional dysregulation",
  },
  {
    text: "The more socially intelligent, the more able to understand emotional messages—and the more vital they become for leadership.",
    chapter: "Chapter 8",
    context: "On social intelligence and leadership",
  },
  {
    text: "Empathy builds on self-awareness; the more open we are to our own emotions, the more skilled we will be in reading feelings.",
    chapter: "Chapter 7",
    context: "On the relationship between self-awareness and empathy",
  },
  {
    text: "Flow is the ultimate in harnessing the emotions in the service of performance and learning.",
    chapter: "Chapter 6",
    context: "On optimal emotional states",
  },
  {
    text: "Emotional intelligence is not fixed at birth. It can be nurtured and strengthened in all of us.",
    chapter: "Epilogue",
    context: "On the malleability of emotional intelligence",
  },
];

// Recommended follow-up books
const followUpBooks = [
  {
    title: "Working with Emotional Intelligence",
    author: "Daniel Goleman",
    year: "1998",
    description: "Applies EI concepts specifically to the workplace, identifying competencies that distinguish star performers.",
    why: "Natural sequel applying the science to career success",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Social Intelligence",
    author: "Daniel Goleman",
    year: "2006",
    description: "Explores the neuroscience of human connections and how relationships shape our brains and well-being.",
    why: "Deepens the interpersonal dimension of EI",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Emotional Intelligence 2.0",
    author: "Travis Bradberry & Jean Greaves",
    year: "2009",
    description: "Practical strategies with online assessment to measure and improve your EQ scores.",
    why: "Actionable toolkit for developing EI skills",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Primal Leadership",
    author: "Goleman, Boyatzis & McKee",
    year: "2002",
    description: "How emotionally intelligent leadership creates resonance that improves organizational performance.",
    why: "Essential for managers and executives",
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Focus: The Hidden Driver of Excellence",
    author: "Daniel Goleman",
    year: "2013",
    description: "Explores attention as the foundation of emotional intelligence and high performance.",
    why: "Updates EI research with attention science",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Permission to Feel",
    author: "Marc Brackett",
    year: "2019",
    description: "Yale Center director introduces RULER approach to emotional intelligence in schools and life.",
    why: "Modern application of EI in education",
    color: "from-violet-500 to-purple-600",
  },
];

// Active tab state for chart
type TabType = "overview" | "personal" | "social";

export default function EIBookPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedPart, setExpandedPart] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-[#0a0a0b]/80 backdrop-blur-xl z-50 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-light tracking-wider">
            <span className="text-white/90">EQ</span>
            <span className="text-indigo-400">Mind</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#components" className="text-sm text-white/60 hover:text-white transition-colors">
              Components
            </a>
            <a href="#highlights" className="text-sm text-white/60 hover:text-white transition-colors">
              Highlights
            </a>
            <a href="#research" className="text-sm text-white/60 hover:text-white transition-colors">
              Research
            </a>
            <a href="#quotes" className="text-sm text-white/60 hover:text-white transition-colors">
              Quotes
            </a>
            <a href="/" className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              Take Assessment
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-indigo-400 border border-indigo-400/30 rounded-full">
                The Book That Started It All
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-extralight leading-tight mb-6 tracking-tight"
            >
              Emotional
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-light">
                Intelligence
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-white/40 mb-2 font-light">
              by Daniel Goleman
            </motion.p>

            <motion.p variants={fadeInUp} className="text-lg text-white/60 mb-8 font-light leading-relaxed">
              The groundbreaking 1995 bestseller that redefined what it means to be smart,
              introducing the world to the concept that emotional intelligence can matter
              more than IQ for success in life.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/50">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>5M+ Copies Sold</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                <span>40+ Languages</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 Years on NYT Bestseller List</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4">
              <a
                href="#components"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Explore the Science
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#quotes"
                className="px-8 py-4 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors"
              >
                Read Quotes
              </a>
            </motion.div>
          </motion.div>

          {/* Book Cover Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 scale-110" />

              {/* Book Cover */}
              <div className="relative w-72 h-[440px] rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 shadow-2xl shadow-indigo-500/30 p-8 flex flex-col justify-between transform hover:scale-105 transition-transform duration-500">
                <div>
                  <p className="text-indigo-200 text-sm tracking-wider mb-2">DANIEL GOLEMAN</p>
                  <h2 className="text-3xl font-bold text-white leading-tight">
                    Emotional
                    <br />
                    Intelligence
                  </h2>
                </div>
                <div>
                  <div className="w-16 h-1 bg-white/30 mb-4" />
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Why It Can Matter More Than IQ
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-bold text-white">1995</span>
              </motion.div>
            </div>
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

      {/* About the Author Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-6xl font-light text-white">
                    DG
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
                About the Author
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight mb-6">
                Daniel Goleman
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-4">
                Daniel Goleman is a psychologist and science journalist who covered the brain and
                behavioral sciences for The New York Times for twelve years. He was nominated twice
                for the Pulitzer Prize and received the American Psychological Association&apos;s Lifetime
                Achievement Award.
              </p>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                His 1995 book <em>Emotional Intelligence</em> was on The New York Times bestseller
                list for a year-and-a-half, and became an international sensation, selling over
                five million copies worldwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60">Harvard PhD</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60">NYT Science Writer</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60">12 Books</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/60">APA Award Winner</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The 5 Components Chart Section */}
      <section id="components" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              The Framework
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Five Components of EI
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              Goleman identified five key domains that comprise emotional intelligence,
              divided into personal competence and social competence.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex justify-center gap-2 mb-12"
          >
            {[
              { id: "overview" as TabType, label: "Overview" },
              { id: "personal" as TabType, label: "Personal Competence" },
              { id: "social" as TabType, label: "Social Competence" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Chart Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Circular Chart Visualization */}
                <div className="relative max-w-3xl mx-auto">
                  {/* Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center z-10">
                    <span className="text-lg font-medium text-white text-center">
                      Emotional<br/>Intelligence
                    </span>
                  </div>

                  {/* Components arranged in circle */}
                  <div className="grid grid-cols-3 gap-6">
                    {eiComponents.slice(0, 3).map((component, index) => (
                      <motion.div
                        key={component.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${component.color} bg-opacity-20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                          {component.icon}
                        </div>
                        <h3 className="text-lg font-light text-white/90 mb-2">{component.name}</h3>
                        <p className="text-sm text-white/50 mb-4">{component.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {component.skills.slice(0, 2).map((skill) => (
                            <span key={skill} className="text-xs px-2 py-1 bg-white/5 rounded text-white/40">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
                    {eiComponents.slice(3).map((component, index) => (
                      <motion.div
                        key={component.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index + 3) * 0.1 }}
                        className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${component.color} bg-opacity-20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                          {component.icon}
                        </div>
                        <h3 className="text-lg font-light text-white/90 mb-2">{component.name}</h3>
                        <p className="text-sm text-white/50 mb-4">{component.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {component.skills.slice(0, 2).map((skill) => (
                            <span key={skill} className="text-xs px-2 py-1 bg-white/5 rounded text-white/40">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-white/90 mb-2">Personal Competence</h3>
                  <p className="text-white/50">How we manage ourselves</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {eiComponents.slice(0, 3).map((component, index) => (
                    <motion.div
                      key={component.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-8 rounded-2xl bg-gradient-to-br ${component.color} bg-opacity-10 border border-white/10`}
                    >
                      <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                        {component.icon}
                      </div>
                      <h3 className="text-xl font-light text-white mb-3">{component.name}</h3>
                      <p className="text-white/70 text-sm mb-6">{component.description}</p>
                      <div className="space-y-2">
                        {component.skills.map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <span className="text-sm text-white/60">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "social" && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-white/90 mb-2">Social Competence</h3>
                  <p className="text-white/50">How we manage relationships</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {eiComponents.slice(3).map((component, index) => (
                    <motion.div
                      key={component.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-8 rounded-2xl bg-gradient-to-br ${component.color} bg-opacity-10 border border-white/10`}
                    >
                      <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                        {component.icon}
                      </div>
                      <h3 className="text-xl font-light text-white mb-3">{component.name}</h3>
                      <p className="text-white/70 text-sm mb-6">{component.description}</p>
                      <div className="space-y-2">
                        {component.skills.map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <span className="text-sm text-white/60">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="highlights" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Chapter by Chapter
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Key Highlights
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              Explore the major insights and revelations from each part of the book.
            </p>
          </motion.div>

          <div className="space-y-4">
            {bookParts.map((part, partIndex) => (
              <motion.div
                key={part.part}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: partIndex * 0.05 }}
              >
                <button
                  onClick={() => setExpandedPart(expandedPart === partIndex ? null : partIndex)}
                  className={`w-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-left ${
                    expandedPart === partIndex ? "border-white/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${part.color} flex items-center justify-center text-white font-medium`}>
                        {partIndex + 1}
                      </div>
                      <div>
                        <span className="text-white/40 text-sm">{part.part}</span>
                        <h3 className="text-xl font-light text-white/90">{part.title}</h3>
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-white/40 transition-transform ${
                        expandedPart === partIndex ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedPart === partIndex && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {part.chapters.map((chapter, chapterIndex) => (
                          <div key={chapter.title} className="pl-16">
                            <h4 className="text-lg text-white/80 mb-3">{chapter.title}</h4>
                            <ul className="space-y-2">
                              {chapter.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${part.color} mt-2 flex-shrink-0`} />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Studies Section */}
      <section id="research" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Scientific Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Landmark Research
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              The studies and experiments that form the scientific backbone of emotional intelligence theory.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {researchStudies.map((study, index) => (
              <motion.div
                key={study.title}
                variants={fadeInUp}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs bg-gradient-to-r ${study.color} text-white mb-2`}>
                      {study.year}
                    </span>
                    <h3 className="text-xl font-light text-white/90">{study.title}</h3>
                    <p className="text-sm text-white/40">{study.researcher}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{study.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Key Findings</p>
                  {study.findings.map((finding, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-white/50">{finding}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              In Goleman&apos;s Words
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Memorable Quotes
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              Powerful insights and memorable passages from the book.
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
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="absolute top-6 left-6 text-6xl text-indigo-500/20 font-serif">
                  &ldquo;
                </div>
                <blockquote className="relative z-10">
                  <p className="text-lg font-light leading-relaxed text-white/80 mb-4 pl-8">
                    {quote.text}
                  </p>
                  <footer className="pl-8">
                    <span className="text-sm text-indigo-400">{quote.chapter}</span>
                    <span className="text-white/30 mx-2">·</span>
                    <span className="text-sm text-white/40">{quote.context}</span>
                  </footer>
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brain Diagram Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              The Neuroscience
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              The Emotional Brain
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              Understanding how emotions are processed in the brain—the foundation of Goleman&apos;s thesis.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Brain Visualization */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Brain outline */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10" />
                </div>

                {/* Amygdala */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-medium">Amygdala</span>
                  </div>
                </motion.div>

                {/* Neocortex */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-8 left-1/2 -translate-x-1/2"
                >
                  <div className="w-24 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Neocortex</span>
                  </div>
                </motion.div>

                {/* Thalamus */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="absolute top-1/3 right-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Thalamus</span>
                  </div>
                </motion.div>

                {/* Pathways */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <motion.path
                    d="M100 60 L100 100"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                  <motion.path
                    d="M140 80 L110 100"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                </svg>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <h4 className="text-lg font-medium text-rose-400 mb-2">The Amygdala</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  The brain&apos;s emotional sentinel. It can trigger a response before the thinking
                  brain (neocortex) has time to process what&apos;s happening—the &quot;emotional hijacking&quot;
                  that Goleman describes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-lg font-medium text-blue-400 mb-2">The Neocortex</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  The thinking brain that allows for nuanced emotional response. It can modulate
                  the amygdala&apos;s reactions—but the pathways from amygdala to cortex are stronger
                  than those running the other way.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-lg font-medium text-amber-400 mb-2">Two Pathways</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Sensory signals take both a &quot;high road&quot; through the cortex for careful analysis,
                  and a &quot;low road&quot; directly to the amygdala for rapid response—explaining why emotions
                  can override reason.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Follow-up Books Section */}
      <section id="books" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 block">
              Continue Learning
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              What to Read Next
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              Expand your understanding with these follow-up books building on Goleman&apos;s work.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {followUpBooks.map((book, index) => (
              <motion.div
                key={book.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-16 rounded bg-gradient-to-br ${book.color} opacity-80 flex-shrink-0`} />
                    <div>
                      <h3 className="text-lg font-light text-white/90 mb-1">{book.title}</h3>
                      <p className="text-sm text-white/40">{book.author} · {book.year}</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{book.description}</p>
                  <div className="flex items-center gap-2 text-indigo-400 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>{book.why}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extralight mb-6">
                Discover Your EQ Type
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 font-light">
                Take our assessment inspired by Goleman&apos;s research to discover your
                emotional intelligence profile.
              </p>
              <a
                href="/#quiz"
                className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Take the Assessment
              </a>
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
            <a href="/" className="text-white/30 hover:text-white/60 transition-colors">
              Home
            </a>
            <a href="/#quiz" className="text-white/30 hover:text-white/60 transition-colors">
              Assessment
            </a>
            <a href="/#books" className="text-white/30 hover:text-white/60 transition-colors">
              More Books
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
