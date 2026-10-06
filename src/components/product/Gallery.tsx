"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/format";
import { Tilt } from "@/components/ui/Tilt";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Tilt max={6} className="rounded-2xl">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
            <Image src={images[active]} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
          </div>
        </Tilt>
        <div className="absolute top-3 start-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label="افزودن به علاقه‌مندی"
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className="grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur"
          >
            <Heart className={cn("size-[18px]", liked ? "fill-brand text-brand" : "text-neutral-600")} />
          </button>
          <button
            type="button"
            aria-label="اشتراک‌گذاری"
            onClick={() => navigator.share?.({ title, url: location.href })}
            className="grid size-9 place-items-center rounded-full bg-white/90 text-neutral-600 shadow-sm backdrop-blur"
          >
            <Share2 className="size-[18px]" />
          </button>
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`تصویر ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn("relative size-16 overflow-hidden rounded-lg border-2 transition", i === active ? "border-brand" : "border-transparent opacity-70")}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
