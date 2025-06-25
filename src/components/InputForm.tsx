"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { MultiStepLoader } from "./multi-step-loader";
import InsightsSummary from "./InsightsSummary";

const loadingStates = [
  { text: "Fetching Data", duration: 15000 },
  { text: "Running LSTM forecast", duration: 30000 },
  { text: "Running historical ML analysis", duration: 30000 },
  { text: "Analyzing Sentiment from news summary", duration: 40000 },
];

const InputForm = () => {
  const { toast } = useToast();
  const [company, setCompany] = useState("");
  const [symbol, setSymbol] = useState("");
  const [riskLevel, setRiskLevel] = useState(50);
  const [timeline, setTimeline] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultData(null); // Reset previous results

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/stocks", {
        stock: company,
        symbol: symbol,
        agent: "all",
        riskLevel,
        timeline,
      });

      console.log("✅ API Response:", response.data);
      setResultData(response.data);

      toast({
        title: "Analysis Generated",
        description: `AI insights for ${company} are ready.`,
      });
    } catch (error) {
      console.error("❌ Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI insights.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* Form Card */}
          <div className="w-full md:w-2/3">
            <Card className="bg-dark-100 border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Get AI Trading Insights
                </CardTitle>
                <CardDescription>
                  Enter your trading preferences and our AI will generate
                  personalized recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm text-gray-300">
                      Company
                    </Label>
                    <div className="relative">
                      <Input
                        id="company"
                        className="bg-dark-200 border-white/10 focus:border-neon pl-10"
                        placeholder="Enter company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symbol" className="text-sm text-gray-300">
                      Symbol
                    </Label>
                    <Input
                      id="symbol"
                      className="bg-dark-200 border-white/10 focus:border-neon"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="risk" className="text-sm text-gray-300">
                        Risk Tolerance
                      </Label>
                      <span className="text-sm bg-neon/20 text-neon px-2 py-0.5 rounded">
                        {riskLevel}%
                      </span>
                    </div>
                    <Slider
                      id="risk"
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="py-4"
                      onValueChange={(value) => setRiskLevel(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-sm text-gray-300">
                      Investment Timeline
                    </Label>
                    <Select defaultValue={timeline} onValueChange={setTimeline}>
                      <SelectTrigger className="bg-dark-200 border-white/10 focus:border-neon">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-100 border-white/10">
                        <SelectItem value="short">
                          Short-term (Days/Weeks)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium-term (Months)
                        </SelectItem>
                        <SelectItem value="long">Long-term (Years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-neon text-dark-300 hover:bg-neon/80"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-dark-300 border-r-transparent animate-spin mr-2"></div>
                      Analyzing
                    </>
                  ) : (
                    "Generate AI Insights"
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Insights Summary after loading */}
            {!loading && resultData && (
              <div className="mt-6">
                <InsightsSummary data={resultData} />
              </div>
            )}
          </div>

          {/* Loader Card */}
          <div className="w-full md:w-1/3">
            {loading && (
              <Card className="bg-dark-100 border border-white/10 h-full flex items-center justify-center p-4">
                <MultiStepLoader loadingStates={loadingStates} loading={true} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
