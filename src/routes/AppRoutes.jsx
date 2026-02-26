import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Splash from "../pages/Splash";
import Home from "../pages/Home";
import AllGenerate from "../components/editor/AllGenerate";
import TasbeehPage from "../components/tasbeeh/TasbeehPage";
import RamadanPage from "../components/ramadan/RamadanPage";
import KidsHome from "../components/kids/KidsHome";
import ScrollToTop from "../components/navigation/ScrollToTop";
import BottomNav from "../components/navigation/BottomNav"; // تأكد من الاستيراد
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  const location = useLocation();
  const hasVisited = localStorage.getItem("hasVisitedBefore") === "true";

  return (
    <>
      {/* 1. السكرول يكون بره الـ Routes عشان يشتغل مع أي تغيير مسار */}
      <ScrollToTop />

      <Routes>
        {/* صفحة الـ Splash */}
        <Route
          path="/"
          element={!hasVisited ? <Splash /> : <Navigate to="/home" replace />}
        />

        {/* حماية المسارات الداخلية باستخدام الـ Layout */}
        <Route
          element={hasVisited ? <MainLayout /> : <Navigate to="/" replace />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/generate" element={<AllGenerate />} />
          <Route path="/tasbeeh" element={<TasbeehPage />} />
          <Route path="/ramadan" element={<RamadanPage />} />
          <Route path="/kids" element={<KidsHome />} />
        </Route>

        {/* أي مسار آخر */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 2. الـ BottomNav يكون بره الـ Routes وتحتهم عشان يظهر في كل الصفحات */}
      {/* وممكن تظهره بس لو المستخدم زار الموقع قبل كدة */}
      {hasVisited && location.pathname !== "/" && <BottomNav />}
    </>
  );
};

export default AppRoutes;
