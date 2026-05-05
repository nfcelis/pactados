"use client";

import React, { useId } from "react";

interface BalatroProps {
  className?: string;
  spinRotation?: number;
  spinSpeed?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  contrast?: number;
  lighting?: number;
  spinAmount?: number;
  pixelFilter?: number;
}

export default function Balatro({
  className = "",
  spinRotation = -2,
  spinSpeed = 7,
  color1 = "#de443b",
  color2 = "#f2712c",
  color3 = "#f7c58d",
  contrast = 3.5,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 700,
}: BalatroProps) {
  const filterId = useId().replace(/:/g, "");

  return (
    <div
      className={`relative isolate h-full w-full overflow-hidden rounded-full ${className}`}
      style={{
        transform: `rotate(${spinRotation}deg)`,
      }}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.02"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="90"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>

      <div
        className="absolute inset-[-18%] rounded-full"
        style={{
          filter: `url(#${filterId}) contrast(${contrast}) saturate(1.08)`,
        }}
      >
        <div
          className="absolute inset-[-8%] rounded-full opacity-95"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, ${color3} 0 13%, transparent 14% 100%),
              radial-gradient(circle at 32% 28%, ${color1} 0 24%, transparent 25% 100%),
              radial-gradient(circle at 72% 28%, ${color2} 0 22%, transparent 23% 100%),
              radial-gradient(circle at 28% 76%, ${color1} 0 20%, transparent 21% 100%),
              radial-gradient(circle at 70% 74%, ${color2} 0 21%, transparent 22% 100%),
              radial-gradient(circle at 48% 63%, ${color3} 0 18%, transparent 19% 100%),
              conic-gradient(
                from 0deg,
                ${color1} 0deg,
                ${color2} 80deg,
                ${color3} 135deg,
                ${color1} 215deg,
                ${color2} 300deg,
                ${color3} 360deg
              )
            `,
            animation: `balatro-spin ${spinSpeed}s linear infinite`,
            transform: `scale(${1 + spinAmount * 0.4})`,
          }}
        />

        <div
          className="absolute inset-[-12%] rounded-full mix-blend-screen opacity-88"
          style={{
            background: `
              radial-gradient(circle at 48% 50%, rgba(255,255,255,${lighting}) 0 8%, transparent 20%),
              radial-gradient(circle at 44% 46%, ${color3} 0 12%, transparent 28%),
              radial-gradient(circle at 56% 54%, rgba(255,241,200,0.72) 0 10%, transparent 22%),
              radial-gradient(circle at 61% 39%, rgba(255,210,110,0.45) 0 6%, transparent 18%)
            `,
            filter: "blur(12px)",
            animation: `balatro-spin-reverse ${spinSpeed * 1.35}s linear infinite`,
            transform: `scale(${1 + spinAmount * 0.58})`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-full opacity-16 mix-blend-soft-light"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.3) 0 1px,
              transparent 1px 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.22) 0 1px,
              transparent 1px 3px
            )
          `,
          backgroundSize: `${pixelFilter / 100}px ${pixelFilter / 100}px`,
        }}
      />

      <div className="absolute inset-[2%] rounded-full border border-white/10" />
    </div>
  );
}
