import Image from "next/image";
import Link from "next/link";
import { stories } from "@/data/content";

export function Stories() {
  return (
    <section aria-label="استوری‌ها" className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 py-1 lg:mx-0 lg:px-0">
      {stories.map((s) => (
        <Link key={s.title} href="/incredible-offers" className="flex w-[72px] shrink-0 flex-col items-center gap-1.5">
          <span className="rounded-full bg-gradient-to-tr from-amber-400 via-brand to-fuchsia-600 p-[2px]">
            <span className="block rounded-full bg-white p-[2px]">
              <Image src={s.image} alt={s.title} width={64} height={64} className="size-16 rounded-full object-cover" />
            </span>
          </span>
          <span className="line-clamp-1 text-center text-[11px] text-neutral-700">{s.title}</span>
        </Link>
      ))}
    </section>
  );
}
