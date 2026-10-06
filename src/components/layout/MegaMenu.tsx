"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Menu } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { cn } from "@/lib/format";

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-1.5 text-[13px] font-bold text-neutral-800"
      >
        <Menu className="size-[18px]" />
        دسته‌بندی کالاها
      </button>

      <div
        className={cn(
          "absolute top-full right-0 z-50 flex w-[880px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-b-xl border border-t-0 border-line bg-white shadow-soft transition duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="w-56 shrink-0 border-e border-line bg-surface/60 py-2">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 text-xs transition",
                  i === active ? "bg-white font-bold text-brand" : "text-neutral-700",
                )}
              >
                <CategoryIcon name={c.icon} className="size-[18px]" strokeWidth={1.6} />
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1 p-5">
          <Link
            href={`/category/${cat.slug}`}
            onClick={() => setOpen(false)}
            className="mb-4 flex items-center gap-1 text-xs font-medium text-accent"
          >
            همه محصولات {cat.title}
            <ChevronLeft className="size-4" />
          </Link>
          <div className="grid grid-cols-3 gap-6">
            {cat.children.map((g) => (
              <div key={g.title}>
                <p className="mb-2 border-s-2 border-brand ps-2 text-[13px] font-bold text-neutral-800">{g.title}</p>
                <ul className="space-y-2">
                  {g.items.map((it) => (
                    <li key={it}>
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-xs text-neutral-500 hover:text-brand"
                      >
                        {it}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
