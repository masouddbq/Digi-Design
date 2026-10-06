import Image from "next/image";
import Link from "next/link";
import { promoBanners, wideBanners } from "@/data/content";
import { Tilt } from "@/components/ui/Tilt";

export function PromoBanners() {
  return (
    <section aria-label="بنرهای تبلیغاتی" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {promoBanners.map((b) => (
        <Tilt key={b.title} className="rounded-2xl">
          <Link
            href={b.href}
            className="relative flex h-28 items-center overflow-hidden rounded-2xl sm:h-36"
            style={{ background: `linear-gradient(135deg, ${b.tint}, #ffffff)` }}
          >
            <div className="relative z-10 ps-4">
              <p className="text-[13px] font-extrabold text-neutral-900 sm:text-base">{b.title}</p>
              <p className="mt-1 text-[11px] text-neutral-600">{b.sub}</p>
            </div>
            <div className="absolute -end-3 bottom-0 aspect-square h-[92%] overflow-hidden rounded-full shadow-lg" style={{ transform: "translateZ(30px)" }}>
              <Image src={b.image} alt={b.title} fill sizes="160px" className="object-cover" />
            </div>
          </Link>
        </Tilt>
      ))}
    </section>
  );
}

export function WideBanners() {
  return (
    <section aria-label="بنرهای ویژه" className="grid gap-3 md:grid-cols-2 lg:gap-4">
      {wideBanners.map((b) => (
        <Link
          key={b.title}
          href={b.href}
          className="group relative flex h-32 items-center overflow-hidden rounded-2xl sm:h-44"
          style={{ background: `linear-gradient(110deg, ${b.from}, ${b.to})` }}
        >
          <div className="relative z-10 max-w-[55%] ps-6 text-white">
            <p className="text-base font-black sm:text-xl">{b.title}</p>
            <p className="mt-1.5 text-[11px] text-white/75 sm:text-xs">{b.sub}</p>
          </div>
          <Image
            src={b.image}
            alt={b.title}
            width={360}
            height={360}
            sizes="(max-width: 768px) 45vw, 300px"
            className="absolute end-0 h-full w-[45%] object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ maskImage: "linear-gradient(to right, black 55%, transparent)", WebkitMaskImage: "linear-gradient(to right, black 55%, transparent)" }}
          />
        </Link>
      ))}
    </section>
  );
}
