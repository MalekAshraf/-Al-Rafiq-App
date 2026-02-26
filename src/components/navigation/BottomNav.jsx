import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sparkles,
  Home,
  Moon,
  BookOpen,
  LayoutGrid,
  Rocket,
} from "lucide-react";

export default function BottomNav() {
  const navItems = [
    { to: "/kids", icon: Rocket, label: "ركن الأطفال" },
    { to: "/generate", icon: Sparkles, label: "صمم" },
    { to: "/tasbeeh", icon: Moon, label: "مسبحة" },
    { to: "/ramadan", icon: BookOpen, label: "رمضان" },
    { to: "/home", icon: Home, label: "الرئيسية" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#0f172a]/80 backdrop-blur-xl border-t border-white/5 z-[999] px-2 pb-safe">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto relative">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center transition-all duration-300 group ${
                isActive ? "flex-[1.5]" : "flex-1"
              }`
            }
          >
            {({ isActive }) => (
              <div className="relative flex flex-col items-center">
                {/* تأثير التوهج خلف الأيقونة النشطة */}
                {isActive && (
                  <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full scale-150 animate-pulse" />
                )}

                {/* الأيقونة */}
                <Icon
                  size={isActive ? 24 : 20}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                />

                {/* النص - يظهر بوضوح أكبر عند التفعيل */}
                <span
                  className={`text-[10px] mt-1.5 transition-all duration-300 font-medium ${
                    isActive
                      ? "text-yellow-100 opacity-100 scale-110"
                      : "text-white/30 opacity-70"
                  }`}
                >
                  {label}
                </span>

                {/* الخط الذهبي الصغير */}
                {isActive && (
                  <div className="absolute -bottom-3 w-8 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
