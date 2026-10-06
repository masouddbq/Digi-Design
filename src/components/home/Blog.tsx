import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Blog() {
  return (
    <section aria-labelledby="blog-title">
      <SectionTitle title="خواندنی‌ها" href="/" />
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
        {posts.map((p) => (
          <article key={p.slug} className="w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-line lg:w-auto">
            <Link href="/" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 256px, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-medium text-accent">{p.tag}</span>
                <h3 className="mt-1 line-clamp-2 text-xs leading-5 font-medium text-neutral-800">{p.title}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
