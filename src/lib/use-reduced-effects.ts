"use client";

import { useEffect, useState } from "react";

export function useReducedEffects() {
  const [reducedEffects, setReducedEffects] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const hardwareConcurrency =
        typeof navigator !== "undefined" ? navigator.hardwareConcurrency ?? 8 : 8;
      const deviceMemory =
        typeof navigator !== "undefined" && "deviceMemory" in navigator
          ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8)
          : 8;

      setReducedEffects(
        mediaQuery.matches ||
          coarsePointer ||
          hardwareConcurrency <= 4 ||
          deviceMemory <= 4
      );
    };

    update();
    mediaQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return reducedEffects;
}
