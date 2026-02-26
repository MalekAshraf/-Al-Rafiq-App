import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/navigation/BottomNav";
import Header from "../components/navigation/Header"; // الهيدر الطاير
import Footer from "../components/navigation/Footer"; // فوتر المهندس مالك
import AboutSection from "../../src/pages/AboutSection"; // قسم عن المطور

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* 1. الهيدر يظهر هنا لكل الصفحات الداخلية */}
      <Header />

      {/* 2. محتوى الصفحة المتغير */}
      <div className="flex-grow pt-24 pb-20">
        {/* pt-24 عشان المحتوى ميتداراش تحت الهيدر الطاير */}
        <Outlet />
      </div>

      {/* 3. قسم About اللي فيه خبراتك (iSchool, CodeStan...) */}
      <div id="about">
        <AboutSection />
      </div>

      {/* 4. الفوتر النهائي بتوقيعك */}
      <Footer />

      {/* 5. التنقل السفلي للموبايل */}
      <BottomNav />
    </div>
  );
}
