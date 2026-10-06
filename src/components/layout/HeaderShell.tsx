"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

/** نوار دوم هدر هنگام اسکرول به پایین مخفی و با اسکرول به بالا ظاهر می‌شود. */
export function HeaderShell({ top, nav }: { top: React.ReactNode; nav: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {top}
      <div
        className={cn(
          "hidden border-b border-line transition-[max-height,opacity] duration-300 lg:block",
          hidden ? "max-h-0 overflow-hidden opacity-0" : "max-h-14 opacity-100",
        )}
      >
        {nav}
      </div>
    </header>
  );
}
