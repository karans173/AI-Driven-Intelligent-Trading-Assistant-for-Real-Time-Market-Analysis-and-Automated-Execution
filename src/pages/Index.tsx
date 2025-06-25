import { useEffect } from "react";
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
  // Add a smooth scroll effect for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for the fixed header
            behavior: "smooth",
          });
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", function (e) {
          // Clean up
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-200 overflow-x-hidden">
      <PreLoader />
      <NavBar />
      <div className="pt-16">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <FeaturesSection />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <InputForm />
          </div>
        </div>
        <InsightsSection />
        <PerformanceSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
