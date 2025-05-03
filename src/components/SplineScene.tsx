
import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
}

const SplineScene = ({ sceneUrl, className = "" }: SplineSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    // Clean up function for previous Spline instance
    const cleanupSpline = () => {
      if (splineRef.current) {
        // Clean up code if needed when component unmounts
        splineRef.current = null;
      }
    };

    // Initialize Spline scene
    const loadSpline = async () => {
      if (!containerRef.current) return;
      
      try {
        console.log("Loading Spline scene:", sceneUrl);
        
        // For visual purposes before the real scene loads
        containerRef.current.innerHTML = `
          <div class="w-full h-full flex items-center justify-center bg-dark-100/50 rounded-xl overflow-hidden border border-neon/20">
            <div class="w-20 h-20 relative">
              <div class="w-full h-full rounded-full border-4 border-neon/30 border-t-neon animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center text-neon">3D</div>
            </div>
          </div>
        `;
        
        // Create a Spline App instance and load the scene
        const spline = new Application(containerRef.current);
        splineRef.current = spline;
        await spline.load(sceneUrl);
        
        // Clear the loading indicator once the scene is loaded
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          // The Spline runtime will handle adding its own canvas
        }
      } catch (error) {
        console.error("Failed to load Spline scene:", error);
        
        // Show error state if loading fails
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-dark-100/50 rounded-xl overflow-hidden border border-neon/20">
              <div class="text-red-400 text-center p-4">
                <p>Failed to load 3D scene</p>
              </div>
            </div>
          `;
        }
      }
    };
    
    loadSpline();
    
    // Cleanup on unmount
    return cleanupSpline;
  }, [sceneUrl]);

  return (
    <div ref={containerRef} className={`spline-scene w-full h-full ${className}`}></div>
  );
};

export default SplineScene;
