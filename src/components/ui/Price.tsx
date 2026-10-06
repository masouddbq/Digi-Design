import { finalPrice, type Product } from "@/data/products";
import { cn, faNum, toman } from "@/lib/format";

export function DiscountBadge({ value, className }: { value: number; className?: string }) {
  if (!value) return null;
  return (
    <span className={cn("inline-flex h-5 min-w-9 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-white", className)}>
      {faNum(value)}٪
    </span>
  );
}

export function Price({ product, size = "sm" }: { product: Pick<Product, "price" | "discount">; size?: "sm" | "lg" }) {
  const final = finalPrice(product);
  return (
    <div className="flex items-start justify-between gap-2">
      <DiscountBadge value={product.discount} className="mt-0.5" />
      <div className="ms-auto text-end">
        <div className={cn("flex items-center gap-1 font-bold text-neutral-900", size === "lg" ? "text-lg" : "text-[15px]")}>
          {toman(final)}
          <span className="text-[10px] font-normal text-neutral-500">تومان</span>
        </div>
        {product.discount > 0 && (
          <del className="block pe-7 text-[11px] text-neutral-400">{toman(product.price)}</del>
        )}
      </div>
    </div>
  );
}
