import { useState, useEffect } from "react";
import SplineScene from "./PreloaderSpline";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and then fade out
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-dark-200 flex items-center justify-center transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-md h-96 relative flex items-center justify-center">
        <SplineScene scene="https://prod.spline.design/SJm8cLF1FOtn0BrX/scene.splinecode" />

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
          <p className="text-white text-xl mb-3">Welcome to TradeScribeAI</p>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse"></div>
            <div
              className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
