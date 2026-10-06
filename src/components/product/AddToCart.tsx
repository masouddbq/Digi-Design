"use client";

import Link from "next/link";
import { Minus, Plus, Trash } from "lucide-react";
import { useCart } from "@/context/cart";
import { cn, faNum } from "@/lib/format";

export function QtyControl({ slug, compact }: { slug: string; compact?: boolean }) {
  const { qtyOf, add, dec } = useCart();
  const qty = qtyOf(slug);
  return (
    <div className={cn("flex items-center justify-between rounded-lg border border-line bg-white text-brand shadow-sm", compact ? "h-9 w-24 px-1.5" : "h-11 w-28 px-2")}>
      <button type="button" aria-label="افزایش" onClick={() => add(slug)} className="grid size-6 place-items-center">
        <Plus className="size-4" />
      </button>
      <span className="text-sm font-bold">{faNum(qty)}</span>
      <button type="button" aria-label="کاهش" onClick={() => dec(slug)} className="grid size-6 place-items-center">
        {qty === 1 ? <Trash className="size-4" /> : <Minus className="size-4" />}
      </button>
    </div>
  );
}

export function AddToCart({ slug, disabled }: { slug: string; disabled?: boolean }) {
  const { qtyOf, add, ready } = useCart();
  const qty = qtyOf(slug);

  if (ready && qty > 0) {
    return (
      <div className="flex items-center gap-3">
        <QtyControl slug={slug} />
        <div className="text-xs leading-5">
          <p className="text-neutral-600">در سبد شما</p>
          <Link href="/cart" className="font-medium text-accent">مشاهده سبد خرید</Link>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => add(slug)}
      className="h-11 w-full rounded-lg bg-brand text-sm font-bold text-white transition hover:brightness-95 active:scale-[0.99] disabled:bg-neutral-300"
    >
      {disabled ? "ناموجود" : "افزودن به سبد"}
    </button>
  );
}
