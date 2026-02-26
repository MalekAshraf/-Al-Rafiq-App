import React from "react";
import { Moon, Sun, Sunrise, Sunset, CloudMoon } from "lucide-react";

export default function PrayerTimesCard({ prayerTimes }) {
  // لاحظ هنا قمنا بتغيير prayerTimes.fajr إلى prayerTimes?.Fajr (أول حرف كبير)
  const timings = [
    {
      label: "الفجر",
      time: prayerTimes?.Fajr,
      icon: CloudMoon,
      color: "text-blue-400",
    },
    {
      label: "الشروق",
      time: prayerTimes?.Sunrise,
      icon: Sunrise,
      color: "text-orange-300",
    },
    {
      label: "الظهر",
      time: prayerTimes?.Dhuhr,
      icon: Sun,
      color: "text-yellow-400",
    },
    {
      label: "العصر",
      time: prayerTimes?.Asr,
      icon: Sun,
      color: "text-amber-500",
    },
    {
      label: "المغرب",
      time: prayerTimes?.Maghrib,
      icon: Sunset,
      color: "text-orange-500",
      highlight: true,
    },
    {
      label: "العشاء",
      time: prayerTimes?.Isha,
      icon: Moon,
      color: "text-indigo-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {timings.map((prayer) => (
        <div
          key={prayer.label}
          className={`relative p-3 rounded-3xl border backdrop-blur-md flex flex-col items-center justify-center gap-1 transition-all
            ${
              prayer.highlight
                ? "bg-orange-500/20 border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                : "bg-white/5 border-white/10"
            }`}
        >
          {prayer.highlight && (
            <span className="absolute -top-2 bg-orange-500 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">
              إفطار
            </span>
          )}
          <prayer.icon size={18} className={prayer.color} />
          <span className="text-[10px] opacity-50 font-medium">
            {prayer.label}
          </span>
          <span className="text-sm font-bold tracking-tight">
            {/* عرض الوقت أو كلمة "..." إذا كان لسه بيحمل */}
            {prayer.time || "--:--"}
          </span>
        </div>
      ))}
    </div>
  );
}
