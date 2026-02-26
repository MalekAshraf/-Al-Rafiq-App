import React from "react";
import { motion } from "framer-motion";
import { Clock, Info } from "lucide-react";

export default function CountdownTimer({ timeLeft, message, type, progress }) {
  // تعريف نصوص توضيحية لكل حالة
  const statusDetails = {
    FASTING: {
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      description: "نعد تنازلياً حتى موعد أذان المغرب للإفطار",
      subText: "موعد الإفطار هو وقت أذان المغرب",
    },
    IFTAR: {
      color: "text-green-500",
      bg: "bg-green-500/10",
      description: "وقت الإفطار والراحة، يبدأ السحور عند منتصف الليل",
      subText: "استمتع بوقتك وتقبل الله صيامك",
    },
    SUHOOR: {
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      description: "وقت السحور المبارك، ينتهي عند مدفع الإمساك",
      subText: "باقي على الإمساك (قبل الفجر بـ 10 دقائق)",
    },
    IMSAK: {
      color: "text-red-500",
      bg: "bg-red-500/10",
      description: "وقت الإمساك، يرجى التوقف عن الطعام والشراب",
      subText: "ينتهي العداد عند أذان الفجر لبدء الصيام",
    },
  };

  const current = statusDetails[type] || statusDetails.FASTING;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
      {/* 1. العنوان الرئيسي مع الحالة */}
      <div
        className={`mb-2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${current.bg} ${current.color} border border-current/20`}
      >
        {message}
      </div>

      {/* 2. العداد الدائري */}
      <div className="relative flex items-center justify-center my-4">
        <svg className="w-52 h-52 transform -rotate-90">
          <circle
            cx="104"
            cy="104"
            r="95"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="104"
            cy="104"
            r="95"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="597"
            animate={{ strokeDashoffset: 597 - (progress / 100) * 597 }}
            strokeLinecap="round"
            className={`${current.color} transition-all duration-1000`}
          />
        </svg>

        <div className="absolute flex gap-2 items-baseline text-white">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black leading-none">
              {timeLeft.h}
            </span>
            <span className="text-[8px] opacity-40 mt-1 uppercase">ساعة</span>
          </div>
          <span className="text-xl opacity-20">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black leading-none">
              {timeLeft.m}
            </span>
            <span className="text-[8px] opacity-40 mt-1 uppercase">دقيقة</span>
          </div>
          <span className="text-xl opacity-20">:</span>
          <div className="flex flex-col items-center">
            <span
              className={`text-4xl font-black leading-none ${current.color}`}
            >
              {timeLeft.s}
            </span>
            <span className="text-[8px] opacity-40 mt-1 uppercase">ثانية</span>
          </div>
        </div>
      </div>

      {/* 3. صندوق التوضيح (شرح العداد بيعد لإيه) */}
      <div className="mt-4 w-full bg-white/5 rounded-2xl p-4 border border-white/5">
        <div className="flex items-start gap-3 text-right" dir="rtl">
          <div className={`mt-0.5 ${current.color}`}>
            <Info size={16} />
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] text-white/90 font-medium leading-relaxed">
              {current.description}
            </p>
            <p className="text-[9px] text-white/40 mt-1">{current.subText}</p>
          </div>
        </div>
      </div>

      {/* لمسة جمالية للحالات الحرجة (الإمساك) */}
      {type === "IMSAK" && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-4 left-4 text-red-500 opacity-50"
        >
          <Clock size={20} />
        </motion.div>
      )}
    </div>
  );
}
