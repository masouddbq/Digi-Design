import { HeroSlider } from "@/components/home/HeroSlider";
import { Stories } from "@/components/home/Stories";
import { QuickLinks } from "@/components/home/QuickLinks";
import { AmazingOffers } from "@/components/home/AmazingOffers";
import { PromoBanners, WideBanners } from "@/components/home/Banners";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CategoryPicks } from "@/components/home/CategoryPicks";
import { BestSellers } from "@/components/home/BestSellers";
import { Brands } from "@/components/home/Brands";
import { Blog } from "@/components/home/Blog";
import { Carousel } from "@/components/product/Carousel";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { topRated } from "@/data/products";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="container-x space-y-8 pt-4 lg:space-y-10">
      <h1 className="sr-only">{siteConfig.name} - {siteConfig.tagline}</h1>
      <Stories />
      <HeroSlider />
      <QuickLinks />
      <AmazingOffers />
      <PromoBanners />
      <CategoryGrid />
      <CategoryPicks />
      <WideBanners />
      <Brands />

      <section aria-labelledby="hot-title" className="rounded-2xl border border-line p-4">
        <SectionTitle title="داغ‌ترین چند روز گذشته" href="/search?sort=rating" />
        <Carousel className="gap-0 divide-x divide-line">
          {topRated.map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
              <ProductCard product={p} variant="slide" />
            </div>
          ))}
        </Carousel>
      </section>

      <BestSellers />
      <Blog />
    </div>
  );
}
