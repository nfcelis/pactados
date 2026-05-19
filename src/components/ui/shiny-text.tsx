import React from "react";
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
  className = "",
  color = "#b5b5b5",
}) => {
  return (
    <span
      className={cn("shiny-text-content inline-block", className)}
      style={{ color }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
