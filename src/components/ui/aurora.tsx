"use client";

import React from "react";

interface AuroraProps {
  className?: string;
  colorStops?: [string, string, string] | string[];
  amplitude?: number;
  blend?: number;
}

export default function Aurora({
  className = "",
  colorStops = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude = 1,
  blend = 0.5,
}: AuroraProps) {
  const [color1, color2, color3] = colorStops;

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-full ${className}`}>
      <div className="absolute inset-[-18%] opacity-95">
        <div
          className="aurora-blob aurora-blob-a"
          style={{
            background: `radial-gradient(circle, ${color1} 0%, transparent 68%)`,
            opacity: 0.9,
            transform: `scale(${1.05 + amplitude * 0.08})`,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="aurora-blob aurora-blob-b"
          style={{
            background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
            opacity: 0.7,
            transform: `scale(${1.02 + amplitude * 0.06})`,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="aurora-blob aurora-blob-c"
          style={{
            background: `radial-gradient(circle, ${color3} 0%, transparent 68%)`,
            opacity: 0.88,
            transform: `scale(${1.06 + amplitude * 0.08})`,
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div
        className="absolute inset-[3%] rounded-full opacity-56 mix-blend-soft-light"
        style={{
          background: `
            radial-gradient(circle at 28% 30%, rgba(255,255,255,0.16) 0 4%, transparent 5% 100%),
            radial-gradient(circle at 66% 36%, rgba(255,240,220,0.18) 0 5%, transparent 6% 100%),
            radial-gradient(circle at 58% 68%, rgba(255,225,190,0.16) 0 4%, transparent 5% 100%),
            radial-gradient(circle at 34% 72%, rgba(255,255,255,0.14) 0 3%, transparent 4% 100%),
            conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              rgba(255,255,255,0.14) 34deg,
              transparent 88deg,
              rgba(255,237,214,0.14) 138deg,
              transparent 220deg,
              rgba(255,255,255,0.12) 290deg,
              transparent 360deg
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${0.12 * blend}) 0%, transparent 48%)`,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="absolute inset-0 rounded-full opacity-32 mix-blend-overlay"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              circle at 50% 50%,
              rgba(255,248,232,0.24) 0 1px,
              transparent 1px 9px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(255,244,224,0.24) 0 1px,
              transparent 1px 5px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,238,214,0.18) 0 1px,
              transparent 1px 5px
            )
          `,
          backgroundSize: "16px 16px, 8px 8px, 8px 8px",
        }}
      />

      <div
        className="absolute inset-[6%] rounded-full opacity-22 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 35% 35%, rgba(255,247,226,0.18) 0 18%, transparent 20%),
            radial-gradient(circle at 72% 42%, rgba(255,230,194,0.14) 0 14%, transparent 16%),
            radial-gradient(circle at 48% 70%, rgba(255,248,232,0.12) 0 16%, transparent 18%)
          `,
          filter: "blur(2px)",
        }}
      />

      <div className="absolute inset-[1.6%] rounded-full border border-white/8" />
    </div>
  );
}
