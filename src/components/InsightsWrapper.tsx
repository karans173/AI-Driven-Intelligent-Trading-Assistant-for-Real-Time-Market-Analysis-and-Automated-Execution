"use client";
import { useState } from "react";
import InsightsSection from "./InsightsSection";

const InsightsWrapper = () => {
  const [ticker, setTicker] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.trim().toUpperCase());
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white px-4 py-10">
      <div className="max-w-xl mx-auto mb-8">
        <label className="block text-lg mb-2 font-semibold text-neon">
          Enter Stock Ticker (e.g., MSFT):
        </label>
        <input
          type="text"
          value={ticker}
          onChange={handleInputChange}
          placeholder="Enter ticker..."
          className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-neon"
        />
      </div>

      {ticker && <InsightsSection ticker={ticker} />}
    </div>
  );
};

export default InsightsWrapper;
