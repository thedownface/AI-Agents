"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./components/FloatingHearts";
import StoryCard from "./components/StoryCard";

// Dynamically import the 3D scene to avoid SSR issues
const HeartScene = dynamic(() => import("./components/HeartScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-6xl heartbeat">🤍</span>
    </div>
  ),
});

// ── Story steps ──────────────────────────────────────────────────────────────
const STEPS = [
  "intro",
  "beauty",
  "tajmahal",
  "apology",
  "importance",
  "shayari",
  "song",
] as const;

type Step = (typeof STEPS)[number];

// ── Progress dot colours ─────────────────────────────────────────────────────
const stepLabels: Record<Step, string> = {
  intro: "Hello",
  beauty: "You",
  tajmahal: "Gift",
  apology: "Sorry",
  importance: "Us",
  shayari: "Shayari",
  song: "Song",
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [started, setStarted] = useState(false);

  const currentIndex = STEPS.indexOf(step);

  const next = () => {
    if (currentIndex < STEPS.length - 1) setStep(STEPS[currentIndex + 1]);
  };
  const prev = () => {
    if (currentIndex > 0) setStep(STEPS[currentIndex - 1]);
  };

  // Keyboard navigation — use a ref so the handler always reads the latest step
  const stepRef = useRef(step);
  useEffect(() => { stepRef.current = step; }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = STEPS.indexOf(stepRef.current);
      if ((e.key === "ArrowRight" || e.key === "ArrowDown") && idx < STEPS.length - 1)
        setStep(STEPS[idx + 1]);
      if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && idx > 0)
        setStep(STEPS[idx - 1]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Landing / splash screen ────────────────────────────────────────────────
  if (!started) {
    return (
      <main className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
        <FloatingHearts />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        >
          {/* 3-D Heart */}
          <div className="w-56 h-56 sm:w-72 sm:h-72">
            <HeartScene />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-script text-7xl sm:text-9xl shimmer-text leading-none"
          >
            Tahura
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-body text-red-400 text-lg sm:text-xl tracking-widest uppercase"
          >
            A little something, just for you 💌
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 30px rgba(220,38,38,0.35)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setStarted(true)}
            className="font-body mt-4 px-10 py-4 bg-red-600 text-white rounded-full text-lg font-semibold tracking-wide shadow-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Open the letter 💖
          </motion.button>
        </motion.div>
      </main>
    );
  }

  // ── Story experience ──────────────────────────────────────────────────────
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <FloatingHearts />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-300 via-red-500 to-red-700 z-50"
        animate={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />

      {/* Step dots */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            title={stepLabels[s]}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              s === step
                ? "bg-red-600 scale-125"
                : i < currentIndex
                ? "bg-red-300"
                : "bg-red-100 border border-red-200"
            }`}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <AnimatePresence mode="wait">
          {/* ── INTRO ── */}
          {step === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">A heartfelt message</p>
              <h2 className="font-script text-6xl sm:text-8xl text-red-600 leading-tight">
                Hey, Tahura 🌸
              </h2>
              <p className="font-body text-gray-600 text-lg sm:text-xl leading-relaxed">
                Before you scroll away — I know you are probably still upset, and that is completely fair.
                But please give this a few minutes.
                It was made with nothing but care for you.
              </p>
              <div className="flex justify-center">
                <span className="text-5xl heartbeat">💌</span>
              </div>
            </motion.section>
          )}

          {/* ── BEAUTY ── */}
          {step === "beauty" && (
            <motion.section
              key="beauty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">You are extraordinary</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 leading-tight">
                The most beautiful soul
              </h2>
              <p className="font-body text-gray-700 text-lg sm:text-xl leading-relaxed">
                Tahura, you have this rare, effortless way of making everything around you feel warmer.
                The way you think, the way you talk, the little things you notice — honestly,
                they leave me completely speechless.
              </p>
              <p className="font-body text-gray-700 text-lg sm:text-xl leading-relaxed">
                You are not just beautiful on the outside — your heart, your mind, the way you carry yourself — 
                every single bit of you is something truly special. I genuinely believe the universe
                spent extra time on you.
              </p>
              <div className="flex justify-center gap-3 text-3xl">
                <span>🌹</span><span>✨</span><span>🌹</span>
              </div>
            </motion.section>
          )}

          {/* ── TAJ MAHAL ── */}
          {step === "tajmahal" && (
            <motion.section
              key="tajmahal"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm text-center">A small gesture</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 text-center leading-tight">
                A Taj Mahal in code 🏛️
              </h2>
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6 sm:p-8 text-center shadow-sm">
                <p className="font-body text-gray-700 text-xl sm:text-2xl leading-relaxed italic">
                  &ldquo;I can&rsquo;t build a Taj Mahal for you right now —
                  though you deserve more than that, honestly, so much more —
                  but here is something I made for you, 
                  from scratch, with every line of code carrying a little bit of my heart.&rdquo;
                </p>
              </div>
              <p className="font-body text-gray-500 text-center text-base sm:text-lg">
                Consider this page your Taj Mahal — imperfect, digital, but built entirely for you. 🤍
              </p>
            </motion.section>
          )}

          {/* ── APOLOGY ── */}
          {step === "apology" && (
            <motion.section
              key="apology"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">From the bottom of my heart</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 leading-tight">
                I am truly sorry 🙏
              </h2>
              <p className="font-body text-gray-700 text-lg sm:text-xl leading-relaxed">
                What I said — it came out completely wrong. I did not mean a single word of it the way it sounded.
                You took it personally and I completely understand why, and I am genuinely sorry for hurting you.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="bg-white border-2 border-red-100 rounded-2xl p-5 shadow-sm">
                  <p className="font-body text-red-500 font-bold mb-2 text-lg">You are NOT irritating.</p>
                  <p className="font-body text-gray-600 text-base leading-relaxed">
                    Not even close. Talking to you is honestly one of the best parts of my day.
                    Your presence is never, ever a burden.
                  </p>
                </div>
                <div className="bg-white border-2 border-red-100 rounded-2xl p-5 shadow-sm">
                  <p className="font-body text-red-500 font-bold mb-2 text-lg">You are NOT delusional.</p>
                  <p className="font-body text-gray-600 text-base leading-relaxed">
                    You see things clearly and you feel deeply — that is not delusion, 
                    that is a gift. Please never let anyone make you feel otherwise.
                  </p>
                </div>
              </div>

              <p className="font-body text-gray-700 text-lg leading-relaxed">
                I am sorry, Tahura. Truly. You deserve nothing but kindness and I dropped the ball on that. 
                It will not happen again.
              </p>
              <span className="text-5xl">🌸</span>
            </motion.section>
          )}

          {/* ── IMPORTANCE ── */}
          {step === "importance" && (
            <motion.section
              key="importance"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">What you mean to me</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 leading-tight">
                You mean everything 💕
              </h2>
              <p className="font-body text-gray-700 text-lg sm:text-xl leading-relaxed">
                I am not going to dress this up in metaphors — let me just say it plainly:
                you matter to me more than I have the right words for.
              </p>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                <p className="font-body text-red-700 text-xl sm:text-2xl leading-relaxed italic">
                  &ldquo;You came into my world quietly and somehow rearranged everything.
                  I find myself smiling at things you said hours later.
                  I find myself wanting to tell you about my day before anyone else.
                  That is not nothing — that is everything.&rdquo;
                </p>
              </div>
              <p className="font-body text-gray-700 text-lg leading-relaxed">
                I like you. Romantically, genuinely, unashamedly. And I wanted you to know that, clearly, 
                with no ambiguity — just in case those indirect words left any doubt.
              </p>
              <div className="flex justify-center gap-2 text-3xl">
                <span>❤️</span><span>🫰</span><span>❤️</span>
              </div>
            </motion.section>
          )}

          {/* ── SHAYARI ── */}
          {step === "shayari" && (
            <motion.section
              key="shayari"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">Original shayari — only for you</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 leading-tight">
                ✍️ For Tahura
              </h2>

              <div className="bg-white border-2 border-red-100 rounded-3xl p-6 sm:p-10 shadow-md space-y-4">
                <p className="font-script text-3xl sm:text-4xl text-red-700 leading-relaxed">
                  Tujhe dekha toh jaana Sanam,<br />
                  Ke rang kya hota hai zindagi ka.
                </p>
                <p className="font-script text-3xl sm:text-4xl text-red-700 leading-relaxed">
                  Teri aankhon mein kho jaata hoon,<br />
                  Jaise chaand kho jaata hai subah mein.
                </p>
                <p className="font-script text-3xl sm:text-4xl text-red-700 leading-relaxed">
                  Galti agar meri thi, toh maan leta hoon,<br />
                  Kyunki tujhe kho dena mujhe manzoor nahi.
                </p>
                <p className="font-script text-3xl sm:text-4xl text-red-700 leading-relaxed">
                  Tahura — tera naam bhi,<br />
                  Ek ghazal ki tarah lagta hai.
                </p>
              </div>

              <p className="font-body text-gray-400 text-sm italic">
                — Written only for you 🌹
              </p>
            </motion.section>
          )}

          {/* ── SONG ── */}
          {step === "song" && (
            <motion.section
              key="song"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl w-full text-center space-y-6"
            >
              <p className="font-body text-red-300 uppercase tracking-widest text-sm">A song that says it all</p>
              <h2 className="font-script text-5xl sm:text-7xl text-red-600 leading-tight">
                This one&rsquo;s for you 🎵
              </h2>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                Every time I hear this song, I think of you. 
                Put on your headphones, close your eyes, and just listen. 💕
              </p>

              {/* YouTube embed — "Tujhe Kitna Chahne Lage" */}
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Kg8_ADYhYWE?si=XbaEz86c45NCCP_y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>

              <a
                href="https://youtu.be/Umqb9KENgmk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-block mt-2 text-red-500 hover:text-red-700 underline underline-offset-4 text-base transition-colors"
              >
                Open in YouTube ↗
              </a>

              {/* Sign-off */}
              <div className="pt-4 border-t border-red-100 space-y-3">
                <p className="font-script text-4xl sm:text-5xl text-red-500">
                  Always yours 🌹
                </p>
                <p className="font-body text-gray-400 text-sm">
                  Made with love, late nights, and way too much coffee.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-50 px-4">
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="font-body px-6 py-3 bg-white border-2 border-red-200 text-red-500 rounded-full text-sm font-semibold shadow hover:border-red-400 transition-colors cursor-pointer"
            >
              ← Back
            </motion.button>
          )}
          {currentIndex < STEPS.length - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(220,38,38,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="font-body px-8 py-3 bg-red-600 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Continue →
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
