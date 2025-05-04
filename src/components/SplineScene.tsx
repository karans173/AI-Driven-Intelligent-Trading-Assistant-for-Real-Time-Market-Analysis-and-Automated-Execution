"use client";
import React from "react";
// Use the base package instead of /next
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main style={{ width: "100%", height: "100vh" }}>
      <Spline scene="https://prod.spline.design/voTYLMZmDsfWLMzl/scene.splinecode" />
    </main>
  );
}
