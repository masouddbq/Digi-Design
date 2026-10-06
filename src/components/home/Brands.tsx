import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { brands } from "@/data/content";

export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="rounded-2xl border border-line p-4">
      <h2 id="brands-title" className="mb-4 flex items-center justify-center gap-1.5 text-base font-extrabold text-neutral-900 sm:text-lg">
        <BadgeCheck className="size-5 text-amber-500" />
        محبوب‌ترین برندها
      </h2>
      <ul className="no-scrollbar flex gap-0 overflow-x-auto">
        {brands.map((b) => (
          <li key={b} className="shrink-0 border-e border-line last:border-e-0">
            <Link
              href={`/search?q=${encodeURIComponent(b)}`}
              className="grid h-16 w-28 place-items-center text-sm font-black tracking-tight text-neutral-400 grayscale transition hover:text-neutral-800 sm:w-32"
            >
              {b}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
