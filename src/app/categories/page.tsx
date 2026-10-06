import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export const metadata: Metadata = {
  title: "دسته‌بندی کالاها",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="container-x py-4">
      <h1 className="mb-4 text-base font-extrabold text-neutral-900">دسته‌بندی کالاها</h1>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => (
          <section key={c.slug} className="overflow-hidden rounded-2xl border border-line">
            <Link href={`/category/${c.slug}`} className="flex items-center gap-3 p-3" style={{ backgroundColor: c.tint }}>
              <span className="relative size-12 overflow-hidden rounded-xl bg-white">
                <Image src={c.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <h2 className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                <CategoryIcon name={c.icon} className="size-4 text-brand" />
                {c.title}
              </h2>
              <ChevronLeft className="ms-auto size-5 text-neutral-400" />
            </Link>
            <div className="flex flex-wrap gap-1.5 p-3">
              {[...new Set(c.children.flatMap((g) => g.items))].map((it) => (
                <Link
                  key={it}
                  href={`/search?q=${encodeURIComponent(it)}`}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-neutral-600 hover:border-neutral-300"
                >
                  {it}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
