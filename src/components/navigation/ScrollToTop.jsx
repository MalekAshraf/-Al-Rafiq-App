import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // رفع الصفحة للأعلى عند تغيير المسار
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // المكون ده مش بيرندر حاجة، هو بينفذ وظيفة بس
};

export default ScrollToTop;
