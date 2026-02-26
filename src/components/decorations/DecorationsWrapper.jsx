import React, { useEffect, useState } from "react";
import Lantern from "./Lantern";
import Stars from "./Stars";

const DecorationsWrapper = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1500); // ⏱️ بعد 1.5 ثانية من دخول Splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Lantern position="left" animate={startAnimation} />
      <Lantern position="right" animate={startAnimation} />
      <Stars animate={startAnimation} />
    </div>
  );
};

export default DecorationsWrapper;
