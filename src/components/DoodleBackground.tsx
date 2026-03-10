"use client";

import React, { useEffect, useState } from "react";

interface Doodle {
  id: number;
  svg: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
}

const DOODLE_SVGS = [
  // 🔥 Llama (racha)
  `<svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4 C20 4 28 14 28 22 C28 30 24 36 20 40 C16 36 12 30 12 22 C12 14 20 4 20 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M20 24 C20 24 24 28 22 34 C20 36 18 34 18 32 C16 34 16 38 20 40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  </svg>`,

  // 📚 Libro
  `<svg viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="28" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="24" y="6" width="16" height="28" rx="2" stroke="currentColor" stroke-width="2"/>
    <line x1="12" y1="12" x2="12" y2="28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="32" y1="12" x2="32" y2="28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M20 6 L22 8 L24 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // 🏆 Trofeo
  `<svg viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6 H30 V22 C30 30 22 36 22 36 C22 36 14 30 14 22 Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M14 10 H6 C6 10 6 22 14 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M30 10 H38 C38 10 38 22 30 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
    <line x1="22" y1="36" x2="22" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="42" x2="30" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // 💰 Moneda (apuesta)
  `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="2"/>
    <circle cx="20" cy="20" r="10" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
    <text x="20" y="25" text-anchor="middle" font-size="12" stroke="currentColor" stroke-width="0.5" fill="currentColor" font-family="serif">$</text>
  </svg>`,

  // ⏱ Cronómetro
  `<svg viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="28" r="14" stroke="currentColor" stroke-width="2"/>
    <line x1="20" y1="28" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="28" x2="27" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="6" x2="24" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="14" x2="35" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // 💪 Pesa (gym)
  `<svg viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="6" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="44" y="6" width="6" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="8" y="4" width="6" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="38" y="4" width="6" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    <line x1="14" y1="12" x2="38" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ⭐ Estrella
  `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,4 24,15 36,15 27,23 30,35 20,28 10,35 13,23 4,15 16,15" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
  </svg>`,

  // 📱 Pantalla (reducir screen time)
  `<svg viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="38" rx="4" stroke="currentColor" stroke-width="2"/>
    <line x1="14" y1="38" x2="18" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10" y1="22" x2="18" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="28" x2="16" y2="34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="31" x2="20" y2="31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ✅ Check (completar reto)
  `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="2"/>
    <polyline points="12,20 18,26 29,14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  // 🎯 Target (meta)
  `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="2"/>
    <circle cx="20" cy="20" r="9" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="3" stroke="currentColor" stroke-width="1.5"/>
    <line x1="20" y1="4" x2="20" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="20" y1="30" x2="20" y2="36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // 📈 Gráfica (progreso)
  `<svg viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="4,30 14,20 22,24 32,10 40,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="4" y1="4" x2="4" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="4" y1="32" x2="42" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // 🤝 Apretón de manos (reto con otros)
  `<svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 18 L10 12 L18 16 L24 12 L30 16 L38 12 L46 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M18 16 C18 16 22 20 24 20 C26 20 30 16 30 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,
];

function generateDoodles(): Doodle[] {
  const doodles: Doodle[] = [];
  const cols = 6;
  const rows = 5;
  let id = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const jitterX = (Math.random() - 0.5) * 10;
      const jitterY = (Math.random() - 0.5) * 10;

      const x = (col / (cols - 1)) * 90 + 5 + jitterX;
      const y = (row / (rows - 1)) * 88 + 6 + jitterY;

      const svgIndex = (row * cols + col) % DOODLE_SVGS.length;

      doodles.push({
        id: id++,
        svg: DOODLE_SVGS[svgIndex],
        x: Math.max(2, Math.min(96, x)),
        y: Math.max(2, Math.min(96, y)),
        size: 28 + Math.floor(Math.random() * 18),
        rotate: Math.floor(Math.random() * 60) - 30,
        opacity: 0.12 + Math.random() * 0.08,
      });
    }
  }

  return doodles;
}

interface Props {
  children?: React.ReactNode;
  bgColor?: string;
  doodleColor?: string;
  className?: string;
}

export default function DoodleBackground({
  children,
  bgColor = "#0d0d0f",
  doodleColor = "#ffffff",
  className = "",
}: Props) {
  const [doodles, setDoodles] = useState<Doodle[]>([]);

  useEffect(() => {
    setDoodles(generateDoodles());
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {doodles.map((d) => (
          <div
            key={d.id}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              color: doodleColor,
              opacity: d.opacity,
              transform: `rotate(${d.rotate}deg)`,
            }}
            dangerouslySetInnerHTML={{ __html: d.svg }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}