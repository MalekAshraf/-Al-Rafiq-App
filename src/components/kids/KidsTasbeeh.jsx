import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Moon,
  Star,
  Cloud,
  Lamp,
  Trophy,
  ChevronLeft,
} from "lucide-react";
import BadgeModal from "./BadgeModal";

const KidsTasbeeh = () => {
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 5;
  const targetCount = 31; // الرقم المستهدف
  const [showBadge, setShowBadge] = useState(false);

  const roundThemes = [
    { icon: Moon, color: "text-yellow-400", label: "جولة الأهلة" },
    { icon: Star, color: "text-amber-400", label: "جولة النجوم" },
    { icon: Cloud, color: "text-sky-300", label: "جولة السحاب" },
    { icon: Lamp, color: "text-orange-400", label: "جولة الفوانيس" },
    { icon: Trophy, color: "text-yellow-500", label: "جولة الأبطال" },
  ];

  // لضمان عدم حدوث Error لو الـ round زادت، بنستخدم modulo
  const currentTheme = roundThemes[(round - 1) % maxRounds];

  // دالة التسبيح
  const handlePress = () => {
    if (count < targetCount) {
      setCount((prev) => prev + 1);
    }
  };

  // دالة الانتقال للجولة التالية
  const handleNextRound = () => {
    if (count >= targetCount) {
      setShowBadge(true); // نظهر المودال لأنه أنجز المهمة

      // منطق الانتقال: لو وصل لآخر جولة نرجع لـ 1، غير كدا نزود 1
      if (round >= maxRounds) {
        setRound(1);
      } else {
        setRound((prev) => prev + 1);
      }
      setCount(0); // تصفير العداد للجولة الجديدة
    }
  };

  return (
    <div className="text-center space-y-8 max-w-md mx-auto px-4">
      {/* عرض رقم الجولة */}
      <motion.div
        key={round}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <span className="bg-indigo-600 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-lg shadow-indigo-200">
          المرحلة {round} من {maxRounds}
        </span>
        <h2 className="text-indigo-900 font-black text-3xl mt-3">
          {currentTheme.label}
        </h2>
      </motion.div>

      {/* الأيقونات الـ 5 (تنور بناءً على القسمة على 6 عشان نوزعهم على الـ 31) */}
      <div className="flex justify-center gap-3 py-2">
        {[...Array(5)].map((_, i) => {
          const IconComponent = currentTheme.icon;
          const step = Math.floor(targetCount / 5); // كل 6 تسبيحات تقريباً ينور شكل
          const isActive =
            count >= (i + 1) * step || (i === 4 && count === targetCount);

          return (
            <motion.div
              key={i}
              animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
              className={`text-4xl ${isActive ? `${currentTheme.color} drop-shadow-md` : "text-slate-300 opacity-40"}`}
            >
              <IconComponent
                size={38}
                fill={isActive ? "currentColor" : "none"}
              />
            </motion.div>
          );
        })}
      </div>

      {/* الزرار الرئيسي (البالونة) */}
      <div className="relative flex justify-center">
        <motion.button
          whileTap={count < targetCount ? { scale: 0.85 } : {}}
          onClick={handlePress}
          className={`w-56 h-56 rounded-full shadow-2xl border-[12px] border-white flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-all
            ${count === targetCount ? "bg-green-50 border-green-200" : "bg-gradient-to-br from-white to-indigo-50"}`}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-indigo-500/10"
            animate={{ height: `${(count / targetCount) * 100}%` }}
          />

          <span className="text-indigo-900 font-black text-2xl z-10">
            {count === targetCount ? "أحسنت!" : "سبحان الله"}
          </span>
          <span
            className={`text-6xl font-black z-10 ${count === targetCount ? "text-green-600" : "text-indigo-600"}`}
          >
            {count}
          </span>
        </motion.button>
      </div>

      {/* زر الجولة التالية: لا يظهر بوضوح إلا عند الانتهاء */}
      <div className="flex flex-col items-center gap-4">
        <motion.button
          animate={
            count === targetCount
              ? { scale: [1, 1.05, 1], transition: { repeat: Infinity } }
              : {}
          }
          onClick={handleNextRound}
          disabled={count < targetCount}
          className={`flex items-center gap-2 px-10 py-4 rounded-3xl font-black text-xl transition-all shadow-xl
            ${
              count >= targetCount
                ? "bg-indigo-600 text-white shadow-indigo-300"
                : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
            }`}
        >
          {round >= maxRounds ? (
            <RotateCcw size={22} />
          ) : (
            <ChevronLeft size={22} />
          )}
          {round >= maxRounds ? "بدء من جديد" : "الجولة التالية"}
        </motion.button>

        <p
          className={`font-bold transition-colors ${count === targetCount ? "text-green-600" : "text-slate-400"}`}
        >
          {count === targetCount
            ? "جاهز للانتقال للجولة الجاية! ✨"
            : `باقي لك ${targetCount - count} تسبيحات`}
        </p>
      </div>

      <BadgeModal
        isOpen={showBadge}
        onClose={() => setShowBadge(false)}
        badgeName={currentTheme.label}
        roundNumber={round === 1 && count === 0 ? 5 : round - 1} // تصحيح الرقم في المودال بعد التصفير
      />
    </div>
  );
};

export default KidsTasbeeh;
