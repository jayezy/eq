"use client";

import { useState } from "react";
import Link from "next/link";
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
      staggerChildren: 0.08,
    },
  },
};

interface BookLearning {
  id: number;
  title: string;
  author: string;
  color: string;
  quote: string;
  patterns: string[];
  beliefToDiscard: string;
  behaviorsToAdopt: string[];
  notes?: string[];
  readAgain?: boolean;
  isEmpty?: boolean;
}

const bookLearnings: BookLearning[] = [
  {
    id: 0,
    title: "Why Fish Don't Exist",
    author: "Lulu Miller",
    color: "from-teal-500 to-cyan-600",
    quote:
      "The best thing to do when the world falls apart is to keep going — even if the structure you're building might be wrong.",
    patterns: [
      "Keep your beliefs in check and question them relentlessly. Unchecked beliefs can become delusions that harm others — David Starr Jordan believed in eugenics and altered lives without consent.",
      "Passion can coexist with moral blindness. Brilliance in one area doesn't grant moral authority in another.",
      "The universe doesn't owe us order. The meaning we find is the meaning we create.",
    ],
    beliefToDiscard:
      "Sacrificing your morals is ever acceptable. If you value something, do not compromise on it. Use your values as guiding principles — they are not negotiable, not even once.",
    behaviorsToAdopt: [
      "If you're passionate about something, block out the world's noise. The world will always throw negativity at you. Learn to find the diamonds in a coal mine.",
    ],
  },
  {
    id: 1,
    title: "Can't Hurt Me",
    author: "David Goggins",
    color: "from-red-500 to-orange-600",
    quote:
      "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your potential.",
    patterns: [
      "Set the next goal before you achieve your current one. Never let yourself become complacent at the peak — always have the next mountain in sight.",
      "Strong willpower makes the opinions of naysayers irrelevant. What people think or say doesn't matter when you have iron resolve.",
      "Do not give up. Try again. Try a different approach. Change your mindset. Adjust your direction — but keep moving forward.",
    ],
    beliefToDiscard:
      "If you come from nothing, you can't make it to the top. This is false. Hard work compounds over a lifetime. Put in the work every single day and the compounding effect will carry you further than you imagined.",
    behaviorsToAdopt: [
      "When your body and mind say you've reached the limit, you're only 40% done. You still have 60% left in the tank. Keep pushing.",
    ],
  },
  {
    id: 2,
    title: "Zero to One",
    author: "Peter Thiel",
    color: "from-blue-500 to-indigo-600",
    quote:
      "Every moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page won't make a search engine.",
    patterns: [
      "Every business must answer seven critical questions: What is your technological edge? Is the timing right? Do you have distribution? Can you achieve monopoly? Is it durable? Do you have the right people? What is the secret others don't see?",
      "The most valuable companies create something entirely new — going from zero to one — rather than copying what exists.",
      "Definite optimism (optimist with a concrete plan) beats indefinite optimism (hoping things work out) every time.",
    ],
    beliefToDiscard:
      "Founders are some magical creatures. They are human beings just like you, often from rough backgrounds. What drives them is their curiosity and tenacity — not magic.",
    behaviorsToAdopt: [
      "Be curious — extremely curious. Keep an open mind and look for opportunities where others don't. Find innovative solutions. Push yourself.",
      "Become a definite optimist: have a clear plan for the future rather than vaguely hoping things will work out.",
    ],
  },
  {
    id: 3,
    title: "Shoe Dog",
    author: "Phil Knight",
    color: "from-emerald-500 to-green-600",
    quote:
      "The cowards never started and the weak died along the way. That leaves us.",
    patterns: [
      "The world goes on. Life goes on. Be optimistic. Work and study as hard as you can.",
      "Money will try to define your days whether you have it or not, want it or not, like it or not. Live well below your means. Don't let money run your life.",
      "Have faith in yourself and have faith in faith. Measure yourself with people who measure themselves with you.",
    ],
    beliefToDiscard:
      "That there's an immovable wall. There is a solution for everything. Just keep looking. Look harder.",
    behaviorsToAdopt: [
      "Don't tell people how to do things — tell them what to do and let them surprise you.",
      "Don't focus on what you deserve. Instead, aim for what you're willing to earn.",
    ],
  },
  {
    id: 4,
    title: "Careless People",
    author: "Sarah Wynn-Williams",
    color: "from-violet-500 to-purple-600",
    quote:
      "When you become powerful enough, the rules start to feel optional — but the consequences never go away.",
    patterns: [
      "True leaders don't look for incremental improvement. They look for leapfrog solutions — thinking about problems months or years ahead of everyone else.",
      "If you ever get as big as you dream to be, do things with empathy and for people's benefit. What seems minimal to you may mean life or death for someone else.",
      "If you stand for what you believe in, things will get hard and people may not like it — but you'll be able to look yourself in the eye. Don't have corrupt morals.",
    ],
    beliefToDiscard:
      "That money should be the primary goal. Don't treat money as god. Work hard toward your values and the money will come.",
    behaviorsToAdopt: [
      "Build a culture of people aligned with your values, but make sure you also question your own values and grow. Do not surround yourself with yes-men. Have people who will speak truth no matter how hard it is.",
    ],
  },
  {
    id: 5,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    color: "from-amber-500 to-yellow-600",
    quote:
      "Those who have a 'why' to live, can bear with almost any 'how'.",
    patterns: [
      "Your brain has far more power than you think. If you can control your mind, you can survive through the most difficult times imaginable.",
      "Work within the system to increase your odds of success while remaining empathetic and courageous.",
      "You don't know what's around the corner in life, so be open to it. People accept death when they lose their last glimmer of hope. The purpose of living is to find that meaning — and you can never know when that moment will arrive.",
    ],
    beliefToDiscard:
      "That your situation defines you. Viktor was in the toughest conditions humanly possible, yet he did not let the situation define him. That refusal to surrender his identity is what allowed him to survive while keeping his mind intact.",
    behaviorsToAdopt: [
      "To find meaning in life, you must live it. You can't make someone laugh by asking them to laugh — you need to tell a joke. Similarly, you need to truly live life to find your calling. Learn from others who have found their purpose, but carve out your own path.",
    ],
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    color: "from-slate-400 to-gray-600",
    quote:
      "When we don't process our pain, it doesn't disappear — it waits.",
    patterns: [
      "Sometimes staying silent is the best thing you can do, no matter how much the external world pushes you to speak.",
      "Unbounded and unhinged love — built up entirely in your head — can push you to do things that are deeply wrong.",
      "If you're seeking something, you need to go through great discomfort. Keep pushing and you'll get to the other side.",
      "Your past and your actions always catch up to you. You cannot run from them.",
    ],
    beliefToDiscard:
      "That you can heal from deep trauma without addressing it. Alicia never worked through her childhood trauma, and it ultimately destroyed her. You must face your wounds to move past them.",
    behaviorsToAdopt: [
      "Find a way to push forward. Even if the door in front of you closes, find other doors that give you a way in — a new perspective, a different angle.",
    ],
  },
  {
    id: 7,
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    color: "from-zinc-400 to-neutral-600",
    quote:
      "Hard things are hard because there are no easy answers or recipes. They are hard because your emotions are at odds with your logic.",
    patterns: [
      "Being a CEO is a very lonely job. You'll feel sick to your stomach often, having to make decisions alone and live with their consequences.",
      "Once you've made a decision, do not wait on execution. Execute like your company's life depends on it — because it does. Take care of your people. If you take care of them, they will take care of your company.",
      "The network you build and the mentors you cultivate can make the difference between success and failure. The right advice at the right time can save you.",
    ],
    beliefToDiscard:
      "That shying away from hard conversations makes problems disappear. They don't. Avoidance makes problems bigger. Instead, address problems head-on and execute in a way that lets the other person walk away with dignity and respect.",
    behaviorsToAdopt: [
      "Don't judge things by their surface until you've made the effort to truly understand someone or something.",
      "If you're going to eat shit, don't nibble.",
    ],
  },
  {
    id: 8,
    title: "Attached",
    author: "Amir Levine & Rachel Heller",
    color: "from-pink-500 to-rose-600",
    quote:
      "The need for closeness and connection is as fundamental as food and shelter. It is wired into our genes.",
    patterns: [
      "Attachment styles evolve — you can transition from avoidant to anxious to secure with self-awareness and deliberate work.",
      "Attachment patterns show up in your work life too. Being 'end all be all' avoidant at work means you don't collaborate effectively. Transitioning to secure means being self-reliant while having effective collaboration.",
      "Regardless of your attachment style, your feelings are valid. Instead of resorting to protest behavior, use effective communication to resolve issues.",
    ],
    beliefToDiscard:
      "That what you're feeling isn't worth communicating. If you feel it, you must effectively communicate it to your partner. Healthy discussion requires clear communication that doesn't trigger protest behavior.",
    behaviorsToAdopt: [
      "Communicate clearly and directly without apologizing for your feelings.",
      "Practice the five principles of effective communication: care about your partner's well-being, don't generalize, focus on the issue at hand, don't protest or walk away, and find common ground.",
    ],
  },
  {
    id: 9,
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    color: "from-indigo-500 to-blue-600",
    quote: "Earn with your mind, not your time.",
    readAgain: true,
    patterns: [
      "Renting out your time will never make you wealthy. Your inputs need to be disassociated from your outputs so they can scale non-linearly. Your work must be leveraged with capital, labor, code, or media.",
      "The power of compound interest supersedes everything else. Play long-term games with long-term people.",
      "Learn to build and learn to sell. If you can do both, you will be unstoppable.",
    ],
    beliefToDiscard:
      "That wealth is inherently bad. Wealth can be created ethically with strong moral values. The goal isn't money — it's freedom.",
    behaviorsToAdopt: [
      "Be yourself with passionate intensity.",
      "You do not get rich renting out your time. You must own equity — a piece of a business — to gain wealth.",
      "Embrace accountability and take business risk under your own name. Society will reward you with responsibility, equity, and leverage.",
    ],
  },
  {
    id: 10,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    color: "from-orange-500 to-amber-600",
    readAgain: true,
    quote: "We did not domesticate wheat. It domesticated us.",
    patterns: [
      "Everything traces back millions of years. Every human behavior can be distilled to primal instincts if you look deeply enough.",
      "Most technological advancement has happened in the last few centuries and this rate is accelerating exponentially. From an investment perspective, ask yourself: will this matter a decade or two decades from now?",
    ],
    beliefToDiscard:
      "That history is boring. History is drenched in blood, and we are living in the most peaceful era of Sapiens' existence. Understanding history is understanding ourselves.",
    behaviorsToAdopt: [
      "When looking at any situation, break it down to core animal instincts. Ask: 'Why does this matter to them?', 'What's their motivation?', 'What does this fulfill for them?'",
      "History holds great information. Study it deeply.",
    ],
  },
  {
    id: 11,
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    color: "from-sky-500 to-blue-600",
    quote:
      "You can't ever reach perfection, but you can believe in an asymptote toward which you are ceaselessly striving.",
    patterns: [
      "Life is unpredictable. Do not wait to live tomorrow — it may not come. Live today. Take care of the people you love and cherish.",
      "Work hard toward your purpose but don't wear blinders. Stay open to what's around you.",
      "It doesn't matter what life throws at you — be real with it, express your emotions. You don't need to hide your emotions and act tough. Use your emotions to guide the way forward.",
    ],
    beliefToDiscard:
      "That you'll live forever and important things can wait. If you care about something, act with urgency and integrity. Life is unpredictable — your body may not allow you to do tomorrow what you can do today.",
    behaviorsToAdopt: [
      "It's okay to cry. It's more than okay — it's important. Use that emotional outlet to express deep emotions.",
      "Every life ends in death, and so will yours. Accept that death is the end. What matters is living in a way that when you're on your deathbed, you're proud. When death comes, fight with grace and integrity.",
      "Relationships and friendships are extremely valuable. It's okay to have few friends, but treat those friendships with utmost importance.",
    ],
  },
  {
    id: 12,
    title: "Effortless",
    author: "Greg McKeown",
    color: "from-lime-500 to-green-600",
    quote: "What if this could be easy?",
    patterns: [
      "There are three states: effortless state, effortless actions, and effortless results. Each builds on the previous.",
      "Essentialism is achieved when you are physically rested, emotionally unburdened, and mentally energized.",
    ],
    beliefToDiscard:
      "That hard work must feel hard. The most impactful work often comes from finding the path of least resistance — not from grinding yourself down.",
    behaviorsToAdopt: [
      "When dealing with a complex task, ask yourself: 'What if this could be simple?'",
    ],
    notes: [
      "Effortless State: Physically rested, emotionally unburdened, mentally energized. Aware, present, focused on what matters most.",
      "Invert: Ask 'What if this could be easy?' and 'How am I making this harder than it needs to be?' Find indirect approaches.",
      "Enjoy: Pair the most essential work with the most enjoyable. Combine work and play. Turn tedious tasks into meaningful rituals.",
      "Release: Let go of emotional burdens. Focus on what you have. For every complaint, say something you're grateful for.",
      "Rest: Master the art of doing nothing. Do not do more today than you can completely recover from by tomorrow. Split essential work into three 90-minute sessions.",
      "Notice: Heighten your awareness. Focus on the important. See others more clearly by putting their truths above your own.",
      "Define: Establish what 'done' looks like. Visualize the desired outcome. Create a 'done for the day' list.",
      "Start: Make the first action the most obvious one. Name concrete steps. Begin with 10 minutes of focused activity.",
      "Simplify: Remove steps. Maximize steps not taken. Measure progress.",
      "Progress: Fail cheaply — make learning-sized mistakes. Adopt a zero-draft approach. Protect your progress from the harsh critic in your head.",
      "Pace: Slow is smooth, smooth is fast. Create boundaries: never less than X, never more than Y.",
      "Learn: Understand first principles deeply and apply them repeatedly. Stand on the shoulders of giants.",
      "Lift: Use teaching to leverage impact. Teach others to teach. Tell stories that are easily understood and repeated.",
      "Automate: Free up brain space. Automate essential tasks. Make checklists. Eliminate future decisions with single choices.",
      "Trust: Make the right hires once. Hire for integrity, intelligence, and initiative.",
      "Prevent: Solve problems before they happen. Measure twice, cut once.",
    ],
  },
  {
    id: 13,
    title: "Supercommunicators",
    author: "Charles Duhigg",
    color: "from-fuchsia-500 to-pink-600",
    quote:
      "The best conversations are the ones where both people feel genuinely heard.",
    patterns: [
      "Reminding yourself of your contributions and accomplishments can dampen the effects of stereotype threat. Simply knowing a stereotype exists can create mental hindrance and reduce optimal performance.",
      "You must find some way to connect on identity or shared experience if you want someone to truly listen.",
      "Before a hard conversation, ask yourself: What do I want from this? What does the other person want? What common ground exists?",
    ],
    beliefToDiscard:
      "That people's opinions are immovable. People's opinions are rooted in their environment or experiences. If they feel heard and are exposed to effective communication, they may change their stance.",
    behaviorsToAdopt: [
      "Ask deep questions to connect with people. Ask 'How do you feel about X?' type questions that go beyond the surface.",
      "Use the mirroring technique: repeat what someone said in your own words and ask if that's correct. It shows them they're truly heard.",
    ],
  },
  {
    id: 14,
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    color: "from-indigo-500 to-purple-600",
    quote: "The bedrock of character is self-discipline.",
    patterns: [
      "The amygdala is the emotional brain and the neocortex is the thinking brain. Understanding their interplay is key to self-mastery.",
      "Social chameleons adjust emotions to fit social situations even when it contradicts their internal state. Recognizing this tendency is the first step to authenticity.",
      "Alexithymia — difficulty expressing inner emotions in conversation — is common and can be worked through with practice.",
      "Build your network before you need it. As a knowledge worker, your network is a key part of how you work.",
      "The ability to delay gratification and control the urge to act is a fundamental emotional skill.",
    ],
    beliefToDiscard:
      "That emotions are irrelevant to success. Emotional intelligence is as important — if not more so — than intellectual intelligence in determining life outcomes.",
    behaviorsToAdopt: [
      "Give people the opportunity to speak more and listen keenly.",
      "Ask people deeper questions about how they're feeling and share deeper things about yourself in return.",
    ],
  },
  {
    id: 15,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    color: "from-cyan-500 to-teal-600",
    quote: "Don't Panic.",
    patterns: [
      "Life can change in the blink of an eye. What seems like the end of everything may be the start of something entirely new.",
      "Being vigilant and aware of your surroundings pays back multifold.",
      "Think for yourself and take bets even if people around you don't have the courage. Like when Arthur pushes the Improbable Drive and saves the ship from missiles.",
    ],
    beliefToDiscard:
      "That life is a constant. Life is an ever-changing organism. Remember: life is not coming at you — life is coming from you.",
    behaviorsToAdopt: [
      "Live in the moment. Treat life like a gift. When stressed, ask: 'Is this really worth stressing about, and can I do something about it?' If yes, do it. If no, let it go.",
    ],
  },
  {
    id: 16,
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    color: "from-green-500 to-emerald-600",
    quote:
      "Don't look for the needle in the haystack. Just buy the haystack.",
    patterns: [
      "Pick ETFs with the lowest management costs. History proves that actively managed funds consistently underperform the market despite promises of above-average returns.",
      "If you're attracted to a mutual fund because of its past success, it's highly likely it has run its course and will underperform going forward.",
      "Real estate fund ETFs to explore: VRIT, CREF, FREF.",
    ],
    beliefToDiscard:
      "That wealth is made in a year or two or ten. Wealth is made over many decades through patience and saving every penny you can.",
    behaviorsToAdopt: [
      "ETFs capture the entire market and give you broad coverage over time. Don't discount them — leverage them to build wealth over your lifetime.",
    ],
  },
  {
    id: 17,
    title: "Revenge of the Tipping Point",
    author: "Malcolm Gladwell",
    color: "from-rose-500 to-red-600",
    quote: "",
    patterns: [],
    beliefToDiscard: "",
    behaviorsToAdopt: [],
    isEmpty: true,
  },
  {
    id: 18,
    title: "Quiet",
    author: "Susan Cain",
    color: "from-purple-400 to-violet-600",
    quote: "",
    patterns: [],
    beliefToDiscard: "",
    behaviorsToAdopt: [],
    isEmpty: true,
  },
];

const totalPatterns = bookLearnings.reduce(
  (acc, b) => acc + b.patterns.length,
  0
);
const totalBeliefs = bookLearnings.filter((b) => b.beliefToDiscard).length;
const totalBehaviors = bookLearnings.reduce(
  (acc, b) => acc + b.behaviorsToAdopt.length,
  0
);

export default function Bookshelf() {
  const [expandedBook, setExpandedBook] = useState<number | null>(null);

  const toggleBook = (id: number) => {
    setExpandedBook(expandedBook === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-[#0a0a0b]/80 backdrop-blur-xl z-50 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-light tracking-wider">
            <span className="text-white/90">EQ</span>
            <span className="text-indigo-400">Mind</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Home
            </Link>
            <a
              href="#library"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Library
            </a>
            <Link
              href="/#quiz"
              className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-emerald-400 border border-emerald-400/30 rounded-full">
              My Reading Journey
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extralight leading-tight mb-8 tracking-tight"
          >
            Lessons from
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-light">
              {bookLearnings.length} Books
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Patterns noticed, beliefs challenged, and behaviors adopted.
            Each book distilled into its most essential takeaways.
          </motion.p>

          <motion.a
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="#library"
            className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Browse Library
          </motion.a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Books Read", value: bookLearnings.length },
            { label: "Patterns Found", value: totalPatterns },
            { label: "Beliefs Challenged", value: totalBeliefs },
            { label: "Behaviors Adopted", value: totalBehaviors },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
            >
              <div className="text-3xl font-extralight text-white/90 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Book Library */}
      <section id="library" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4 block">
              The Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Book by Book
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-light">
              Click on any book to explore its key learnings, challenged beliefs,
              and adopted behaviors.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {bookLearnings.map((book) => (
              <motion.div
                key={book.id}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`rounded-2xl border transition-all duration-500 ${
                    expandedBook === book.id
                      ? "bg-white/[0.03] border-white/10"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  } ${book.isEmpty ? "opacity-60" : ""}`}
                >
                  {/* Book Header (always visible) */}
                  <button
                    onClick={() => !book.isEmpty && toggleBook(book.id)}
                    className={`w-full p-6 md:p-8 flex items-center gap-4 md:gap-6 text-left ${
                      book.isEmpty ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`w-12 h-16 md:w-14 md:h-20 rounded-lg bg-gradient-to-br ${book.color} opacity-80 flex-shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-white/30 font-mono">
                          #{String(book.id + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-lg md:text-xl font-light text-white/90 truncate">
                          {book.title}
                        </h3>
                        {book.readAgain && (
                          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-amber-400 border border-amber-400/30 rounded-full">
                            Re-read
                          </span>
                        )}
                        {book.isEmpty && (
                          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-white/30 border border-white/10 rounded-full">
                            Coming soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/40">{book.author}</p>
                    </div>
                    {!book.isEmpty && (
                      <motion.div
                        animate={{ rotate: expandedBook === book.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/30 flex-shrink-0"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedBook === book.id && !book.isEmpty && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 space-y-6">
                          {/* Divider */}
                          <div className="h-px bg-white/5" />

                          {/* Quote */}
                          {book.quote && (
                            <div className="relative pl-8 py-4">
                              <div className="absolute top-2 left-0 text-5xl text-emerald-500/20 font-serif leading-none">
                                &ldquo;
                              </div>
                              <p className="text-lg font-light text-white/70 italic leading-relaxed">
                                {book.quote}
                              </p>
                            </div>
                          )}

                          {/* Patterns */}
                          {book.patterns.length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-4 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
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
                                Patterns Noticed
                              </h4>
                              <ul className="space-y-3">
                                {book.patterns.map((pattern, i) => (
                                  <li
                                    key={i}
                                    className="flex gap-3 text-white/70 font-light leading-relaxed"
                                  >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                    <span>{pattern}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Belief to Challenge */}
                          {book.beliefToDiscard && (
                            <div className="p-5 rounded-xl bg-rose-500/[0.06] border border-rose-500/15">
                              <h4 className="text-xs font-medium tracking-widest uppercase text-rose-400 mb-3 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                                Belief to Challenge
                              </h4>
                              <p className="text-white/70 font-light leading-relaxed">
                                {book.beliefToDiscard}
                              </p>
                            </div>
                          )}

                          {/* Behaviors to Adopt */}
                          {book.behaviorsToAdopt.length > 0 && (
                            <div className="p-5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                              <h4 className="text-xs font-medium tracking-widest uppercase text-emerald-400 mb-3 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Behaviors to Adopt
                              </h4>
                              <ul className="space-y-2">
                                {book.behaviorsToAdopt.map((behavior, i) => (
                                  <li
                                    key={i}
                                    className="flex gap-3 text-white/70 font-light leading-relaxed"
                                  >
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                    <span>{behavior}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Detailed Notes (for books like Effortless) */}
                          {book.notes && book.notes.length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium tracking-widest uppercase text-white/40 mb-4 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Detailed Notes
                              </h4>
                              <ul className="space-y-2">
                                {book.notes.map((note, i) => (
                                  <li
                                    key={i}
                                    className="flex gap-3 text-white/50 text-sm font-light leading-relaxed"
                                  >
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-white/40 font-light mb-6">
            Reading is just the beginning. Understanding yourself is the next step.
          </p>
          <Link
            href="/#quiz"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Take the EQ Assessment
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/30 text-sm font-light">
            &copy; 2025 EQMind. All rights reserved.
          </div>
          <div className="flex items-center gap-8 text-sm font-light">
            <Link
              href="/"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/eibook"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              The Book
            </Link>
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
