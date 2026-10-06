"use client";

import { useRef } from "react";
import { cn } from "@/lib/format";

/** افکت سه‌بعدی سبک با CSS transform؛ بدون رندر مجدد و فقط روی دستگاه‌های دارای ماوس. */
export function Tilt({ children, className, max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.015)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={reset} className={cn("tilt-3d", className)}>
      {children}
    </div>
  );
}
