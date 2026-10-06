import type { Metadata } from "next";
import { amazingProducts } from "@/data/products";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductListing } from "@/components/product/ProductListing";
import { Countdown } from "@/components/home/Countdown";

export const metadata: Metadata = {
  title: "پیشنهادهای شگفت‌انگیز",
  description: `تخفیف‌های شگفت‌انگیز روزانه ${siteConfig.name} روی کالای دیجیتال، پوشاک، زیورآلات، زیبایی و سوپرمارکت.`,
  alternates: { canonical: "/incredible-offers" },
};

export default function IncredibleOffersPage() {
  return (
    <div className="container-x pb-6">
      <Breadcrumbs items={[{ name: "شگفت‌انگیزها", href: "/incredible-offers" }]} />
      <div className="relative mb-5 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl bg-brand p-5 text-white sm:p-8">
        <div aria-hidden className="absolute -start-10 -top-10 size-40 rounded-full bg-white/10" />
        <div aria-hidden className="absolute end-1/3 -bottom-16 size-48 rounded-full bg-white/10" />
        <div className="relative">
          <h1 className="text-xl font-black sm:text-3xl">پیشنهادهای شگفت‌انگیز</h1>
          <p className="mt-1 text-xs text-white/80">تخفیف‌های محدود امروز، فقط تا پایان شب</p>
        </div>
        <div className="relative">
          <Countdown light />
        </div>
      </div>
      <ProductListing items={amazingProducts} initialSort="discount" />
    </div>
  );
}
