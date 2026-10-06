import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { amazingProducts } from "@/data/products";
import { Carousel } from "@/components/product/Carousel";
import { Price } from "@/components/ui/Price";
import { Countdown } from "./Countdown";

function Cube() {
  return (
    <div className="cube-scene grid place-items-center py-2" aria-hidden>
      <div className="cube" style={{ "--s": "64px" } as React.CSSProperties}>
        <span>٪</span>
        <span>٪</span>
        <span>٪</span>
        <span>٪</span>
        <span />
        <span />
      </div>
    </div>
  );
}

export function AmazingOffers() {
  return (
    <section aria-labelledby="amazing-title" className="overflow-hidden rounded-2xl bg-brand p-1.5 sm:p-2">
      <Carousel className="items-stretch gap-1 sm:gap-1.5">
        <div className="flex w-32 shrink-0 snap-start flex-col items-center justify-center gap-3 px-2 py-4 text-center text-white sm:w-40">
          <h2 id="amazing-title" className="text-lg leading-7 font-black sm:text-xl">
            پیشنهاد
            <br />
            شگفت‌انگیز
          </h2>
          <Cube />
          <Countdown light />
          <Link href="/incredible-offers" className="flex items-center gap-0.5 text-xs font-medium">
            مشاهده همه
            <ChevronLeft className="size-4" />
          </Link>
        </div>

        {amazingProducts.map((p, i) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className={`flex w-40 shrink-0 snap-start flex-col bg-white p-3 transition hover:opacity-95 sm:w-44 ${i === 0 ? "rounded-s-xl" : ""}`}
          >
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-surface">
              <Image src={p.images[0]} alt={p.title} fill sizes="176px" className="object-cover" />
            </div>
            <h3 className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-neutral-700">{p.title}</h3>
            <div className="mt-auto pt-2">
              <Price product={p} />
            </div>
          </Link>
        ))}

        <Link
          href="/incredible-offers"
          className="flex w-36 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-e-xl bg-white text-xs font-medium text-neutral-700"
        >
          <span className="grid size-12 place-items-center rounded-full border border-accent text-accent">
            <ChevronLeft className="size-6" />
          </span>
          مشاهده همه
        </Link>
      </Carousel>
    </section>
  );
}
