"use client";

import { type CSSProperties, type ReactNode, useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
        ? "to bottom"
        : "to bottom right";

  const gradientColors = [...colors, colors[0]].join(", ");
  const animationName = useMemo(() => {
    if (direction === "vertical") return "gradient-text-shift-vertical";
    if (direction === "diagonal") return "gradient-text-shift-diagonal";
    return "gradient-text-shift-horizontal";
  }, [direction]);

  const gradientStyle = useMemo(() => {
    const style: CSSProperties = {
      backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
      backgroundSize:
        direction === "horizontal"
          ? "220% 100%"
          : direction === "vertical"
            ? "100% 220%"
            : "220% 220%",
      backgroundRepeat: "repeat",
      animationName,
      animationDuration: `${animationSpeed}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationDirection: yoyo ? "alternate" : "normal",
      animationPlayState: isPaused ? "paused" : "running",
      willChange: "background-position",
    };

    return style;
  }, [
    animationName,
    animationSpeed,
    direction,
    gradientAngle,
    gradientColors,
    isPaused,
    yoyo,
  ]);

  return (
    <span
      className={cn(
        "relative mx-auto inline-flex max-w-fit flex-row items-center justify-center font-medium transition-shadow duration-500",
        showBorder ? "px-2 py-1" : "",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-gradient-text-root="true"
    >
      {showBorder ? (
        <span
          className="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
          style={gradientStyle}
        >
          <span
            className="absolute z-[-1] rounded-[1.25rem] bg-black"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </span>
      ) : null}

      <span
        className="gradient-text-content relative z-[2] inline-block text-transparent"
        style={{
          ...gradientStyle,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        data-gradient-text-fill="true"
      >
        {children}
      </span>
    </span>
  );
}
