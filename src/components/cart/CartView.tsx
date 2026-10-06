"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Trash, Truck } from "lucide-react";
import { useCart } from "@/context/cart";
import { finalPrice, getProduct, type Product } from "@/data/products";
import { QtyControl } from "@/components/product/AddToCart";
import { siteConfig } from "@/config/site";
import { faNum, toman } from "@/lib/format";

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-16 text-center">
      <svg viewBox="0 0 200 160" className="w-48" aria-hidden>
        <ellipse cx="100" cy="146" rx="70" ry="8" className="fill-surface" />
        <path d="M40 40h18l16 70h70l14-50H66" fill="none" className="stroke-neutral-300" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="84" cy="128" r="9" className="fill-neutral-300" />
        <circle cx="136" cy="128" r="9" className="fill-neutral-300" />
        <path d="M96 70l20 20m0-20-20 20" className="stroke-brand" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <p className="mt-4 text-base font-extrabold text-neutral-900">سبد خرید شما خالی است!</p>
      <p className="mt-1 text-xs text-muted">می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
      <div className="mt-4 flex gap-2">
        <Link href="/incredible-offers" className="rounded-lg bg-brand-soft px-4 py-2 text-xs font-bold text-brand">تخفیف‌ها و پیشنهادها</Link>
        <Link href="/search?sort=best" className="rounded-lg bg-surface px-4 py-2 text-xs font-bold text-neutral-700">پرفروش‌ترین‌ها</Link>
      </div>
    </div>
  );
}

export function CartView() {
  const { lines, ready, remove, clear } = useCart();
  const items = lines
    .map((l) => ({ ...l, product: getProduct(l.slug) }))
    .filter((l): l is typeof l & { product: Product } => !!l.product);

  if (!ready) return <div className="container-x h-80" />;
  if (!items.length) return <div className="container-x"><EmptyCart /></div>;

  const total = items.reduce((s, l) => s + l.product.price * l.qty, 0);
  const payable = items.reduce((s, l) => s + finalPrice(l.product) * l.qty, 0);
  const saved = total - payable;
  const count = items.reduce((s, l) => s + l.qty, 0);
  const left = siteConfig.freeShippingThreshold - payable;

  return (
    <div className="container-x pt-4 pb-40 lg:pb-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-line p-4">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-base font-extrabold text-neutral-900">
              سبد خرید <span className="text-xs font-normal text-muted">{faNum(count)} کالا</span>
            </h1>
            <button type="button" onClick={clear} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-brand">
              <Trash className="size-4" />
              حذف همه
            </button>
          </div>

          {left > 0 ? (
            <div className="mb-2 rounded-lg bg-surface p-3 text-[11px] text-neutral-600">
              <p className="flex items-center gap-1.5">
                <Truck className="size-4 text-accent" />
                {toman(left)} تومان دیگر تا ارسال رایگان
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.min(100, (payable / siteConfig.freeShippingThreshold) * 100)}%` }} />
              </div>
            </div>
          ) : (
            <p className="mb-2 flex items-center gap-1.5 rounded-lg bg-emerald-50 p-3 text-[11px] text-emerald-700">
              <Truck className="size-4" />
              ارسال این سفارش رایگان است
            </p>
          )}

          <ul className="divide-y divide-line">
            {items.map(({ product: p, qty }) => (
              <li key={p.slug} className="flex gap-4 py-4">
                <div className="flex flex-col items-center gap-3">
                  <Link href={`/product/${p.slug}`} className="relative size-24 overflow-hidden rounded-xl bg-surface sm:size-28">
                    <Image src={p.images[0]} alt={p.title} fill sizes="112px" className="object-cover" />
                  </Link>
                  <QtyControl slug={p.slug} compact />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${p.slug}`} className="line-clamp-2 text-xs leading-6 font-medium text-neutral-800">{p.title}</Link>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-neutral-500">
                    <li className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" />گارانتی اصالت کالا</li>
                    <li className="flex items-center gap-1.5"><Truck className="size-3.5 text-accent" />{p.fastShip ? "ارسال سریع" : "ارسال عادی"}</li>
                  </ul>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      {p.discount > 0 && (
                        <p className="text-[11px] text-brand">{toman((p.price - finalPrice(p)) * qty)} تومان تخفیف</p>
                      )}
                      <p className="text-sm font-bold text-neutral-900">
                        {toman(finalPrice(p) * qty)} <span className="text-[10px] font-normal">تومان</span>
                      </p>
                    </div>
                    <button type="button" aria-label="حذف" onClick={() => remove(p.slug)} className="text-neutral-400 hover:text-brand">
                      <Trash className="size-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="h-fit rounded-2xl border border-line p-4 lg:sticky lg:top-32">
          <dl className="space-y-3 text-xs">
            <div className="flex justify-between text-neutral-600"><dt>قیمت کالاها ({faNum(count)})</dt><dd>{toman(total)} تومان</dd></div>
            <div className="flex justify-between font-bold text-neutral-900"><dt>جمع سبد خرید</dt><dd>{toman(payable)} تومان</dd></div>
            {saved > 0 && (
              <div className="flex justify-between text-brand"><dt>سود شما از خرید</dt><dd>{toman(saved)} تومان</dd></div>
            )}
          </dl>
          <Link href="/login" className="mt-4 hidden h-11 w-full place-items-center rounded-lg bg-brand text-sm font-bold text-white lg:grid">
            تایید و تکمیل سفارش
          </Link>
          <p className="mt-3 text-[10px] leading-5 text-neutral-400">
            هزینه ارسال بر اساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود.
          </p>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-14 z-30 flex items-center justify-between gap-3 border-t border-line bg-white p-3 lg:hidden">
        <Link href="/login" className="grid h-11 flex-1 place-items-center rounded-lg bg-brand text-sm font-bold text-white">تایید و تکمیل سفارش</Link>
        <div className="text-end">
          <p className="text-[10px] text-neutral-500">جمع سبد خرید</p>
          <p className="text-sm font-bold">{toman(payable)} <span className="text-[10px] font-normal">تومان</span></p>
        </div>
      </div>
    </div>
  );
}
