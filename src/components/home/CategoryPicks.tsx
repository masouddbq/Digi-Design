import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { categories } from "@/data/categories";
import { byCategory } from "@/data/products";

export function CategoryPicks() {
  const picks = categories
    .map((c) => ({ c, items: byCategory(c.slug).slice(0, 4) }))
    .filter((x) => x.items.length >= 4)
    .slice(0, 4);

  return (
    <section aria-labelledby="picks-title" className="overflow-hidden rounded-2xl border border-line">
      <h2 id="picks-title" className="px-4 pt-4 text-base font-extrabold text-neutral-900 sm:text-lg">پیشنهاد بر اساس سلیقه شما</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {picks.map(({ c, items }) => (
          <div key={c.slug} className="border-line p-4 not-last:border-b sm:not-last:border-b-0 sm:[&:nth-child(odd)]:border-e lg:not-last:border-e">
            <p className="font-bold text-neutral-800">{c.title}</p>
            <p className="text-[11px] text-muted">بر اساس بازدیدهای شما</p>
            <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line">
              {items.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="relative aspect-square bg-white p-2">
                  <span className="relative block size-full overflow-hidden rounded-md">
                    <Image src={p.images[0]} alt={p.title} fill sizes="120px" className="object-cover transition-transform duration-500 hover:scale-105" />
                  </span>
                </Link>
              ))}
            </div>
            <Link href={`/category/${c.slug}`} className="mt-3 flex items-center justify-center gap-0.5 text-xs font-medium text-accent">
              مشاهده
              <ChevronLeft className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
