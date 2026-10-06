import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { byCategory } from "@/data/products";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductListing } from "@/components/product/ProductListing";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  const description = `خرید آنلاین ${cat.title} با بهترین قیمت و ارسال سریع از ${siteConfig.name}. ${cat.children.flatMap((g) => g.items).slice(0, 6).join("، ")}.`;
  return {
    title: `خرید ${cat.title}`,
    description,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title: `خرید ${cat.title}`, description, url: `/category/${cat.slug}`, images: [cat.image] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const cat = getCategory((await params).slug);
  if (!cat) notFound();
  const items = byCategory(cat.slug);

  return (
    <div className="container-x pb-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: cat.title,
          itemListElement: items.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/product/${p.slug}`,
            name: p.title,
          })),
        }}
      />
      <Breadcrumbs items={[{ name: cat.title, href: `/category/${cat.slug}` }]} />

      <div className="mb-5 flex items-center gap-3 rounded-2xl p-4 sm:p-6" style={{ backgroundColor: cat.tint }}>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm">
          <CategoryIcon name={cat.icon} className="size-6" strokeWidth={1.6} />
        </span>
        <div className="min-w-0">
          <h1 className="text-base font-black text-neutral-900 sm:text-xl">{cat.title}</h1>
          <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto">
            {[...new Set(cat.children.flatMap((g) => g.items))].slice(0, 8).map((t) => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-neutral-600 hover:bg-white">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ProductListing items={items} />
    </div>
  );
}
