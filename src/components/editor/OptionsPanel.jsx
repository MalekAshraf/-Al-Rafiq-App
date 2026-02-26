import { useState } from "react";
import { Search } from "lucide-react";

const EFFECTS = [
  { key: "lantern", label: "🏮 فانوس" },
  { key: "moon", label: "🌙 هلال" },
  { key: "stars", label: "✨ نجوم" },
  { key: "mosque", label: "🕌 مسجد" },
  { key: "cartoon", label: "🎨 تحويل كارتوني" },
];

const BACKGROUNDS = [
  { label: "خلفية 1", value: "/assets/bg1.jpg" },
  { label: "خلفية 2", value: "/assets/bg2.jpg" },
  { label: "بدون خلفية", value: null },
];

export default function OptionsPanel({ options, onChange }) {
  const [search, setSearch] = useState("");
  const filteredEffects = EFFECTS.filter((e) => e.label.includes(search));

  return (
    <div dir="rtl" className="w-full  flex flex-col items-center">
      {/* البحث */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="🔍 ابحث عن تأثير..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-purple-500 transition-all text-right"
        />
      </div>

      {/* شبكة التأثيرات */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {filteredEffects.map((effect) => (
          <button
            key={effect.key}
            onClick={() =>
              onChange({ ...options, [effect.key]: !options[effect.key] })
            }
            className={`py-3 px-2 rounded-xl text-sm font-bold transition-all ${
              options[effect.key]
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-700/50 text-white/50 hover:bg-slate-700"
            }`}
          >
            {effect.label}
          </button>
        ))}
      </div>

      {/* قسم الخلفيات - تم إصلاح الخطأ هنا */}
      <div className="w-full">
        <p className="mb-4 text-right text-sm text-slate-400 font-bold">
          🎨 اختر الخلفية
        </p>
        <div className="grid grid-cols-3 gap-3">
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.label}
              onClick={() => onChange({ ...options, background: bg.value })} // تم التغيير لـ onChange
              className={`py-3 rounded-xl text-xs font-bold transition-all ${
                options.background === bg.value
                  ? "bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                  : "bg-slate-700/50 text-white/50 hover:bg-slate-700"
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
