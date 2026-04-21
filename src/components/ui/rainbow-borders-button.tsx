"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type RainbowBordersButtonProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  radius?: string;
};

export function RainbowBordersButton({
  children,
  className,
  contentClassName,
  radius = "999px",
}: RainbowBordersButtonProps) {
  const frameVars = {
    "--science-frame-radius": radius,
    "--science-frame-inner-radius": `calc(${radius} - 1px)`,
  } as CSSProperties;

  return (
    <div
      style={frameVars}
      className={cn(
        "science-rainbow-frame relative w-full p-px shadow-[0_10px_22px_rgba(72,18,6,0.03)]",
        className
      )}
    >
      <div
        className={cn(
          "relative flex min-h-14 items-center justify-center overflow-hidden bg-transparent px-5 py-3 text-center md:min-h-16 md:px-8",
          contentClassName
        )}
        style={{ borderRadius: "var(--science-frame-inner-radius)" }}
      >
        <div className="relative z-10">{children}</div>
      </div>

      <style jsx>{`
        .science-rainbow-frame::before,
        .science-rainbow-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: var(--science-frame-radius);
          background:
            linear-gradient(
              115deg,
              rgba(255, 247, 222, 0.94) 0%,
              rgba(255, 206, 122, 0.9) 15%,
              rgba(243, 119, 52, 0.9) 31%,
              rgba(255, 223, 137, 0.86) 48%,
              rgba(255, 183, 83, 0.88) 62%,
              rgba(238, 103, 49, 0.9) 78%,
              rgba(255, 220, 149, 0.9) 89%,
              rgba(255, 247, 222, 0.94) 100%
            );
          background-size: 240% 240%;
          animation: scienceBorderShift 11s linear infinite;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
          pointer-events: none;
        }

        .science-rainbow-frame::after {
          inset: -1px;
          padding: 1px;
          border-radius: calc(var(--science-frame-radius) + 1px);
          filter: blur(8px);
          opacity: 0.2;
          z-index: -2;
        }

        @keyframes scienceBorderShift {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export { RainbowBordersButton as Button };
