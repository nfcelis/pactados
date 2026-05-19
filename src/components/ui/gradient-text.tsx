import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: string;
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  showBorder = false,
}: GradientTextProps) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

  return (
    <span
      className={cn(
        "relative inline-flex max-w-fit flex-row items-center justify-center font-medium",
        showBorder ? "px-2 py-1" : "",
        className
      )}
      data-gradient-text-root="true"
    >
      <span
        className="gradient-text-content relative z-[2] inline-block text-transparent"
        style={{
          backgroundImage: gradient,
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
