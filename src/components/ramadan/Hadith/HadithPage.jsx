import React, { useState, useMemo } from "react";
import {
  Quote,
  Share2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Heart,
} from "lucide-react";
import { ramadanHadiths } from "./ramadanHadiths";
import useRamadanLogic from "../useRamadanLogic";

export default function HadithPage({ onClose }) {
  const { hijriDate } = useRamadanLogic();

  // 1. حساب اليوم الحالي بأمان لضمان عدم وجود NaN
  const currentDay = useMemo(() => {
    const day = parseInt(hijriDate?.day);
    return isNaN(day) ? 1 : day;
  }, [hijriDate?.day]);

  const [selectedDay, setSelectedDay] = useState(currentDay);

  // 2. اختيار الحديث بأمان مع التأكد من وجود المصفوفة
  const activeHadith = useMemo(() => {
    if (!ramadanHadiths || ramadanHadiths.length === 0) return null;
    // استخدام الـ modulo لضمان عدم الخروج عن نطاق المصفوفة (Index Out of Bounds)
    const index = (selectedDay - 1) % ramadanHadiths.length;
    return ramadanHadiths[index >= 0 ? index : 0];
  }, [selectedDay]);

  const handleShare = async () => {
    if (!activeHadith) return;
    const shareText = `حديث اليوم ${selectedDay} رمضان: "${activeHadith.text}" - تطبيق الرفيق 🌙`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "حديث نبوي",
          text: shareText,
          url: window.location.href,
        });
      } else {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
      }
    } catch (err) {
      console.log("المشاركة تم إلغاؤها أو غير مدعومة");
    }
  };

  // 3. حالة احتياطية في حال عدم تحميل البيانات
  if (!activeHadith) {
    return (
      <div className="fixed inset-0 z-[110] bg-[#020617] flex items-center justify-center">
        <div className="text-amber-500 animate-pulse font-bold">
          جاري تحميل الحديث...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] text-white overflow-y-auto font-sans pb-40">
      {/* 1. Header ثابت */}
      <div className="sticky top-5 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-2xl transition-all flex flex-col items-center"
        >
          <ArrowRight size={24} />
          <span className="text-[8px] opacity-40 tracking-widest uppercase mt-1">
            خروج
          </span>
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-amber-500 font-serif">
            أحاديث رمضانية
          </h2>
          <p className="text-[10px] opacity-40 uppercase tracking-widest text-white">
            من كنوز السنة النبوية
          </p>
        </div>

        <button
          onClick={handleShare}
          className="p-2 hover:bg-amber-500/10 rounded-2xl text-amber-500 transition-all"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* 2. محتوى الصفحة الرئيسي */}
      <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
        {/* بطاقة الحديث */}
        <div className="relative w-full mt-8 p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 overflow-hidden shadow-2xl">
          <Quote className="absolute -top-6 -right-6 w-32 h-32 text-amber-500/5 rotate-12" />

          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-inner">
              <Quote size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-amber-500/60 text-[10px] font-bold tracking-[0.3em] uppercase">
                حديث اليوم {selectedDay}
              </span>
              <div className="h-0.5 w-12 bg-amber-500/20 mx-auto rounded-full" />
            </div>

            {/* استخدام علامة الاستفهام للحماية القصوى */}
            <p
              className="text-xl md:text-2xl font-serif leading-[2] text-white/90 drop-shadow-sm"
              dir="rtl"
            >
              "{activeHadith?.text}"
            </p>

            <div className="mt-4">
              <span className="text-sm text-amber-500/80 font-medium italic">
                {activeHadith?.ref}
              </span>
            </div>
          </div>
        </div>

        {/* 3. أزرار التنقل */}
        <div className="flex items-center gap-8 mt-12 mb-12">
          <button
            disabled={selectedDay <= 1}
            onClick={() => setSelectedDay((prev) => prev - 1)}
            className="p-5 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all disabled:opacity-5 shadow-lg"
          >
            <ChevronRight size={28} />
          </button>

          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-3xl font-black text-white leading-none">
              {selectedDay}
            </span>
            <span className="text-[10px] opacity-30 uppercase tracking-tighter">
              رمضان
            </span>
          </div>

          <button
            disabled={selectedDay >= 30}
            onClick={() => setSelectedDay((prev) => prev + 1)}
            className="p-5 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all disabled:opacity-5 shadow-lg"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
      </div>

      {/* 4. زر الخروج الثابت */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] w-full flex justify-center px-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-amber-500 text-black px-10 py-4 rounded-2xl font-bold shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          <Heart size={18} fill="currentColor" />
          تقبل الله منا ومنكم
        </button>
      </div>
    </div>
  );
}
