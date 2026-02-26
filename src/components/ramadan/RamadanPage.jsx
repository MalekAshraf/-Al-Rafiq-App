import React, { useState } from "react";
import useRamadanLogic from "./useRamadanLogic";
import CountdownTimer from "./CountdownTimer";
import PrayerTimesCard from "./PrayerTimesCard";
import RamadanCalendar from "./RamadanCalendar";
import DailyQuranCard from "./DailyQuranCard";
import HadithPage from "./Hadith/HadithPage";
import { motion } from "framer-motion";
import { MapPin, Calendar as CalendarIcon, Quote } from "lucide-react";

export default function RamadanPage() {
  const {
    timeLeft,
    type,
    message,
    hijriDate,
    prayerTimes,
    location,
    loading,
    progress,
  } = useRamadanLogic();

  const [showHadithPage, setShowHadithPage] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  // --- منطق ضبط اليوم للتقويم ---
  // نتحقق إذا كان الشهر هو رمضان فعلاً

  const isRamadan = hijriDate?.month?.ar === "رمضان";
  const todayNumber = isRamadan ? parseInt(hijriDate?.day || 0) : 0;
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden relative pb-32">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,1)_0%,rgba(2,6,23,1)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto p-5 flex flex-col gap-6">
        {/* 1. الـ Hero Section */}
        {/* 1. الـ Hero Section المصلح */}
        <header className="flex justify-between items-center mt-4 px-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-yellow-500 mb-1 text-right">
              <CalendarIcon size={16} />
              <span className="text-sm font-bold tracking-wide">
                {/* إذا كان الـ API يسبقنا بيوم (يعرض 1 رمضان واليوم لسه شعبان) نقوم بالتعديل يدوياً */}
                {hijriDate?.day === "1" && hijriDate?.month.ar === "رمضان"
                  ? "30 شعبان 1447هـ"
                  : `${hijriDate?.day} ${hijriDate?.month.ar} ${hijriDate?.year}هـ`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/40 justify-end">
              <MapPin size={12} />
              <span className="text-[10px]">{location}</span>
            </div>
          </div>

          {/* أيقونة الهلال الجمالية كما في الصورة */}
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
              🌙
            </span>
          </div>
        </header>
        {/* 2. العداد الذكي */}
        <section>
          <CountdownTimer
            timeLeft={timeLeft}
            message={message}
            type={type}
            progress={progress}
          />
        </section>

        {/* 3. مواقيت الصلاة */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-white/80">
              مواقيت الصلاة اليوم
            </h3>
            <span className="text-[10px] text-white/30 tracking-widest uppercase">
              القاهرة
            </span>
          </div>
          <PrayerTimesCard prayerTimes={prayerTimes} />
        </section>

        {/* 4. الورد اليومي */}
        <section className="space-y-4">
          <DailyQuranCard />

          <div
            onClick={() => setShowHadithPage(true)}
            className="cursor-pointer p-5 rounded-[32px] border border-white/10 bg-gradient-to-br from-amber-500/5 to-orange-600/5 hover:from-amber-500/10 hover:to-orange-600/10 transition-all duration-300 group relative overflow-hidden"
          >
            <Quote className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:text-amber-500/10 transition-colors rotate-12" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Quote size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">حديث اليوم</h4>
                  <p className="text-[10px] text-white/40">
                    تأمل في كنوز السنة النبوية
                  </p>
                </div>
              </div>
              <button className="text-[10px] bg-white/5 px-4 py-2 rounded-xl border border-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all font-bold">
                قراءة الحديث
              </button>
            </div>
          </div>
        </section>

        {/* 5. تقويم رمضان - يمرر اليوم 0 إذا كنا في شعبان */}
        <section>
          <RamadanCalendar currentDay={hijriDate.day} />
        </section>

        <footer className="text-center py-6">
          <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-light">
            رمضان كريم • صوماً مقبولاً
          </p>
        </footer>
      </div>

      {showHadithPage && (
        <HadithPage onClose={() => setShowHadithPage(false)} />
      )}
    </div>
  );
}
