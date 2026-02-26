import React from "react";
import { motion } from "framer-motion";

export default function RamadanCalendar({ currentDay }) {
  // توليد مصفوفة بـ 30 يوم
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-[32px] backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-bold text-white/80 flex items-center gap-2">
          <span>📅</span> تقويم الشهر الكريم
        </h3>
        <span className="text-[10px] text-yellow-500 font-bold">
          رمضان 1447
        </span>
      </div>

      {/* شبكة الأيام - 6 أعمدة لتناسب الموبايل */}
      <div className="grid grid-cols-6 gap-2">
        {days.map((day) => {
          const todayNum = Number(currentDay);
          const isPassed = day < todayNum;
          const isToday = day === todayNum;

          return (
            <div
              key={day}
              animate={isToday ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`relative h-10 flex items-center justify-center rounded-xl text-[10px] font-bold transition-all
                ${
                  isToday
                    ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-110 z-10"
                    : isPassed
                      ? "bg-white/5 text-white/20 border border-white/5"
                      : "bg-white/10 text-white/60 border border-white/5 hover:bg-white/20"
                }`}
            >
              {day}

              {/* نقطة صغيرة تحت اليوم الحالي */}
              {isToday && (
                <motion.div
                  layoutId="activeDay"
                  className="absolute -bottom-1 w-1 h-1 bg-black rounded-full"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between items-center px-1">
        <p className="text-[9px] text-white/30 italic">
          * يتم تحديث اليوم تلقائياً
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
            <span className="text-[8px] opacity-40">اليوم</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white/5 rounded-full"></div>
            <span className="text-[8px] opacity-40">مضى</span>
          </div>
        </div>
      </div>
    </div>
  );
}
