import {
  Github,
  Linkedin,
  Facebook,
  Mail,
  ShieldCheck,
  Heart,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      url: "https://web.facebook.com/malekashrafhussien/",
      color: "hover:text-blue-500",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/malek-ashraf",
      color: "hover:text-blue-400",
    }, //
    {
      icon: <Github size={20} />,
      url: "https://github.com/malekashraf",
      color: "hover:text-white",
    }, //
    {
      icon: <Mail size={20} />,
      url: "mailto:malekashraf1500@gmail.com",
      color: "hover:text-red-400",
    }, //
  ];

  return (
    <footer className="w-full bg-slate-950 pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* التوقيع الشخصي */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-white mb-2">
            م/ <span className="text-purple-500">مالك أشرف</span>
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            مطور واجهات مستخدم وشغوف بتعليم البرمجة[cite: 6, 9]. تم بناء هذا
            المشروع بكل حب لنشر الخير في رمضان 🌙.
          </p>
        </div>

        {/* روابط السوشيال */}
        <div className="flex gap-4 mb-12">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 ${link.color} hover:bg-white/10 hover:-translate-y-2 shadow-xl`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* سطر الحقوق والبرايفسي */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-yellow-600" />
            <span>
              جميع الحقوق محفوظة © {new Date().getFullYear()} - م/ مالك أشرف
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>صنع بـ</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>في مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
