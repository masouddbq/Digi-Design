"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";

export function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="group/carousel relative">
      <div ref={ref} className={cn("no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth", className)}>
        {children}
      </div>
      <button
        type="button"
        aria-label="قبلی"
        onClick={() => scroll(1)}
        className="absolute top-1/2 right-1 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-neutral-700 opacity-0 shadow-soft transition group-hover/carousel:opacity-100 md:grid"
      >
        <ChevronRight className="size-5" />
      </button>
      <button
        type="button"
        aria-label="بعدی"
        onClick={() => scroll(-1)}
        className="absolute top-1/2 left-1 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-neutral-700 opacity-0 shadow-soft transition group-hover/carousel:opacity-100 md:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
    </div>
  );
}
