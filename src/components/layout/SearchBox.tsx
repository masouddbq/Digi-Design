"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Search } from "lucide-react";
import { products, searchProducts } from "@/data/products";
import { siteConfig } from "@/config/site";

const trending = ["هدفون", "گردنبند", "قهوه", "کفش", "سامسونگ"];

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLFormElement>(null);

  const results = useMemo(() => searchProducts(q).slice(0, 5), [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = (term: string) => {
    if (!term.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  return (
    <form
      ref={box}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        go(q);
      }}
      className="relative w-full"
    >
      <label className="flex h-10 items-center gap-2 rounded-lg bg-surface px-3 text-neutral-500 transition focus-within:bg-white focus-within:ring-1 focus-within:ring-line focus-within:shadow-soft">
        <Search className="size-[18px] shrink-0" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={`جستجو در ${siteConfig.shortName}`}
          aria-label="جستجوی محصول"
          className="w-full bg-transparent text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400"
        />
      </label>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-line bg-white p-3 shadow-soft">
          {q && results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-surface"
                  >
                    <Image src={p.images[0]} alt="" width={40} height={40} className="size-10 rounded-md object-cover" />
                    <span className="line-clamp-1 text-xs text-neutral-700">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : q ? (
            <p className="py-3 text-center text-xs text-muted">نتیجه‌ای برای «{q}» پیدا نشد</p>
          ) : (
            <>
              <p className="mb-2 flex items-center gap-1 text-xs font-bold text-neutral-700">
                <Flame className="size-4 text-brand" />
                جستجوهای پرطرفدار
              </p>
              <div className="flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => go(t)}
                    className="rounded-full border border-line px-3 py-1 text-xs text-neutral-600 hover:border-neutral-300"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted">{products.length.toLocaleString("fa-IR")} کالا در فروشگاه</p>
            </>
          )}
        </div>
      )}
    </form>
  );
}
