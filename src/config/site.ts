/**
 * تنظیمات مرکزی فروشگاه.
 * برای تغییر هویت فروشگاه کافی است `activePreset` را عوض کنید
 * یا یک preset جدید بسازید. رنگ‌ها مستقیماً روی متغیرهای CSS اعمال می‌شوند.
 */

export type StorePreset = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  keywords: string[];
  theme: {
    brand: string;
    brandSoft: string;
    accent: string;
  };
};

export const presets = {
  general: {
    name: "فروشگاه نوین",
    shortName: "نوین",
    tagline: "هر آنچه نیاز دارید، با بهترین قیمت",
    description:
      "فروشگاه اینترنتی نوین؛ خرید آنلاین کالای دیجیتال، مد و پوشاک، زیبایی و سلامت، خانه و آشپزخانه و سوپرمارکت با ارسال سریع و ضمانت اصالت کالا.",
    keywords: ["فروشگاه اینترنتی", "خرید آنلاین", "تخفیف", "ارسال سریع"],
    theme: { brand: "#ef394e", brandSoft: "#fff1f3", accent: "#19bfd3" },
  },
  jewelry: {
    name: "گالری درخشان",
    shortName: "درخشان",
    tagline: "زیورآلات و بدلیجات خاص برای هر روز",
    description: "خرید آنلاین بدلیجات، زیورآلات استیل و نقره، ساعت و اکسسوری با ارسال سریع.",
    keywords: ["بدلیجات", "زیورآلات", "گردنبند", "دستبند"],
    theme: { brand: "#b8860b", brandSoft: "#fdf8ec", accent: "#7c3aed" },
  },
  mobile: {
    name: "موبایل‌لند",
    shortName: "موبایل‌لند",
    tagline: "لوازم جانبی موبایل و کامپیوتر اورجینال",
    description: "خرید قاب، شارژر، هندزفری، پاوربانک و لوازم جانبی کامپیوتر با گارانتی اصالت.",
    keywords: ["لوازم جانبی موبایل", "شارژر", "هندزفری", "پاوربانک"],
    theme: { brand: "#2563eb", brandSoft: "#eff6ff", accent: "#f59e0b" },
  },
  fashion: {
    name: "استایل",
    shortName: "استایل",
    tagline: "مد و پوشاک روز با بهترین برندها",
    description: "خرید آنلاین لباس، کفش، کیف و اکسسوری زنانه و مردانه با امکان مرجوعی ۷ روزه.",
    keywords: ["پوشاک", "لباس", "کفش", "مد"],
    theme: { brand: "#111827", brandSoft: "#f3f4f6", accent: "#ec4899" },
  },
  grocery: {
    name: "سبزینه مارکت",
    shortName: "سبزینه",
    tagline: "مواد غذایی تازه، درب منزل شما",
    description: "سوپرمارکت آنلاین؛ خرید میوه، لبنیات، خشکبار و کالاهای اساسی با ارسال همان روز.",
    keywords: ["سوپرمارکت آنلاین", "مواد غذایی", "خرید میوه", "لبنیات"],
    theme: { brand: "#16a34a", brandSoft: "#f0fdf4", accent: "#f97316" },
  },
} satisfies Record<string, StorePreset>;

const activePreset: keyof typeof presets = "general";

export const siteConfig = {
  ...presets[activePreset],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-store.vercel.app",
  locale: "fa_IR",
  phone: "۰۲۱-۹۱۰۰۰۰۰۰",
  email: "info@example.com",
  address: "تهران، خیابان ولیعصر، پلاک ۱۰۰",
  freeShippingThreshold: 500_000,
  social: {
    instagram: "https://instagram.com/",
    telegram: "https://t.me/",
    x: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },
};
