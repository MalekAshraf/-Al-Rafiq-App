import React, { Suspense } from "react"; // أضفنا Suspense هنا
import AppRoutes from "./routes/AppRoutes";
import { AvatarProvider } from "./context/AvatarContext";
import {
  LoadingProvider,
  useLoading,
} from "./components/decorations/LoadingContext";
import GlobalLoader from "./components/decorations/GlobalLoader";

const AppContent = () => {
  const { isLoading, message } = useLoading();

  return (
    <AvatarProvider>
      {/* 1. اللودر هنا نخليه يظهر "فوق" المحتوى مش يمنع ظهوره */}
      {isLoading && (
        <div className="fixed inset-0 z-[999]">
          <GlobalLoader message={message} />
        </div>
      )}

      {/* 2. الـ Routes تظهر دائماً ولا تتأثر بالـ isLoading */}
      <AppRoutes />
    </AvatarProvider>
  );
};

function App() {
  return (
    <LoadingProvider>
      {/* الـ Suspense الآن سيعمل بشكل صحيح عند تحميل المكونات */}
      <Suspense
        fallback={<GlobalLoader message="نجهز لك الأجواء الرمضانية..." />}
      >
        <AppContent />
      </Suspense>
    </LoadingProvider>
  );
}

export default App;
