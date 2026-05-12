"use client";

import React, { useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  style,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const isFocusedRef = useRef(false);
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  const flushPosition = () => {
    frameRef.current = null;

    if (!spotlightRef.current) return;

    spotlightRef.current.style.setProperty(
      "--spotlight-x",
      `${positionRef.current.x}px`
    );
    spotlightRef.current.style.setProperty(
      "--spotlight-y",
      `${positionRef.current.y}px`
    );
  };

  const setOpacity = (value: number) => {
    spotlightRef.current?.style.setProperty("--spotlight-opacity", `${value}`);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocusedRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    positionRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushPosition);
    }
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
    setOpacity(0.92);
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.92);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={style}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `
            radial-gradient(circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), ${spotlightColor} 0%, transparent 44%),
            radial-gradient(circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(255,255,255,0.16) 0%, transparent 18%)
          `,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
