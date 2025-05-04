"use client"; // Required for using Spline in a client component

import React from "react";
import Spline from "@splinetool/react-spline"; // ✅ Use the base package

export default function Home() {
  return (
    <main style={{ width: "150%", height: "100vh" }}>
      <Spline scene="https://prod.spline.design/SJm8cLF1FOtn0BrX/scene.splinecode" />
    </main>
  );
}
