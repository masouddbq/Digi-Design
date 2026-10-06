"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/format";

export function ColorPicker({ colors }: { colors: { name: string; hex: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-neutral-800">
        رنگ: <span className="font-normal text-neutral-600">{colors[active].name}</span>
      </p>
      <div className="flex gap-2">
        {colors.map((c, i) => (
          <button
            key={c.name}
            type="button"
            aria-label={c.name}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn("grid size-9 place-items-center rounded-full border-2 transition", i === active ? "border-accent" : "border-line")}
          >
            <span className="grid size-7 place-items-center rounded-full border border-black/10" style={{ backgroundColor: c.hex }}>
              {i === active && <Check className="size-4 text-white mix-blend-difference" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
