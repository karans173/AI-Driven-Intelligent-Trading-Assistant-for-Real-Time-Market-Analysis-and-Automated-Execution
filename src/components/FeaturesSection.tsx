
import { TrendingUp, Shield, Clock, Bot } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="h-10 w-10 text-neon" />,
    title: "Real-Time Market Data",
    description:
      "Access live market data with millisecond precision, ensuring you never miss a trading opportunity.",
  },
  {
    icon: <Bot className="h-10 w-10 text-neon" />,
    title: "Predictive AI",
    description:
      "Our advanced algorithms analyze millions of data points to forecast market movements with unprecedented accuracy.",
  },
  {
    icon: <Shield className="h-10 w-10 text-neon" />,
    title: "Risk Customization",
    description:
      "Set your risk tolerance and let our AI tailor strategies to match your comfort level and financial goals.",
  },
  {
    icon: <Clock className="h-10 w-10 text-neon" />,
    title: "Trade Automation",
    description:
      "Execute trades automatically based on AI recommendations, saving time while optimizing performance.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Features for the <span className="text-neon">Modern Trader</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform combines cutting-edge AI with intuitive design to give you
            the edge in today's fast-paced markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-dark-100 p-6 rounded-xl border border-white/5 hover:border-neon/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon/5 group"
            >
              <div className="mb-5 p-3 bg-dark-200 rounded-lg inline-block group-hover:bg-neon/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neon transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 -right-20 w-60 h-60 bg-neon/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
