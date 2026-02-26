import React, { useState } from "react";
import KidsLayout from "./KidsLayout";
import KidsTasbeeh from "./KidsTasbeeh";
import DailyMissions from "./DailyMissions"; // ملف النصائح والتحديات
import StoryCard from "./StoryCard";
import SimpleQuiz from "./SimpleQuiz";
import { ArrowLeft } from "lucide-react"; // للرجوع للقائمة الرئيسية

const KidsHome = () => {
  // حالة لإدارة أي قسم مفتوح حالياً
  const [activeSection, setActiveSection] = useState("main");

  const tasks = [
    {
      id: "tasbeeh",
      title: "مسبحة الأبطال",
      icon: "🎈",
      color: "bg-pink-400",
      desc: "سبح واجمع الأهلة",
    },
    {
      id: "missions",
      title: "تحدي بطل البيت",
      icon: "🏠",
      color: "bg-orange-400",
      desc: "ساعد بابا وماما واربح نجوم",
    },
    {
      id: "quiz",
      title: "اختبار الذكاء",
      icon: "🧠",
      color: "bg-yellow-400",
      desc: "جاوب واربح أوسمة",
    },
    {
      id: "stories",
      title: "حكايات جدو",
      icon: "📖",
      color: "bg-sky-400",
      desc: "قصص قصيرة ومفيدة",
    },
  ];

  // دالة لعرض المحتوى بناءً على القسم المختار
  const renderContent = () => {
    switch (activeSection) {
      case "tasbeeh":
        return <KidsTasbeeh />;
      case "missions":
        return <DailyMissions />;
      case "quiz":
        return <SimpleQuiz />;
      case "stories":
        return <StoryCard />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4 animate-in zoom-in duration-300">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-[2.5rem] p-6 shadow-xl border-4 border-white flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform cursor-pointer group"
                onClick={() => setActiveSection(task.id)}
              >
                <div
                  className={`${task.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner group-hover:rotate-12 transition-transform`}
                >
                  {task.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">
                    {task.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-tight">
                    {task.desc}
                  </p>
                </div>
                <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-2xl font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  ابدأ الآن
                </button>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <KidsLayout>
      {/* زر الرجوع يظهر فقط داخل الأقسام */}
      {activeSection !== "main" && (
        <button
          onClick={() => setActiveSection("main")}
          className="mb-8 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full font-black text-indigo-600 shadow-sm border border-indigo-100 hover:bg-indigo-50"
        >
          <ArrowLeft size={20} /> العودة للرئيسية
        </button>
      )}

      {renderContent()}
    </KidsLayout>
  );
};

export default KidsHome;
