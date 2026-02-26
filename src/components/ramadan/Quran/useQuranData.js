import { useState, useEffect } from "react";

export default function useQuranData(surahNumber) {
  const [data, setData] = useState({
    ayahs: [],
    surahInfo: null,
    allSurahs: [], // سنخزن هنا الـ 114 سورة للبحث
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. جلب قائمة كل السور (لو مش موجودة) للبحث
        let surahsList = data.allSurahs;
        if (surahsList.length === 0) {
          const listRes = await fetch("https://api.alquran.cloud/v1/surah");
          const listJson = await listRes.json();
          surahsList = listJson.data;
        }

        // 2. جلب آيات السورة المحددة بالرسم العثماني
        // ملحوظة: quran-uthmani تعطي النص العثماني الأصلي وهو الأفضل للقراءة
        const surahRes = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`,
        );
        const surahJson = await surahRes.json();

        setData({
          ayahs: surahJson.data.ayahs,
          surahInfo: surahJson.data,
          allSurahs: surahsList,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching Quran data:", error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
    // نضع loading true عند تغيير السورة ليبدأ الأنيميشن
    setData((prev) => ({ ...prev, loading: true }));
  }, [surahNumber]);

  return data;
}
