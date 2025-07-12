"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "lucide-react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { supabase } from "@/lib/supabaseClient";

interface ForecastDataPoint {
  name: string;
  forecast: number;
}

const InsightsSection = ({ ticker }: { ticker: string }) => {
  const [chartData, setChartData] = useState<ForecastDataPoint[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      if (!ticker) {
        console.warn("⚠️ Ticker not provided.");
        return;
      }

      console.log(`🔄 Fetching forecast data for: ${ticker}`);

      const { data, error } = await supabase.storage
        .from("forecast-csv")
        .download(`${ticker}_forecast.csv`);

      console.log("Files in forecasts bucket:", data);

      console.log(`📁 Requesting file from Supabase path: forecasts/${ticker}_forecast.csv`);


      if (error) {
        console.error("❌ Error downloading CSV from Supabase:", error);
        return;
      }

      console.log("✅ File downloaded from Supabase.");

      try {
        const text = await data.text();
        console.log("📄 Raw CSV Content Preview:", text.slice(0, 300));

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("📊 Papa.parse results:", results);

            const parsed = results.data.map((row: any, index: number) => {
              const name = row.Date || row.name;
              const original = parseFloat(row.Predicted_Close || row.forecast || row.Forecast);

              return { name, forecast: original };
            });
            // Filter valid entries
            const filtered = parsed.filter(
              (point) =>
                point.name &&
                !isNaN(point.forecast) &&
                typeof point.name === "string"
            );

            if (filtered.length === 0) {
              console.warn("⚠️ Parsed data is empty or invalid. Check CSV format.");
              setChartData([]);
              return;
            }

            // Get average forecast to amplify visually
            // Compute average of forecast values
            const average = filtered.reduce((sum, point) => sum + point.forecast, 0) / filtered.length;

            // Amplify small variations to exaggerate ups and downs (for visual effect)
            const amplified = filtered.map((point) => ({
              ...point,
              forecast: average + (point.forecast - average) * 20, // adjust amplification factor as needed
            }));

            setChartData(amplified);





            const validData = parsed.filter(
              (point) =>
                point.name &&
                !isNaN(point.forecast) &&
                typeof point.name === "string"
            );

            if (validData.length === 0) {
              console.warn("⚠️ No valid data found after parsing.");
            } else {
              console.log("✅ Final chart data:", validData);
            }

            setChartData(validData);
          },
          error: (err) => {
            console.error("❌ Papa.parse error:", err);
          },
        });
      } catch (err) {
        console.error("❌ Error reading CSV text:", err);
      }
    };

    fetchCSV();
  }, [ticker]);

  return (
    <section id="insights" className="py-20 bg-dark-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="text-neon">Market Insights</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our advanced algorithms continuously analyze market data to provide you with actionable trading insights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-full bg-dark-200 border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-neon" />
                  {ticker ? `${ticker.toUpperCase()} Forecast` : "Loading..."}
                </h3>
                <Badge variant="outline" className="border-neon/30 text-neon">
                  Live Data
                </Badge>
              </div>

              <div className="h-[300px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis
                        dataKey="name"
                        stroke="#aaa"
                        tickFormatter={(value) => {
                          // Format as YYYY-MM-DD (remove time)
                          const date = new Date(value);
                          if (isNaN(date.getTime())) return value; // fallback if not valid date
                          return date.toISOString().split("T")[0];
                        }}
                      />

                      <YAxis
                        stroke="#aaa"
                        domain={([dataMin, dataMax]: [number, number], _allowDataOverflow: boolean): [number, number] => {
                          const mid = (dataMin + dataMax) / 2;
                          const buffer = Math.max(mid * 0.1, 10); // At least 10 units
                          return [mid - buffer, mid + buffer];
                        }}
                        tickFormatter={(tick) => tick.toFixed(2)}
                      />






                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1f1f",
                          borderColor: "#2d2d2d",
                          color: "#fff",
                        }}
                        labelStyle={{ color: "#fff" }}
                        cursor={{ stroke: "#2e2e2e", strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#80ed99"
                        strokeWidth={2}
                        dot={{ r: 2, fill: "#80ed99" }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-400 pt-10">
                    📉 No forecast data available yet.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
