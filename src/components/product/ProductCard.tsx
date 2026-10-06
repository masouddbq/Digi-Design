import Image from "next/image";
import Link from "next/link";
import { Star, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { Price } from "@/components/ui/Price";
import { cn, faNum } from "@/lib/format";

type Props = { product: Product; variant?: "grid" | "slide"; priority?: boolean };

export function ProductCard({ product: p, variant = "grid", priority }: Props) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className={cn(
        "group relative flex h-full flex-col bg-white p-3 transition-shadow duration-300 hover:z-10 hover:shadow-soft",
        variant === "slide" && "rounded-xl",
      )}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-lg bg-surface">
        <Image
          src={p.images[0]}
          alt={p.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {p.stock <= 3 && (
          <span className="absolute bottom-1.5 start-1.5 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-brand backdrop-blur">
            تنها {faNum(p.stock)} عدد در انبار
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        {p.fastShip && (
          <span className="mb-1 flex items-center gap-1 text-[10px] text-accent">
            <Truck className="size-3.5" />
            ارسال سریع
          </span>
        )}
        <h3 className="line-clamp-2 min-h-10 text-xs leading-5 text-neutral-700">{p.title}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-neutral-600">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {faNum(p.rating.toFixed(1))}
        </div>
        <div className="mt-auto pt-2">
          <Price product={p} />
        </div>
      </div>
    </Link>
  );
}
