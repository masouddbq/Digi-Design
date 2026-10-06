"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart";
import { faNum } from "@/lib/format";

export function CartButton() {
  const { count } = useCart();
  return (
    <Link href="/cart" aria-label="سبد خرید" className="relative grid size-10 place-items-center rounded-lg text-neutral-700 hover:bg-surface">
      <ShoppingCart className="size-[22px]" strokeWidth={1.7} />
      {count > 0 && (
        <span className="absolute -top-0.5 -start-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-md border-2 border-white bg-brand px-1 text-[10px] font-bold text-white">
          {faNum(count)}
        </span>
      )}
    </Link>
  );
}
