import React, { useState, useEffect } from "react";
import { Book, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // الاستيراد المفقود الذي كان يسبب المشكلة
import QuranReader from "./Quran/QuranReader";
import useRamadanLogic from "./useRamadanLogic";

export default function DailyQuranCard() {
  const [isFinished, setIsFinished] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const { dailySurah } = useRamadanLogic();

  // 1. استعادة حالة الإتمام من ذاكرة المتصفح عند التحميل
  useEffect(() => {
    const saved = localStorage.getItem("quran_daily_done");
    if (saved === "true") setIsFinished(true);
  }, []);

  // 2. دالة التبديل وحفظ الحالة
  const handleToggleFinish = () => {
    const nextState = !isFinished;
    setIsFinished(nextState);
    localStorage.setItem("quran_daily_done", nextState.toString());
  };

  // بيانات افتراضية لو الـ logic لم يرسل بيانات بعد
  const surah = dailySurah || {
    name: "البقرة",
    verses: "286",
    part: "الجزء الأول",
    id: 2,
  };

  return (
    <>
      <div
        className={`p-6 rounded-[32px] border transition-all duration-500 relative ${
          isFinished
            ? "bg-green-500/10 border-green-500/30"
            : "bg-white/5 border-white/10"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${
                isFinished
                  ? "bg-green-500 shadow-green-500/20 text-white"
                  : "bg-yellow-500 shadow-yellow-500/20 text-black"
              }`}
            >
              <Book size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                ورد الرفيق اليومي
              </h4>
              <p className="text-xs text-white/40">{surah.part}</p>
            </div>
          </div>

          {/* زر التحديد - Radio button style */}
          <button
            onClick={handleToggleFinish}
            className={`transition-all duration-300 transform active:scale-75 ${
              isFinished
                ? "text-green-500"
                : "text-white/20 hover:text-white/40"
            }`}
          >
            {isFinished ? (
              <CheckCircle2 size={32} strokeWidth={2.5} />
            ) : (
              <Circle size={32} strokeWidth={1.5} />
            )}
          </button>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex justify-between items-center backdrop-blur-sm">
          <div>
            <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest block mb-1">
              السورة المقترحة
            </span>
            <h5 className="text-xl font-black text-white">سورة {surah.name}</h5>
            <p className="text-xs text-white/30">عدد آياتها: {surah.verses}</p>
          </div>

          <button
            onClick={() => setShowReader(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-black text-xs transition-all shadow-xl shadow-yellow-500/10 active:scale-95"
          >
            فتح المصحف
          </button>
        </div>

        {/* الأنيميشن يعمل الآن بشكل سليم لأننا أضفنا الاستيراد */}
        <AnimatePresence>
          {isFinished && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-xs text-green-400 text-center font-bold italic"
            >
              هنيئاً لك.. "القرآن ربيع القلوب" ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {showReader && (
        <QuranReader
          initialSurah={surah.id}
          onClose={() => setShowReader(false)}
        />
      )}
    </>
  );
}
