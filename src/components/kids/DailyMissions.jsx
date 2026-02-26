import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Heart, Trophy } from "lucide-react";

const DailyMissions = () => {
  const [completed, setCompleted] = useState([]);

  const deeds = [
    {
      id: 1,
      title: "مساعد البطل",
      desc: "ساعدت ماما وبابا في تجهيز الفطور؟",
      icon: "🍽️",
    },
    {
      id: 2,
      title: "صديق الفقراء",
      desc: "وضعت صدقة في حصالة الخير أو أطعمت مسكيناً؟",
      icon: "💰",
    },
    {
      id: 3,
      title: "ناشر السعادة",
      desc: "قلت (رمضان كريم) لجدو أو تيتة أو صديقك؟",
      icon: "📞",
    },
    {
      id: 4,
      title: "ذهبت للمسجد",
      desc: "صليت فى المسجد كل الصلوات و حافظت على الهدوء؟",
      icon: "🕌",
    },
    {
      id: 5,
      title: "بطل النظافة",
      desc: "رتبت سريرك وغرفتك وسجادة صلاتك؟",
      icon: "🧹",
    },
    {
      id: 6,
      title: "نور الصائمين",
      desc: "وزعت التمر أو الماء وقت الإفطار؟",
      icon: "🌴",
    },
    {
      id: 7,
      title: "المبتسم الجميل",
      desc: "قابلت أهلك بابتسامة وقلت كلمة طيبة؟",
      icon: "😊",
    },
    {
      id: 8,
      title: "قارئ الأذكار",
      desc: "قرأت أذكار الصباح أو المساء اليوم؟",
      icon: "📿",
    },
    {
      id: 9,
      title: "صديق البيئة",
      desc: "سقيت نباتاً أو حافظت على نظافة الشارع؟",
      icon: "🌱",
    },
    {
      id: 10,
      title: "طالب العلم",
      desc: "تعلمت معلومة دينية أو حديثاً شريفاً جديداً؟",
      icon: "📚",
    },
  ];

  const toggleTask = (id) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  const progress = (completed.length / deeds.length) * 100;

  return (
    <div className="w-full max-w-2xl px-4 py-6 space-y-6 mx-auto">
      {/* رأس الصفحة وعداد الإنجاز */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-indigo-900 flex items-center justify-center gap-2">
          تحدي بطل البيت <Heart className="text-pink-500 fill-pink-500" />
        </h2>

        {/* شريط التقدم */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50">
          <div className="flex justify-between mb-2 px-2">
            <span className="text-indigo-900 font-black text-sm">
              مستوى البطولة
            </span>
            <span className="text-indigo-600 font-black text-sm">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-pink-400 to-indigo-500"
            />
          </div>
          <p className="text-slate-500 font-bold text-xs mt-3">
            {completed.length === deeds.length
              ? "واااو! أنت بطل خارق اليوم! 🏆"
              : `باقي لك ${deeds.length - completed.length} مهام لتصبح بطل اليوم`}
          </p>
        </div>
      </div>

      {/* قائمة المهام */}
      <div className="space-y-4">
        {deeds.map((deed) => (
          <motion.div
            key={deed.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            className={`p-5 rounded-[2rem] border-4 transition-all flex items-center gap-4 ${
              completed.includes(deed.id)
                ? "bg-green-50 border-green-200"
                : "bg-white border-white shadow-xl shadow-indigo-100/50"
            }`}
          >
            <div className="text-5xl bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center">
              {deed.icon}
            </div>

            <div className="flex-1 text-right">
              <h4
                className={`font-black text-xl ${completed.includes(deed.id) ? "text-green-700" : "text-slate-800"}`}
              >
                {deed.title}
              </h4>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                {deed.desc}
              </p>
            </div>

            <button
              onClick={() => toggleTask(deed.id)}
              disabled={completed.includes(deed.id)}
              className={`p-3 rounded-2xl font-black transition-all ${
                completed.includes(deed.id)
                  ? "text-green-500"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              }`}
            >
              {completed.includes(deed.id) ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 size={40} />
                </motion.div>
              ) : (
                <span className="px-2">تم!</span>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* رسالة النجاح النهائية */}
      <AnimatePresence>
        {completed.length === deeds.length && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-400 p-6 rounded-[2.5rem] text-center shadow-2xl border-4 border-white"
          >
            <Trophy className="mx-auto text-white w-16 h-16 mb-2" />
            <h3 className="text-2xl font-black text-indigo-900">
              وسام البطل الخارق!
            </h3>
            <p className="text-indigo-800 font-bold">
              لقد أتممت جميع مهام الخير لليوم
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyMissions;
