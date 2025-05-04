import { Button } from "@/components/ui/button";
import SplineScene from "./SplineScene";
import { ArrowRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 overflow-hidden relative animated-gradient">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(128,237,153,0.15)_0%,transparent_70%)]"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-col items-start space-y-6 max-w-xl">
              <div className="px-4 py-2 rounded-full border border-neon/30 bg-dark-100/50 backdrop-blur-sm">
                <p className="text-sm font-medium text-neon">
                  <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-neon mr-2"></span>
                  AI-Powered Market Analysis
                </p>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                Trade Smarter with{" "}
                <span className="text-neon text-glow">AI Intelligence</span>
              </h1>

              <p className="text-lg text-gray-300">
                Harness the power of artificial intelligence for real-time
                market insights, predictive analytics, and automated trading
                strategies tailored to your risk profile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-neon text-dark-200 hover:bg-neon/80"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  View Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-neon font-bold text-2xl md:text-3xl">
                    <AnimatedCounter value={97} suffix="%" />
                  </p>
                  <p className="text-sm text-gray-400">Prediction Accuracy</p>
                </div>
                <div>
                  <p className="text-neon font-bold text-2xl md:text-3xl">
                    <AnimatedCounter value={24} suffix="/7" />
                  </p>
                  <p className="text-sm text-gray-400">Market Monitoring</p>
                </div>
                <div>
                  <p className="text-neon font-bold text-2xl md:text-3xl">
                    $<AnimatedCounter value={120} suffix="M+" />
                  </p>
                  <p className="text-sm text-gray-400">Managed Assets</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative h-[400px] lg:h-[500px] animate-float">
              <SplineScene scene="https://prod.spline.design/9246a5ca-7437-4bc7-9f6e-58b84d4e932f/scene.splinecode" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent lg:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
