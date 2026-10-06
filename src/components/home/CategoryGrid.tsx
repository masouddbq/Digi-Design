import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section aria-labelledby="cat-title">
      <h2 id="cat-title" className="mb-5 text-center text-base font-extrabold text-neutral-900 sm:text-lg">
        خرید بر اساس دسته‌بندی
      </h2>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-8">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} className="group flex flex-col items-center gap-2 text-center">
              <span className="relative size-[68px] overflow-hidden rounded-full sm:size-24" style={{ backgroundColor: c.tint }}>
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="96px"
                  className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="text-[11px] leading-4 text-neutral-700 sm:text-xs">{c.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
