"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/content";
import { cn } from "@/lib/format";

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="پیشنهادهای ویژه"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group relative h-44 overflow-hidden rounded-2xl sm:h-64 lg:h-[300px]"
    >
      {heroSlides.map((s, idx) => (
        <Link
          key={s.id}
          href={s.href}
          aria-hidden={idx !== i}
          tabIndex={idx === i ? 0 : -1}
          className={cn("absolute inset-0 flex items-center transition-opacity duration-700", idx === i ? "z-10 opacity-100" : "opacity-0")}
          style={{ background: `linear-gradient(120deg, ${s.from}, ${s.to})` }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgb(255 255 255 / .35), transparent 40%), radial-gradient(circle at 80% 90%, rgb(255 255 255 / .2), transparent 35%)" }}
          />
          <div className="relative z-10 max-w-[58%] ps-5 text-white sm:ps-10 lg:ps-16">
            <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium backdrop-blur sm:text-xs">{s.eyebrow}</span>
            <h2 className="mt-2 text-lg leading-snug font-black sm:text-3xl lg:text-4xl">{s.title}</h2>
            <p className="mt-1.5 text-[11px] text-white/80 sm:mt-3 sm:text-sm">{s.text}</p>
            <span className="mt-3 inline-flex h-8 items-center rounded-lg bg-white px-3 text-[11px] font-bold text-neutral-900 sm:mt-5 sm:h-10 sm:px-5 sm:text-xs">
              مشاهده و خرید
            </span>
          </div>
          <div className="absolute end-4 top-1/2 aspect-square h-[78%] -translate-y-1/2 sm:end-10 lg:end-20" style={{ perspective: "800px" }}>
            <div className="size-full" style={{ transform: "rotateY(-14deg)" }}>
              <div className="relative size-full animate-float overflow-hidden rounded-[28%] shadow-2xl ring-4 ring-white/20">
                <Image src={s.image} alt={s.title} fill priority={idx === 0} sizes="(max-width: 640px) 40vw, 300px" className="object-cover" />
              </div>
            </div>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-3 start-5 z-20 flex gap-1.5 sm:start-10 lg:start-16">
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            aria-label={`اسلاید ${idx + 1}`}
            onClick={() => setI(idx)}
            className={cn("h-1.5 rounded-full bg-white transition-all", idx === i ? "w-5" : "w-1.5 opacity-50")}
          />
        ))}
      </div>

      <div className="absolute bottom-3 end-4 z-20 hidden gap-2 opacity-0 transition group-hover:opacity-100 md:flex">
        <button type="button" aria-label="قبلی" onClick={() => go(-1)} className="grid size-8 place-items-center rounded-full bg-white/90 text-neutral-800">
          <ChevronRight className="size-4" />
        </button>
        <button type="button" aria-label="بعدی" onClick={() => go(1)} className="grid size-8 place-items-center rounded-full bg-white/90 text-neutral-800">
          <ChevronLeft className="size-4" />
        </button>
      </div>
    </section>
  );
}
