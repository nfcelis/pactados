"use client";

import React from "react";

interface GrainientProps {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
}

export default function Grainient({
  className = "",
  color1 = "#FF9FFC",
  color2 = "#5227FF",
  color3 = "#B19EEF",
  timeSpeed = 0.25,
  blendAngle = 0,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
}: GrainientProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-full ${className}`}
      style={{
        filter: `contrast(${contrast}) saturate(${saturation}) brightness(${gamma})`,
      }}
    >
      <div
        className="absolute inset-[-10%] opacity-95"
        style={{
          transform: `scale(${zoom}) translate(${centerX}%, ${centerY}%)`,
        }}
      >
        <div
          className="grainient-flow grainient-flow-a absolute inset-[-8%] rounded-full"
          style={{
            background: `
              radial-gradient(circle at 36% 30%, ${color1} 0 20%, transparent 38%),
              radial-gradient(circle at 72% 28%, ${color2} 0 24%, transparent 42%),
              radial-gradient(circle at 28% 74%, ${color3} 0 22%, transparent 40%),
              radial-gradient(circle at 70% 70%, ${color1} 0 18%, transparent 36%),
              conic-gradient(
                from ${blendAngle}deg at 50% 50%,
                ${color1} 0deg,
                ${color2} 95deg,
                ${color3} 180deg,
                ${color2} 250deg,
                ${color1} 360deg
              )
            `,
            animationDuration: `${18 / Math.max(timeSpeed, 0.01)}s`,
          }}
        />
        <div
          className="grainient-flow grainient-flow-b absolute inset-[-10%] rounded-full mix-blend-screen opacity-88"
          style={{
            background: `
              radial-gradient(circle at 52% 50%, rgba(255,246,218,0.96) 0 10%, transparent 24%),
              radial-gradient(circle at 42% 50%, ${color3} 0 18%, transparent 34%),
              radial-gradient(circle at 60% 44%, ${color1} 0 14%, transparent 30%),
              radial-gradient(circle at 48% 66%, rgba(255,232,188,0.78) 0 12%, transparent 28%),
              conic-gradient(
                from 0deg,
                ${color1} 0deg,
                ${color2} 110deg,
                ${color3} 210deg,
                ${color1} 360deg
              )
            `,
            animationDuration: `${24 / Math.max(timeSpeed, 0.01)}s`,
          }}
        />
        <div
          className="grainient-flow grainient-flow-c absolute inset-[-12%] rounded-full mix-blend-multiply opacity-72"
          style={{
            background: `
              radial-gradient(circle at 30% 44%, rgba(113,32,18,0.9) 0 16%, transparent 30%),
              radial-gradient(circle at 74% 60%, rgba(140,44,24,0.82) 0 18%, transparent 34%),
              radial-gradient(circle at 54% 26%, rgba(255,174,94,0.26) 0 10%, transparent 24%)
            `,
            animationDuration: `${30 / Math.max(timeSpeed, 0.01)}s`,
          }}
        />
      </div>

      <div
        className={`absolute inset-0 rounded-full ${grainAnimated ? "grainient-grain-animated" : ""}`}
        style={{
          opacity: Math.max(grainAmount, 0.16),
          backgroundImage: `
            repeating-radial-gradient(
              circle at 50% 50%,
              rgba(255,255,255,0.2) 0 1px,
              transparent 1px ${5 * grainScale}px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(255,236,210,0.22) 0 1px,
              transparent 1px ${2.5 * noiseScale}px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,221,182,0.18) 0 1px,
              transparent 1px ${2.5 * noiseScale}px
            )
          `,
          backgroundSize: `${14 * grainScale}px ${14 * grainScale}px, ${6 * noiseScale}px ${6 * noiseScale}px, ${6 * noiseScale}px ${6 * noiseScale}px`,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="absolute inset-[5%] rounded-full opacity-16 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 28% 34%, rgba(255,248,225,0.22) 0 12%, transparent 14%),
            radial-gradient(circle at 62% 58%, rgba(255,236,198,0.16) 0 10%, transparent 12%),
            radial-gradient(circle at 72% 34%, rgba(255,255,255,0.14) 0 8%, transparent 10%)
          `,
          filter: "blur(3px)",
        }}
      />

      <div className="absolute inset-[1.5%] rounded-full border border-white/8" />
    </div>
  );
}
