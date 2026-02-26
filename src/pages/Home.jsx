import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Settings, Moon, ChevronLeft } from "lucide-react";

// استيرادات Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";

// المكونات الخاصة بك
import GlobalLoader from "../components/decorations/GlobalLoader";
import Lantern from "../components/decorations/Lantern";

// بياناتك اللي بعتها بالظبط
const firebaseConfig = {
  apiKey: "AIzaSyBSL6bGDB9gftiLKdK5zrqptyTV1FRbm_A",
  authDomain: "al-rafiq-94019.firebaseapp.com",
  databaseURL: "https://al-rafiq-94019-default-rtdb.firebaseio.com",
  projectId: "al-rafiq-94019",
  storageBucket: "al-rafiq-94019.firebasestorage.app",
  messagingSenderId: "1027654198024",
  appId: "1:1027654198024:web:af32723c7e37e85760c2bd",
  measurementId: "G-15FWD6SZD4",
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    // مرجع العداد في قاعدة البيانات
    const visitorRef = ref(db, "stats/total_visitors");

    // زيادة العداد مرة واحدة لكل جلسة (Session)
    const hasCounted = sessionStorage.getItem("counted_al_rafiq");
    if (!hasCounted) {
      runTransaction(visitorRef, (currentValue) => {
        // هيبدأ من 3120 كأول رقم حقيقي للمنصة
        return (currentValue || 3120) + 1;
      }).then(() => {
        sessionStorage.setItem("counted_al_rafiq", "true");
      });
    }

    // سماع التحديثات من Firebase فور حدوثها (Real-time)
    const unsubscribe = onValue(visitorRef, (snapshot) => {
      if (snapshot.exists()) {
        setVisitorCount(snapshot.val());
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#020617] pb-32 overflow-hidden text-right selection:bg-yellow-500/30 text-white"
      dir="rtl"
    >
      <AnimatePresence>
        {loading && <GlobalLoader message="نورتم منصة الرفيق..." />}
      </AnimatePresence>

      {!loading && (
        <>
          <Lantern position="left" animate={true} />
          <Lantern position="right" animate={true} />
        </>
      )}

      {/* الهيدر وعداد الرفقاء */}
      <nav className="relative pt-8 px-6 flex justify-between items-center max-w-6xl mx-auto z-50">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-yellow-500/20 px-4 py-2 rounded-2xl"
        >
          <div className="relative">
            <Settings
              className="text-yellow-500 animate-[spin_10s_linear_infinite]"
              size={22}
            />
            <div className="absolute inset-0 bg-yellow-500/20 blur-md rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-lg leading-none">
              {visitorCount.toLocaleString()}
            </span>
            <span className="text-yellow-500/60 text-[8px] font-bold uppercase tracking-widest italic">
              رفيق الدرب
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/20">
            <Moon className="text-yellow-400 fill-yellow-400/20" size={24} />
          </div>
        </motion.div>
      </nav>

      {/* الترحيب */}
      <header className="px-6 pt-16 relative text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
            المهندس{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              مالك أشرف
            </span>{" "}
            <br />
            <span className="text-2xl md:text-5xl font-light italic opacity-90">
              يرحب بكم في مـنـصـة" الـرَّفِـيـق"
            </span>
          </h1>
          <p className="text-yellow-100/40 text-sm md:text-lg tracking-[0.2em] font-serif italic">
            🌙 صِيَاماً مَقْبُولاً وَإِفْطَاراً شَهِيّاً 🌙
          </p>
        </motion.div>
      </header>

      {/* الأقسام مع النبذة */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              t: "صمم وشارك",
              i: "🎨",
              to: "/generate",
              c: "border-yellow-500/20",
              d: "اصنع تهنئتك الرمضانية الخاصة باسمك وشاركها بلمسة فنية مميزة.",
            },
            {
              t: "المسبحة",
              i: "📿",
              to: "/tasbeeh",
              c: "border-purple-500/20",
              d: "عداد تسبيح ذكي يحفظ أرقامك ويذكرك بالأذكار أينما كنت.",
            },
            {
              t: "ركن الطفل",
              i: "🚀",
              to: "/kids",
              c: "border-blue-500/20",
              d: "رحلة ممتعة لصغارك لتعلم قيم الصيام والعبادة بأسلوب مشوق.",
            },
            {
              t: "قرآن وحديث",
              i: "📖",
              to: "/ramadan",
              c: "border-green-500/20",
              d: "نظم وردك اليومي، وتدبر في أحاديث المصطفى، وتابع ختمتك بسهولة.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.to)}
              className={`group p-6 md:p-8 bg-slate-900/50 border ${item.c} rounded-[2.5rem] text-center cursor-pointer transition-all duration-300 shadow-xl`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {item.i}
              </div>
              <h4 className="text-white font-black text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                {item.t}
              </h4>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                {item.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* الزر النهائي */}
      <section className="py-24 px-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/generate")}
          className="relative px-16 py-7 bg-yellow-500 text-[#020617] font-black text-xl rounded-3xl shadow-[0_20px_50px_rgba(250,204,21,0.2)] group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            ابدأ رحلتك مع الرفيق <ChevronLeft />
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </motion.button>
        <p className="mt-8 text-white/20 text-[10px] font-medium tracking-widest italic uppercase">
          Engineering & Design by Malek Ashraf © 2026
        </p>
      </section>
    </div>
  );
};

export default Home;
