import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "ramadan_tasbeeh_v3";
const getTodayDate = () => new Date().toISOString().split("T")[0];

const defaultState = {
  count: 0,
  todayTotal: 0,
  lifetimeTotal: 0,
  streak: 0,
  lastActiveDate: getTodayDate(),
  selectedIndex: 0,
  azkar: [
    { id: "1", text: "سبحان الله", isDefault: true },
    { id: "2", text: "الحمد لله", isDefault: true },
    { id: "3", text: "الله أكبر", isDefault: true },
  ],
};

export default function useTasbeehLogic() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved);
    const today = getTodayDate();

    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      let newStreak =
        parsed.lastActiveDate === yesterdayStr ? parsed.streak + 1 : 1;
      return {
        ...parsed,
        todayTotal: 0,
        count: 0,
        streak: newStreak,
        lastActiveDate: today,
      };
    }
    return parsed;
  });

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const increment = useCallback(() => {
    if ("vibrate" in navigator) navigator.vibrate(40);

    setData((prev) => {
      const newCount = prev.count + 1;
      const newToday = prev.todayTotal + 1;
      const newLifetime = prev.lifetimeTotal + 1;

      let msg = "";
      if (newCount === 33) msg = "🌟 رائع! أتممت 33 تسبيحة";
      else if (newCount === 100) msg = "💫 ما شاء الله! 100 تسبيحة استمر";
      else if (newCount === 500) msg = "👑 ذكر عظيم! قلبك نور 500 تسبيحة";
      else if (newCount === 1000) msg = "✨ حالة صفاء… 1000 تسبيحة ثبتك الله";

      if (msg) {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 3000);
      }

      return {
        ...prev,
        count: newCount,
        todayTotal: newToday,
        lifetimeTotal: newLifetime,
      };
    });
  }, []);

  const changeZikrByIndex = (index) =>
    setData((prev) => ({ ...prev, selectedIndex: index, count: 0 }));

  const addZikr = (text) => {
    if (data.azkar.length >= 6) return;
    setData((prev) => ({
      ...prev,
      azkar: [
        ...prev.azkar,
        { id: Date.now().toString(), text, isDefault: false },
      ],
      selectedIndex: prev.azkar.length,
    }));
  };

  const deleteZikr = (index) =>
    setData((prev) => ({
      ...prev,
      azkar: prev.azkar.filter((_, i) => i !== index),
      selectedIndex: 0,
      count: 0,
    }));

  return {
    ...data,
    increment,
    changeZikrByIndex,
    addZikr,
    deleteZikr,
    toastMessage,
  };
}
