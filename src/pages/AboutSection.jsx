import React, { useState, useEffect } from "react";
import {
  User,
  Star,
  Send,
  Briefcase,
  CheckCircle,
  Code2,
  PenTool,
  Layout,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import heroImage from "../assets/heroImage.png";

const AboutSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userName, setUserName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSending, setIsSending] = useState(false);

  // مهاراتك من الـ CV
  const skills = [
    { name: "React.js", icon: <Code2 size={14} />, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: <Layout size={14} />, color: "text-sky-400" },
    { name: "Figma", icon: <PenTool size={14} />, color: "text-rose-400" },
    { name: "WordPress", icon: <Layout size={14} />, color: "text-blue-500" },
    { name: "JavaScript", icon: <Code2 size={14} />, color: "text-yellow-400" },
  ];

  // الخبرات العملية (رجعت كاملة)
  const experiences = [
    {
      company: "iSchool",
      role: "Coding Instructor",
      desc: "تدريب +300 طالب على البرمجة",
      color: "from-purple-500 to-indigo-500",
    },
    {
      company: "CodeStan",
      role: "WP Developer",
      desc: "بناء مواقع احترافية و SEO",
      color: "from-blue-500 to-cyan-500",
    },
    {
      company: "DEP",
      role: "React Developer",
      desc: "تطوير واجهات مستخدم معقدة",
      color: "from-amber-500 to-orange-500",
    },
  ];

  // تفعيل الـ Key بتاعك
  useEffect(() => {
    emailjs.init("cuOpwDBp_AzbwbzMU");
  }, []);

  const handleSubmitFeedback = (e) => {
    if (e) e.preventDefault();
    if (!userName || !feedback || rating === 0) {
      alert("يا هندسة كمل بياناتك والتقييم عشان الرسالة توصل! 😊");
      return;
    }

    setIsSending(true);

    const serviceId = "service_76mho8l"; // التحديث الجديد
    const templateId = "template_64sjkv8";

    const templateParams = {
      from_name: userName,
      message: feedback,
      rating: rating,
    };

    emailjs
      .send(serviceId, templateId, templateParams, "cuOpwDBp_AzbwbzMU")
      .then(() => {
        alert(`تسلم يا ${userName}! رسالتك وصلت لمالك بنجاح. ✨`);
        setUserName("");
        setFeedback("");
        setRating(0);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("تأكد من تفعيل الـ Service والـ Template في موقع EmailJS.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section
      id="about"
      className="relative py-12 md:py-24 px-4 md:px-6 max-w-6xl mx-auto z-10"
      dir="rtl"
    >
      {/* الجزء العلوي: الصورة والتعريف (Responsive) */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-20">
        <div className="relative group">
          <div className="absolute -inset-4 bg-purple-500/10 rounded-full blur-3xl opacity-50"></div>
          <div className="relative w-44 h-44 md:w-64 md:h-64 rounded-[2.5rem] md:rounded-[3.5rem] border-2 border-white/10 overflow-hidden shadow-2xl bg-slate-900">
            <img
              src={heroImage}
              className="w-full h-full object-cover object-top scale-105 transition-transform duration-500 group-hover:scale-110"
              alt="المهندس مالك أشرف"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 md:p-3 rounded-xl border-4 border-slate-950 shadow-xl text-white">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="text-center md:text-right flex-1 space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-[10px] md:text-sm font-bold">
            <User size={16} /> نبذة عن المطور
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
            المهندس{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              مالك أشرف
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
            مطور <span className="text-white font-bold">Front-End</span> ومدرب
            برمجة. خبرة في بناء تطبيقات الويب باستخدام{" "}
            <span className="text-white font-bold">React.js</span> وتصميم واجهات
            الـ <span className="text-white font-bold">Figma</span>.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-[10px] md:text-xs"
              >
                <span className={skill.color}>{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* كروت الخبرة (رجعت كاملة) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-20">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center mb-6 shadow-lg text-white`}
            >
              <Briefcase size={24} />
            </div>
            <h4 className="text-white font-black text-xl mb-2">{exp.role}</h4>
            <div className="text-purple-400 font-bold text-sm mb-3">
              {exp.company}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
          </div>
        ))}
      </div>

      {/* صندوق التقييم والتواصل */}
      <div className="bg-slate-950/80 p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 text-center shadow-3xl backdrop-blur-xl">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
          رأيك يهمنا ✨
        </h3>
        <p className="text-slate-500 text-sm md:text-lg mb-10">
          ساعدنا نطور مـنـصـة "الـرفـيـق" ليكون الأفضل دايماً
        </p>

        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              className="transform transition-transform active:scale-90"
            >
              <Star
                size={window.innerWidth < 768 ? 32 : 48}
                fill={rating >= s ? "#A855F7" : "transparent"}
                className={
                  rating >= s
                    ? "text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "text-slate-800"
                }
              />
            </button>
          ))}
        </div>

        <form
          className="space-y-4 max-w-xl mx-auto"
          onSubmit={handleSubmitFeedback}
        >
          <input
            type="text"
            placeholder="اسمك الكريم"
            className="w-full bg-white/5 border border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-white outline-none focus:border-purple-500 text-center transition-all"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea
            placeholder="رسالتك أو اقتراحك للمشروع..."
            className="w-full bg-white/5 border border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-white outline-none focus:border-purple-500 resize-none text-center transition-all"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSending ? (
              "جاري الإرسال..."
            ) : (
              <>
                <Send size={20} /> إرسال للمهندس مالك
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AboutSection;
