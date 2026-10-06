import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Info, MessageCircle, ShieldCheck, Star, Store, Truck } from "lucide-react";
import { byCategory, finalPrice, getProduct, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Gallery } from "@/components/product/Gallery";
import { ColorPicker } from "@/components/product/ColorPicker";
import { AddToCart } from "@/components/product/AddToCart";
import { Carousel } from "@/components/product/Carousel";
import { ProductCard } from "@/components/product/ProductCard";
import { Price } from "@/components/ui/Price";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { faNum, toman } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const description = `خرید ${p.title} با قیمت ${toman(finalPrice(p))} تومان${p.discount ? ` و ${faNum(p.discount)}٪ تخفیف` : ""}. ${p.specs.map(([k, v]) => `${k}: ${v}`).join("، ")}`;
  return {
    title: p.title,
    description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { type: "website", title: p.title, description, url: `/product/${p.slug}`, images: p.images.map((url) => ({ url, alt: p.title })) },
  };
}

const reviews = [
  { name: "کاربر فروشگاه", date: "۱۲ مهر ۱۴۰۵", rate: 5, text: "کیفیت ساخت عالی و دقیقاً مطابق توضیحات. بسته‌بندی هم خیلی تمیز بود." },
  { name: "مریم", date: "۸ مهر ۱۴۰۵", rate: 4, text: "نسبت به قیمتش خرید خوبیه. ارسال سریع انجام شد." },
  { name: "علی", date: "۲ مهر ۱۴۰۵", rate: 5, text: "برای بار دوم خرید کردم و باز هم راضی بودم." },
];

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = byCategory(p.category).filter((x) => x.id !== p.id);
  const inStock = p.stock > 0;

  return (
    <div className="container-x pb-24 lg:pb-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          image: p.images,
          sku: String(p.id),
          brand: { "@type": "Brand", name: p.brand },
          category: cat.title,
          description: p.specs.map(([k, v]) => `${k}: ${v}`).join("، "),
          aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
          offers: {
            "@type": "Offer",
            url: `${siteConfig.url}/product/${p.slug}`,
            priceCurrency: "IRR",
            price: finalPrice(p) * 10,
            availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }}
      />
      <Breadcrumbs
        items={[
          { name: cat.title, href: `/category/${cat.slug}` },
          { name: p.brand, href: `/product/${p.slug}` },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr_300px] lg:gap-8">
        <Gallery images={p.images} title={p.title} />

        <div className="min-w-0">
          <Link href={`/category/${cat.slug}`} className="text-xs font-medium text-accent">
            {p.brand} / {cat.title}
          </Link>
          <h1 className="mt-2 text-base leading-8 font-extrabold text-neutral-900 sm:text-lg">{p.title}</h1>
          <p className="ltr-num mt-1 text-start text-[11px] text-neutral-400">{p.enTitle}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 border-b border-line pb-4 text-xs text-neutral-600">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {faNum(p.rating.toFixed(1))}
              <span className="text-neutral-400">({faNum(p.reviews)})</span>
            </span>
            <a href="#reviews" className="flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-neutral-700">
              <MessageCircle className="size-3.5" />
              {faNum(reviews.length)} دیدگاه
            </a>
          </div>

          <div className="mt-4 space-y-5">
            {p.colors && <ColorPicker colors={p.colors} />}
            <div>
              <p className="mb-2 text-sm font-bold text-neutral-800">ویژگی‌ها</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {p.specs.slice(0, 3).map(([k, v]) => (
                  <li key={k} className="rounded-lg bg-surface p-2.5">
                    <p className="text-[11px] text-neutral-500">{k}</p>
                    <p className="mt-0.5 text-xs font-bold text-neutral-800">{v}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex gap-2 rounded-lg border border-line p-3 text-[11px] leading-5 text-neutral-500">
              <Info className="size-4 shrink-0 text-neutral-400" />
              امکان برگشت کالا در گروه {cat.title} با دلیل «انصراف از خرید» تنها در صورتی مورد قبول است که کالا بدون استفاده و پلمب باشد.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface/40 p-4 lg:sticky lg:top-32">
          <p className="text-sm font-bold text-neutral-800">فروشنده</p>
          <ul className="mt-3 space-y-3 border-b border-line pb-4 text-xs text-neutral-700">
            <li className="flex items-center gap-2">
              <Store className="size-5 text-brand" strokeWidth={1.6} />
              {siteConfig.name}
              <span className="ms-auto rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">عملکرد عالی</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-neutral-500" strokeWidth={1.6} />
              گارانتی اصالت و سلامت فیزیکی کالا
            </li>
            <li className="flex items-center gap-2">
              <Truck className="size-5 text-accent" strokeWidth={1.6} />
              {p.fastShip ? "ارسال سریع، تحویل فردا" : "ارسال از ۲ روز کاری آینده"}
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-neutral-500" strokeWidth={1.6} />
              {inStock ? `موجود در انبار (${faNum(p.stock)} عدد)` : "ناموجود"}
            </li>
          </ul>
          <div className="my-4">
            <Price product={p} size="lg" />
          </div>
          <div className="hidden lg:block">
            <AddToCart slug={p.slug} disabled={!inStock} />
          </div>
        </aside>
      </div>

      <div className="mt-10 max-w-4xl">
        <div className="space-y-8">
          <section id="specs" aria-labelledby="specs-title">
            <h2 id="specs-title" className="mb-3 inline-block border-b-2 border-brand pb-2 text-sm font-extrabold text-neutral-900">مشخصات</h2>
            <dl className="divide-y divide-line rounded-xl border border-line">
              {p.specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-4 p-3 text-xs sm:grid-cols-[180px_1fr]">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-medium text-neutral-800">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="reviews" aria-labelledby="reviews-title">
            <h2 id="reviews-title" className="mb-3 inline-block border-b-2 border-brand pb-2 text-sm font-extrabold text-neutral-900">دیدگاه‌ها</h2>
            <ul className="divide-y divide-line">
              {reviews.map((r) => (
                <li key={r.name} className="py-4">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="rounded bg-emerald-500 px-1.5 py-0.5 font-bold text-white">{faNum(r.rate)}.۰</span>
                    <span className="text-neutral-600">{r.name}</span>
                    <span>·</span>
                    <span>{r.date}</span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-neutral-700">{r.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-10 rounded-2xl border border-line p-4">
          <SectionTitle title="کالاهای مشابه" href={`/category/${cat.slug}`} />
          <Carousel className="gap-0 divide-x divide-line">
            {related.map((r) => (
              <div key={r.id} className="w-40 shrink-0 snap-start sm:w-48">
                <ProductCard product={r} variant="slide" />
              </div>
            ))}
          </Carousel>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-14 z-30 flex items-center gap-3 border-t border-line bg-white p-3 lg:hidden">
        <div className="w-1/2">
          <AddToCart slug={p.slug} disabled={!inStock} />
        </div>
        <div className="flex-1">
          <Price product={p} />
        </div>
      </div>
    </div>
  );
}
