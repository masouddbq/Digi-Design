"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";
import { finalPrice, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cn, faNum } from "@/lib/format";

const sorts = [
  { id: "relevant", label: "مرتبط‌ترین" },
  { id: "best", label: "پرفروش‌ترین" },
  { id: "rating", label: "محبوب‌ترین" },
  { id: "cheap", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "discount", label: "بیشترین تخفیف" },
] as const;

export type SortId = (typeof sorts)[number]["id"];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-3 text-xs font-medium text-neutral-800">
      {label}
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-5 w-9 rounded-full bg-neutral-200 transition peer-checked:bg-accent after:absolute after:top-0.5 after:right-0.5 after:size-4 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:-translate-x-4" />
    </label>
  );
}

export function ProductListing({
  items,
  initialSort = "relevant",
  initialFast = false,
}: {
  items: Product[];
  initialSort?: SortId;
  initialFast?: boolean;
}) {
  const [sort, setSort] = useState<SortId>(initialSort);
  const [brands, setBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [fast, setFast] = useState(initialFast);
  const [onSale, setOnSale] = useState(false);
  const [sheet, setSheet] = useState(false);

  const allBrands = useMemo(() => [...new Set(items.map((p) => p.brand))], [items]);

  const list = useMemo(() => {
    const r = items.filter(
      (p) =>
        (!brands.length || brands.includes(p.brand)) &&
        (!inStock || p.stock > 0) &&
        (!fast || p.fastShip) &&
        (!onSale || p.discount > 0),
    );
    const by: Record<SortId, (a: Product, b: Product) => number> = {
      relevant: () => 0,
      best: (a, b) => b.reviews - a.reviews,
      rating: (a, b) => b.rating - a.rating,
      cheap: (a, b) => finalPrice(a) - finalPrice(b),
      expensive: (a, b) => finalPrice(b) - finalPrice(a),
      discount: (a, b) => b.discount - a.discount,
    };
    return [...r].sort(by[sort]);
  }, [items, brands, inStock, fast, onSale, sort]);

  const activeCount = brands.length + Number(inStock) + Number(fast) + Number(onSale);
  const reset = () => {
    setBrands([]);
    setInStock(false);
    setFast(false);
    setOnSale(false);
  };

  const filters = (
    <div className="divide-y divide-line">
      <div className="pb-3">
        <p className="mb-2 text-xs font-bold text-neutral-800">برند</p>
        <ul className="space-y-2.5">
          {allBrands.map((b) => (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-700">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={(e) => setBrands((s) => (e.target.checked ? [...s, b] : s.filter((x) => x !== b)))}
                  className="size-4 rounded accent-accent"
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <Toggle label="فقط کالاهای موجود" checked={inStock} onChange={setInStock} />
      <Toggle label="ارسال سریع" checked={fast} onChange={setFast} />
      <Toggle label="فقط کالاهای تخفیف‌دار" checked={onSale} onChange={setOnSale} />
    </div>
  );

  return (
    <div className="flex items-start gap-4">
      <aside className="sticky top-32 hidden w-64 shrink-0 rounded-xl border border-line p-4 lg:block">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-900">فیلترها</p>
          {activeCount > 0 && (
            <button type="button" onClick={reset} className="text-xs text-accent">حذف فیلترها</button>
          )}
        </div>
        {filters}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setSheet(true)}
            className="flex h-8 items-center gap-1 rounded-full border border-line px-3 text-xs text-neutral-700"
          >
            <SlidersHorizontal className="size-4" />
            فیلتر
            {activeCount > 0 && <span className="grid size-4 place-items-center rounded-full bg-brand text-[9px] text-white">{faNum(activeCount)}</span>}
          </button>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {sorts.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={cn("h-8 shrink-0 rounded-full border px-3 text-xs", sort === s.id ? "border-brand bg-brand-soft text-brand" : "border-line text-neutral-600")}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2 hidden items-center gap-5 border-b border-line pb-3 lg:flex">
          <span className="flex items-center gap-1 text-xs font-bold text-neutral-800">
            <ArrowUpDown className="size-4" />
            مرتب‌سازی:
          </span>
          {sorts.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSort(s.id)}
              className={cn("text-xs transition", sort === s.id ? "font-bold text-brand" : "text-neutral-500 hover:text-neutral-800")}
            >
              {s.label}
            </button>
          ))}
          <span className="ms-auto text-xs text-muted">{faNum(list.length)} کالا</span>
        </div>

        {list.length ? (
          <ul className="grid grid-cols-2 overflow-hidden rounded-xl border-s border-t border-line sm:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <li key={p.id} className="border-e border-b border-line bg-white">
                <ProductCard product={p} priority={i < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <p className="text-sm font-bold text-neutral-700">کالایی با این مشخصات پیدا نکردیم</p>
            <button type="button" onClick={reset} className="mt-3 text-xs text-accent">حذف فیلترها</button>
          </div>
        )}
      </div>

      <div className={cn("fixed inset-0 z-50 lg:hidden", sheet ? "visible" : "invisible")}>
        <button
          type="button"
          aria-label="بستن"
          onClick={() => setSheet(false)}
          className={cn("absolute inset-0 bg-black/40 transition-opacity", sheet ? "opacity-100" : "opacity-0")}
        />
        <div
          role="dialog"
          aria-label="فیلترها"
          className={cn("absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4 pb-8 transition-transform duration-300", sheet ? "translate-y-0" : "translate-y-full")}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold">فیلترها</p>
            <button type="button" aria-label="بستن" onClick={() => setSheet(false)}>
              <X className="size-5" />
            </button>
          </div>
          {filters}
          <button type="button" onClick={() => setSheet(false)} className="mt-4 h-11 w-full rounded-lg bg-brand text-sm font-bold text-white">
            مشاهده {faNum(list.length)} کالا
          </button>
        </div>
      </div>
    </div>
  );
}
