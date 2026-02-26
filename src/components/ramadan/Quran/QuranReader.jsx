import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Share2,
  ArrowRight,
  BookOpen,
  Search,
  X,
  ArrowUp,
} from "lucide-react";
import useQuranData from "./useQuranData";

export default function QuranReader({ initialSurah = 2, onClose }) {
  const [currentSurah, setCurrentSurah] = useState(initialSurah);
  const { ayahs, surahInfo, allSurahs, loading } = useQuranData(currentSurah);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // فلترة السور من القائمة المحملة في "المخ"
  const filteredSurahs = allSurahs.filter(
    (s) => s.name.includes(searchQuery) || s.number.toString() === searchQuery,
  );

  const handleShare = () => {
    const shareText = `أقرأ الآن سورة ${surahInfo?.name} 🌙.. شاركني الأجر!`;
    if (navigator.share) {
      navigator.share({
        title: "المصحف",
        text: shareText,
        url: window.location.href,
      });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSurah]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] text-white overflow-y-auto pb-20 font-sans select-none">
      {/* Header */}
      <div className="sticky top-5 z-[120] bg-[#020617]/95 backdrop-blur-md border-b border-white/5 p-4">
        {!isSearching ? (
          <div className="flex justify-between items-center">
            {/* زر البحث على اليمين */}
            <button
              onClick={() => setIsSearching(true)}
              className="p-2 text-white/50 hover:text-yellow-500 transition-all"
            >
              <Search size={22} />
            </button>

            <div className="text-center">
              <h2 className="text-lg font-bold text-yellow-500 font-serif leading-none">
                {loading ? "جاري التحميل..." : `سورة ${surahInfo?.name}`}
              </h2>
              <p className="text-[9px] opacity-30 tracking-widest uppercase mt-1">
                القرآن الرقمى
              </p>
            </div>

            <div className="flex gap-1">
              <button onClick={handleShare} className="p-2 text-yellow-500/80">
                <Share2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-4 hover:bg-white/5 rounded-full"
              >
                <ArrowUp size={24} />
                <span className="text-[9px] opacity-30 tracking-widest uppercase mt-1">
                  الخروج من المصحف
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 animate-in slide-in-from-right-2 duration-300">
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                placeholder="ابحث باسم السورة..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pr-12 pl-4 text-right outline-none focus:border-yellow-500/40 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20"
                size={18}
              />
            </div>
            <button
              onClick={() => {
                setIsSearching(false);
                setSearchQuery("");
              }}
              className="p-2 text-white/30 hover:text-white"
            >
              <X />
            </button>
          </div>
        )}
      </div>

      {/* قائمة نتائج البحث */}
      {isSearching && searchQuery && (
        <div className="fixed inset-x-0 top-[76px] bottom-0 z-[110] bg-[#020617]/95 backdrop-blur-md overflow-y-auto p-4 space-y-2">
          {filteredSurahs.map((s) => (
            <div
              key={s.number}
              onClick={() => {
                setCurrentSurah(s.number);
                setIsSearching(false);
                setSearchQuery("");
              }}
              className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-yellow-500/10 hover:border-yellow-500/20 transition-all flex justify-between items-center cursor-pointer"
            >
              <span className="text-yellow-500/50 font-mono text-xs">
                #{s.number}
              </span>
              <span className="font-serif text-xl">{s.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* محتوى القرآن */}
      <div className="max-w-3xl mx-auto p-6 text-right" dir="rtl">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[70vh] opacity-20">
            <BookOpen
              size={80}
              className="animate-pulse mb-4 text-yellow-500"
            />
            <p className="font-serif text-2xl">يتنزل القرآن...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            {/* البسملة الذهبية - تختفي في التوبة (9) */}
            {currentSurah !== 9 && (
              <div className="text-center text-4xl md:text-6xl font-serif py-16 text-yellow-500 select-none opacity-90 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}

            <div className="text-4xl md:text-6xl font-serif leading-[2.5] md:leading-[2.8] text-white/90">
              {ayahs.map((ayah, index) => {
                let text = ayah.text;
                // حذف البسملة من أول آية في كل السور (بما فيها التوبة للاحتياط)
                if (index === 0) {
                  // حذف البسملة العثمانية المشهورة
                  text = text.replace(
                    "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                    "",
                  );
                  // حذف أي مسافات زائدة بقيت مكانها
                  text = text.trim();
                }

                return (
                  <span
                    key={ayah.number}
                    className="inline group hover:text-yellow-200 transition-colors"
                  >
                    {text}
                    <span className="inline-flex items-center justify-center w-12 h-12 mx-4 text-base border border-yellow-500/20 rounded-full text-yellow-500/40 font-sans font-bold align-middle">
                      {ayah.numberInSurah}
                    </span>
                  </span>
                );
              })}
            </div>

            {/* أزرار التنقل السريع */}
            <div className="mt-20 flex justify-between items-center opacity-50 border-t border-white/5 pt-10">
              <button
                disabled={currentSurah === 114}
                onClick={() => setCurrentSurah((c) => c + 1)}
                className="flex items-center gap-2 hover:text-yellow-500 disabled:opacity-0"
              >
                <ChevronLeft /> السورة التالية
              </button>
              <button
                disabled={currentSurah === 1}
                onClick={() => setCurrentSurah((c) => c - 1)}
                className="flex items-center gap-2 hover:text-yellow-500 disabled:opacity-0"
              >
                السورة السابقة <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
