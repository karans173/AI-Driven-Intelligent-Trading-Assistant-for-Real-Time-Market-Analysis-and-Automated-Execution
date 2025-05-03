
import { Card } from "@/components/ui/card";

const metrics = [
  {
    label: "Win Rate",
    value: "86%",
    change: "+12%",
    positive: true
  },
  {
    label: "ROI",
    value: "32.4%",
    change: "+8.7%",
    positive: true
  },
  {
    label: "Risk Ratio",
    value: "1:3",
    change: "-0.5",
    positive: true
  },
  {
    label: "Daily Trades",
    value: "16",
    change: "+3",
    positive: true
  }
];

const PerformanceSection = () => {
  return (
    <section id="performance" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trading <span className="text-neon">Performance</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI-driven strategies consistently outperform traditional trading methods
            by leveraging advanced algorithms and real-time data analysis.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className="bg-dark-100 border-white/10 p-6 transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-neon/10"
            >
              <div className="flex flex-col items-center text-center">
                <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</p>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  metric.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-dark-100 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon/50 via-neon to-neon/50"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Algorithmic Precision
              </h3>
              <p className="text-gray-400 mb-6">
                Our proprietary AI algorithms analyze over 3.2 million data points per second,
                identifying patterns and correlations that human traders would miss. This allows
                for precise entry and exit points that maximize profit while minimizing risk.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Prediction Accuracy</span>
                    <span className="text-sm text-neon">94%</span>
                  </div>
                  <div className="h-2 w-full bg-dark-200 rounded-full">
                    <div className="h-full bg-neon rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Execution Speed</span>
                    <span className="text-sm text-neon">99%</span>
                  </div>
                  <div className="h-2 w-full bg-dark-200 rounded-full">
                    <div className="h-full bg-neon rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Risk Management</span>
                    <span className="text-sm text-neon">87%</span>
                  </div>
                  <div className="h-2 w-full bg-dark-200 rounded-full">
                    <div className="h-full bg-neon rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[300px]">
              <SplineScene sceneUrl="https://prod.spline.design/8cfb6748-f3dd-44dd-89fb-f46c7ab4186e/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import SplineScene from "./SplineScene";
export default PerformanceSection;
