import { useState, useEffect } from "react";

export default function useRamadanLogic() {
  const [data, setData] = useState({
    prayerTimes: null,
    hijriDate: { day: "--", month: { ar: "رمضان" }, year: "1447" },
    loading: true,
  });

  const [status, setStatus] = useState({
    type: "WAITING",
    message: "جاري حساب الوقت...",
    timeLeft: { h: "00", m: "00", s: "00" },
    progress: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5`,
        );
        const json = await response.json();

        if (isMounted && json.data) {
          let hijri = json.data.date.hijri;

          // العملية الحسابية لتصحيح التاريخ لمصر
          let currentDay = parseInt(hijri.day);
          const adjustedDay = (currentDay - 1).toString().padStart(2, "0");

          setData({
            prayerTimes: json.data.timings,
            hijriDate: {
              ...hijri,
              day: adjustedDay,
            },
            loading: false,
          });
        }
      } catch (e) {
        console.error("Fetch error", e);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!data.prayerTimes) return;

    const timer = setInterval(() => {
      const now = new Date();
      const timings = data.prayerTimes;

      const getTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":");
        const d = new Date();
        d.setHours(parseInt(hours), parseInt(minutes), 0);
        return d;
      };

      const times = {
        fajr: getTime(timings.Fajr),
        maghrib: getTime(timings.Maghrib),
        imsak: new Date(getTime(timings.Fajr).getTime() - 10 * 60000),
      };

      let targetTime, type, message;

      if (now < times.fajr) {
        targetTime = now < times.imsak ? times.imsak : times.fajr;
        type = now < times.imsak ? "SUHOOR" : "IMSAK";
        message = type === "SUHOOR" ? "باقي على الإمساك" : "حان وقت الإمساك";
      } else if (now < times.maghrib) {
        targetTime = times.maghrib;
        type = "FASTING";
        message = "باقي على الإفطار";
      } else {
        targetTime = new Date(times.fajr.getTime() + 24 * 60 * 60 * 1000);
        type = "IFTAR";
        message = "تقبل الله صيامكم";
      }

      const diff = targetTime - now;
      if (diff > 0) {
        const h = Math.floor(diff / 3600000)
          .toString()
          .padStart(2, "0");
        const m = Math.floor((diff % 3600000) / 60000)
          .toString()
          .padStart(2, "0");
        const s = Math.floor((diff % 60000) / 1000)
          .toString()
          .padStart(2, "0");

        const totalFastingMs = 15 * 60 * 60 * 1000;
        const currentProgress = (diff / totalFastingMs) * 100;

        setStatus({
          type,
          message,
          timeLeft: { h, m, s },
          progress: Math.max(0, Math.min(100, 100 - currentProgress)),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.prayerTimes]);

  return { ...data, ...status };
}
