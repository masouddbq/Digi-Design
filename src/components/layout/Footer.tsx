import Link from "next/link";
import { BadgeCheck, CreditCard, Headset, RotateCcw, Truck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { faNum } from "@/lib/format";
import { BackToTop } from "./BackToTop";

const services = [
  { icon: Truck, label: "ارسال سریع" },
  { icon: Headset, label: "پشتیبانی ۲۴ ساعته" },
  { icon: CreditCard, label: "پرداخت در محل" },
  { icon: RotateCcw, label: "۷ روز ضمانت بازگشت" },
  { icon: BadgeCheck, label: "ضمانت اصل بودن کالا" },
];

const columns = [
  {
    title: `با ${siteConfig.shortName}`,
    links: [["اتاق خبر", "/"], ["فروش در فروشگاه", "/"], ["فرصت‌های شغلی", "/"], ["تماس با ما", "/"], ["درباره ما", "/"]],
  },
  {
    title: "خدمات مشتریان",
    links: [["پاسخ به پرسش‌های متداول", "/"], ["رویه‌های بازگرداندن کالا", "/"], ["شرایط استفاده", "/"], ["حریم خصوصی", "/"], ["گزارش باگ", "/"]],
  },
  {
    title: "راهنمای خرید",
    links: [["نحوه ثبت سفارش", "/"], ["رویه ارسال سفارش", "/"], ["شیوه‌های پرداخت", "/"], ["پیگیری سفارش", "/cart"]],
  },
];

function Social() {
  const icons = [
    { href: siteConfig.social.instagram, label: "اینستاگرام", d: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" },
    { href: siteConfig.social.telegram, label: "تلگرام", d: "M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8.1c.4-.3-.1-.5-.6-.2L6.4 13 1.6 11.5c-1-.3-1.1-1 .2-1.5L20.5 2.8c.9-.3 1.7.2 1.4 1.5z" },
    { href: siteConfig.social.x, label: "ایکس", d: "M18.2 2.2h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.2h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7 4.1H5l12 16z" },
    { href: siteConfig.social.linkedin, label: "لینکدین", d: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13.1H3.6V9h3.5v11.5z" },
  ];
  return (
    <div className="flex items-center gap-4">
      {icons.map((i) => (
        <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" aria-label={i.label} className="text-neutral-400 transition hover:text-neutral-700">
          <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
            <path d={i.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="mt-12 border-t border-line bg-white pb-20 lg:pb-0">
      <div className="container-x py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <BackToTop />
        </div>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
          <span>تلفن پشتیبانی: <span className="ltr-num">{siteConfig.phone}</span></span>
          <span className="hidden text-line sm:inline">|</span>
          <span>{faNum(7)} روز هفته، {faNum(24)} ساعته پاسخگوی شما هستیم</span>
        </p>

        <ul className="mt-8 grid grid-cols-3 gap-y-6 border-y border-line py-6 sm:grid-cols-5">
          {services.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center text-[11px] text-neutral-600">
              <span className="grid size-12 place-items-center rounded-full bg-surface text-brand">
                <Icon className="size-6" strokeWidth={1.5} />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="mb-3 text-sm font-bold text-neutral-800">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-neutral-500 hover:text-neutral-800">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-bold text-neutral-800">همراه ما باشید!</p>
              <Social />
            </div>
            <form action="/" className="space-y-2">
              <label htmlFor="newsletter" className="text-sm font-bold text-neutral-800">با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید</label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="ایمیل شما"
                  className="h-10 flex-1 rounded-lg bg-surface px-3 text-xs outline-none focus:ring-1 focus:ring-neutral-300"
                />
                <button className="h-10 rounded-lg bg-neutral-200 px-4 text-xs font-bold text-neutral-600 hover:bg-neutral-300">ثبت</button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 lg:grid-cols-[1fr_auto]">
          <div className="text-xs leading-6 text-neutral-500">
            <h2 className="mb-2 text-sm font-bold text-neutral-800">
              {siteConfig.name}، {siteConfig.tagline}
            </h2>
            <input id="about-more" type="checkbox" className="peer sr-only" />
            <p className="line-clamp-2 peer-checked:line-clamp-none">
              {siteConfig.description} یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در
              مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد. در {siteConfig.shortName} می‌توانید از میان دسته‌های
              {" "}{categories.map((c) => c.title).join("، ")} خرید کنید و سفارش خود را در سریع‌ترین زمان ممکن تحویل بگیرید.
            </p>
            <label htmlFor="about-more" className="mt-1 inline-block cursor-pointer text-accent peer-checked:hidden">
              مشاهده بیشتر
            </label>
          </div>
          <div className="flex gap-3">
            {["نماد اعتماد", "ساماندهی", "اتحادیه"].map((t) => (
              <div key={t} className="grid size-20 place-items-center rounded-lg border border-line text-center text-[10px] text-neutral-400">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-[11px] text-neutral-400">
        تمامی حقوق این وب‌سایت متعلق به {siteConfig.name} است. © {faNum(1405)}
      </p>
    </footer>
  );
}
