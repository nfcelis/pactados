"use client";

import React, { type CSSProperties, useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const animationName = direction === "left" ? "shiny-text-sweep-left" : "shiny-text-sweep-right";
  const animationDuration = Math.max(speed + delay, 0.1);

  const gradientStyle = useMemo(() => {
    const style: CSSProperties = {
      backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
      backgroundSize: "220% auto",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundPosition: direction === "left" ? "150% center" : "-50% center",
    };

    if (!disabled) {
      style.animationName = animationName;
      style.animationDuration = `${animationDuration}s`;
      style.animationTimingFunction = "linear";
      style.animationIterationCount = "infinite";
      style.animationDirection = yoyo ? "alternate" : "normal";
      style.animationPlayState = isPaused ? "paused" : "running";
      style.animationDelay = delay > 0 ? `${delay}s` : undefined;
    }

    return style;
  }, [
    animationDuration,
    animationName,
    color,
    delay,
    direction,
    disabled,
    isPaused,
    shineColor,
    spread,
    yoyo,
  ]);

  return (
    <span
      className={cn("shiny-text-content inline-block", className)}
      style={gradientStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  );
};

export default ShinyText;
