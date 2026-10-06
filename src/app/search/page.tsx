import type { Metadata } from "next";
import { products, searchProducts } from "@/data/products";
import { ProductListing, type SortId } from "@/components/product/ProductListing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { faNum } from "@/lib/format";

type Props = { searchParams: Promise<{ q?: string; sort?: string; fast?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `جستجوی «${q}»` : "همه کالاها",
    robots: { index: false, follow: true },
  };
}

const validSorts: SortId[] = ["relevant", "best", "rating", "cheap", "expensive", "discount"];

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", sort, fast } = await searchParams;
  const items = q ? searchProducts(q) : products;
  const initialSort = validSorts.includes(sort as SortId) ? (sort as SortId) : "relevant";
  const title = q ? `نتایج جستجو برای «${q}»` : "همه کالاها";

  return (
    <div className="container-x pb-6">
      <Breadcrumbs items={[{ name: title, href: "/search" }]} />
      <h1 className="mb-4 text-base font-extrabold text-neutral-900">
        {title} <span className="text-xs font-normal text-muted">({faNum(items.length)} کالا)</span>
      </h1>
      <ProductListing key={`${q}-${sort}-${fast}`} items={items} initialSort={initialSort} initialFast={fast === "1"} />
    </div>
  );
}
