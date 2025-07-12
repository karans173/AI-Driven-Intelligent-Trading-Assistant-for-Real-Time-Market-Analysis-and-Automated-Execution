"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import InputForm from "@/components/InputForm";
import InsightsSection from "@/components/InsightsSection";
import PerformanceSection from "@/components/PerformanceSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PreLoader from "@/components/PreLoader";

const Index = () => {
  const [ticker, setTicker] = useState<string>("");

  // Smooth scroll for anchor links
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")?.substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-200 overflow-x-hidden">
      <PreLoader />
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <FeaturesSection />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            {/* ✅ Passing setTicker to InputForm to update it */}
            <InputForm onTickerSubmit={setTicker} />
          </div>
        </div>

        {/* ✅ Only render InsightsSection when a ticker is provided */}
        {ticker && <InsightsSection ticker={ticker} />}

        <PerformanceSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
