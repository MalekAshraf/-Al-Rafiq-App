import React, { useRef, useEffect, useState } from "react";
import useTasbeehLogic from "./useTasbeehLogic";
import ZikrSlider from "./ZikrSlider";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function TasbeehPage() {
  const containerRef = useRef(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });
  const {
    azkar,
    selectedIndex,
    count,
    todayTotal,
    lifetimeTotal,
    streak,
    increment,
    changeZikrByIndex,
    addZikr,
    deleteZikr,
    toastMessage,
  } = useTasbeehLogic();

  useEffect(() => {
    if (containerRef.current) {
      setDim({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const bgColors = [
    "from-slate-900",
    "from-indigo-950",
    "from-purple-900",
    "from-teal-900",
  ];

  return (
    <div
      ref={containerRef}
      /* التعديل هنا: pb-32 لضمان مسافة أمان فوق الـ Nav و overflow-y-auto للتمرير */
      className={`min-h-screen w-full bg-gradient-to-b ${bgColors[selectedIndex % 4]} to-black text-white overflow-y-auto relative font-sans pb-32`}
    >
      {/* Confetti */}
      {count === 100 && (
        <Confetti
          width={dim.width}
          height={dim.height}
          numberOfPieces={100}
          recycle={false}
          gravity={0.3}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* زينة الخلفية */}
      <div className="absolute top-10 left-10 opacity-20 text-3xl select-none">
        🌙
      </div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-10 opacity-30 text-4xl select-none"
      >
        🏮
      </motion.div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col p-5">
        {/* 1. هيدر الصفحة */}
        <header className="text-center pt-6">
          <h1 className="text-xl font-bold text-purple-400 mb-2">
            المسبحة الإلكترونية
          </h1>
          <p className="text-[11px] opacity-60 italic leading-tight">
            "وَاذْكُر رَّبَّكَ إِذَا نَسِيتَ"
          </p>
          <div className="mt-4 inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] backdrop-blur-sm">
            🔥 تتابع: {streak} يوم
          </div>
        </header>

        {/* 2. منطقة العداد والذكر (تتوسط المساحة المتبقية) */}
        <main className="flex-1 flex flex-col justify-center items-center gap-8 py-4">
          <ZikrSlider
            azkar={azkar}
            selectedIndex={selectedIndex}
            changeZikrByIndex={changeZikrByIndex}
            addZikr={addZikr}
            deleteZikr={deleteZikr}
          />

          <div className="relative flex justify-center items-center">
            {count >= 1000 && (
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="absolute -top-10 text-3xl"
              >
                👑
              </motion.div>
            )}

            {/* الدائرة التقدمية */}
            <svg className="w-64 h-64 transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="691"
                animate={{
                  strokeDashoffset: 691 - (Math.min(count, 33) / 33) * 691,
                }}
                strokeLinecap="round"
                className="text-purple-500 transition-all duration-300"
              />
            </svg>

            {/* الرقم في المنتصف */}
            <div className="absolute flex flex-col items-center">
              <motion.span
                key={count}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-black tracking-tighter drop-shadow-2xl"
              >
                {count}
              </motion.span>
              <span className="text-[10px] tracking-[0.3em] opacity-30 uppercase font-bold">
                تسبحية
              </span>
            </div>
          </div>

          {/* زر التسبيح الكبير */}
          <button
            onClick={increment}
            className="relative w-32 h-32 active:scale-95 transition-all duration-100 group"
          >
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-full h-full bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center border-4 border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <span className="text-4xl transition-transform group-hover:rotate-12">
                📿
              </span>
            </div>
          </button>
        </main>

        {/* 3. الإحصائيات (تظهر دائماً في الأسفل بوضوح) */}
        <footer className="grid grid-cols-2 gap-4 mt-auto mb-6">
          <div className="bg-white/5 border border-white/10 p-4 rounded-[24px] text-center backdrop-blur-xl shadow-xl">
            <p className="text-[10px] text-purple-300 font-bold uppercase mb-1 tracking-wider">
              اليوم
            </p>
            <p className="text-2xl font-black leading-none">{todayTotal}</p>
            <p className="text-[8px] opacity-20 mt-1.5 font-medium">
              (يُصفر تلقائياً كل 24 ساعة)
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-[24px] text-center backdrop-blur-xl shadow-xl">
            <p className="text-[10px] text-purple-300 font-bold uppercase mb-1 tracking-wider">
              الإجمالي
            </p>
            <p className="text-2xl font-black leading-none">{lifetimeTotal}</p>
            <p className="text-[8px] opacity-20 mt-1.5 font-medium">
              (رصيد تراكمي)
            </p>
          </div>
        </footer>

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ y: 100, x: "-50%", opacity: 0 }}
              animate={{ y: -120, x: "-50%", opacity: 1 }}
              exit={{ y: 50, x: "-50%", opacity: 0 }}
              className="fixed bottom-0 left-1/2 bg-purple-600 text-white px-8 py-3 rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.5)] font-bold text-sm z-[200] whitespace-nowrap"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
