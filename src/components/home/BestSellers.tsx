import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { bestSellers } from "@/data/products";
import { Carousel } from "@/components/product/Carousel";
import { faNum } from "@/lib/format";

export function BestSellers() {
  const cols: (typeof bestSellers)[] = [];
  for (let i = 0; i < bestSellers.length; i += 3) cols.push(bestSellers.slice(i, i + 3));

  return (
    <section aria-labelledby="best-title" className="rounded-2xl border border-line p-4">
      <h2 id="best-title" className="mb-3 flex items-center gap-1.5 text-base font-extrabold text-neutral-900 sm:text-lg">
        <Flame className="size-5 text-amber-500" />
        پرفروش‌ترین کالاها
      </h2>
      <Carousel className="gap-0">
        {cols.map((col, ci) => (
          <ul key={ci} className="w-[85%] shrink-0 snap-start sm:w-1/2 lg:w-1/4">
            {col.map((p, ri) => (
              <li key={p.id}>
                <Link href={`/product/${p.slug}`} className="flex items-center gap-3 px-2 py-3 hover:bg-surface/70">
                  <Image src={p.images[0]} alt={p.title} width={80} height={80} className="size-20 shrink-0 rounded-lg object-cover" />
                  <span className="text-2xl font-black text-accent">{faNum(ci * 3 + ri + 1)}</span>
                  <span className="line-clamp-2 flex-1 border-b border-line pb-3 text-xs leading-5 text-neutral-700">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </Carousel>
    </section>
  );
}
