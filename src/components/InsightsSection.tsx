
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart } from "lucide-react";
import Chart from "./Chart";

const InsightsSection = () => {
  // Sample data for demonstration
  const recommendations = [
    {
      id: 1,
      symbol: "AAPL",
      company: "Apple Inc.",
      action: "Buy",
      confidence: 89,
      priceTarget: 185.50,
      trend: "up"
    },
    {
      id: 2,
      symbol: "MSFT",
      company: "Microsoft Corp.",
      action: "Hold",
      confidence: 75,
      priceTarget: 332.20,
      trend: "neutral"
    },
    {
      id: 3,
      symbol: "TSLA",
      company: "Tesla Inc.",
      action: "Sell",
      confidence: 67,
      priceTarget: 175.30,
      trend: "down"
    }
  ];

  // Sample chart data
  const chartData = [
    { name: 'Jan', Apple: 400, Microsoft: 240, Tesla: 240 },
    { name: 'Feb', Apple: 300, Microsoft: 139, Tesla: 221 },
    { name: 'Mar', Apple: 200, Microsoft: 980, Tesla: 229 },
    { name: 'Apr', Apple: 278, Microsoft: 390, Tesla: 200 },
    { name: 'May', Apple: 189, Microsoft: 480, Tesla: 218 },
    { name: 'Jun', Apple: 239, Microsoft: 380, Tesla: 250 },
    { name: 'Jul', Apple: 349, Microsoft: 430, Tesla: 210 },
  ];

  return (
    <section id="insights" className="py-20 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(128,237,153,0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="text-neon">Market Insights</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our advanced algorithms continuously analyze market data to provide you with actionable trading insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 overflow-hidden">
            <Card className="h-full bg-dark-200 border-white/10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-neon" />
                    Performance Analysis
                  </h3>
                  <Badge variant="outline" className="border-neon/30 text-neon">
                    Live Data
                  </Badge>
                </div>
                
                <div className="h-[300px]">
                  <Chart data={chartData} />
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="h-full bg-dark-200 border-white/10">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Top Recommendations</h3>
                
                <div className="space-y-4">
                  {recommendations.map((item) => (
                    <div key={item.id} className="p-4 bg-dark-100 rounded-lg border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-sm text-gray-400">{item.symbol}</span>
                          <h4 className="text-white font-medium">{item.company}</h4>
                        </div>
                        <Badge 
                          className={
                            item.action === "Buy" ? "bg-green-600" : 
                            item.action === "Sell" ? "bg-red-600" : 
                            "bg-yellow-600"
                          }
                        >
                          {item.action}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-400">Target: </span>
                          <span className="text-white font-medium">${item.priceTarget.toFixed(2)}</span>
                          {item.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                          {item.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                        </div>
                        
                        <div className="h-2 w-24 bg-dark-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-neon rounded-full"
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
