import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";

// المكونات الخاصة بالزينة واللودر
import DecorationsWrapper from "../components/decorations/DecorationsWrapper";
import { useLoading } from "../components/decorations/LoadingContext";
import GlobalLoader from "../components/decorations/GlobalLoader";
import Lantern from "../components/decorations/Lantern";

const Splash = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  const [initialLoading, setInitialLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lanternSoundRef = useRef(null);

  // ⏱️ 1. فحص المستخدم والتحميل المبدئي
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const hasVisited = localStorage.getItem("hasVisitedBefore");

    if (savedName) setUserName(savedName);

    // إذا كان مستخدم قديم، لودر سريع جداً ودخول تلقائي
    if (savedName && hasVisited) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
        navigate("/home", { replace: true });
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // مستخدم جديد: نظهر شاشة الترحيب
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  // 🔄 تحميل حالة الصوت
  useEffect(() => {
    const savedSound = localStorage.getItem("soundEnabled") === "true";
    setSoundEnabled(savedSound);
  }, []);

  // 🚀 الدالة المصلحة للانتقال اللحظي
  const completeSplash = (name) => {
    const finalName = name.trim() || "رفيقنا الغالي";

    // حفظ البيانات فوراً في المتصفح
    localStorage.setItem("userName", finalName);
    localStorage.setItem("hasVisitedBefore", "true");

    // الانتقال الفوري لصفحة الهوم بدون انتظار
    navigate("/home", { replace: true });

    // تشغيل لودر خفيف يختفي في صفحة الهوم كنوع من الترحيب
    if (startLoading) {
      startLoading(`أهلاً بك يا ${finalName}.. 🌙`);
      setTimeout(() => stopLoading && stopLoading(), 1000);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleInteraction();
    completeSplash(userName);
  };

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (soundEnabled && lanternSoundRef.current) {
        lanternSoundRef.current.volume = 0.15;
        lanternSoundRef.current.play().catch(() => {});
      }
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#020617] text-white font-sans flex flex-col items-center justify-center">
      <AnimatePresence>
        {initialLoading && <GlobalLoader message="نورتم منصة الرفيق..." />}
      </AnimatePresence>

      {!initialLoading && (
        <>
          <Lantern position="left" animate={true} />
          <Lantern position="right" animate={true} />
          <audio ref={lanternSoundRef} src="/sounds/lantern.mp3" loop />

          <button
            onClick={(e) => {
              e.stopPropagation();
              const newState = !soundEnabled;
              setSoundEnabled(newState);
              localStorage.setItem("soundEnabled", newState);
              if (lanternSoundRef.current) {
                newState
                  ? lanternSoundRef.current.play()
                  : lanternSoundRef.current.pause();
              }
            }}
            className="absolute top-6 right-6 z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full w-10 h-10 flex items-center justify-center transition-all active:scale-90"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>

          <DecorationsWrapper />

          <motion.div
            className="w-full flex flex-col justify-center items-center text-center px-6 relative z-10 py-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onClick={handleInteraction}
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-black mb-4 text-yellow-500 italic"
            >
              <Typewriter
                words={["✨ مـنـصـة الـرَّفِـيـق"]}
                cursor={false}
                typeSpeed={90}
              />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-10 text-base text-gray-400 font-medium"
            >
              <Typewriter
                words={["🌙 رمضان كريم، نورت تطبيقك"]}
                cursor={false}
                typeSpeed={45}
              />
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-[280px] mb-8"
            >
              <label className="block mb-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                نحب نناديك بإيه؟
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="اكتب اسمك هنا..."
                className="w-full text-center bg-white/5 border border-white/10 px-4 py-4 rounded-2xl focus:border-yellow-500/50 transition-all text-white font-bold outline-none"
              />
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="mb-10 space-y-4 text-xs font-bold text-gray-400"
            >
              <li className="flex items-center justify-center gap-3">
                <span>🎨</span> صمم صورتك بالذكاء الاصطناعي
              </li>
              <li className="flex items-center justify-center gap-3">
                <span>📿</span> سبّح بطريقة تفاعلية
              </li>
            </motion.ul>

            <motion.button
              variants={itemVariants}
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl bg-yellow-500 text-black font-black shadow-xl shadow-yellow-500/20 w-full max-w-[260px] cursor-pointer"
            >
              ابدأ الرحلة الرمضانية
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Splash;
