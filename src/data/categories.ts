export type IconName =
  | "Smartphone"
  | "Laptop"
  | "Headphones"
  | "Shirt"
  | "Gem"
  | "Sparkles"
  | "Sofa"
  | "Apple";

export type Category = {
  slug: string;
  title: string;
  icon: IconName;
  image: string;
  tint: string;
  children: { title: string; items: string[] }[];
};

export const img = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const categories: Category[] = [
  {
    slug: "mobile",
    title: "موبایل",
    icon: "Smartphone",
    image: img("1610945415295-d9bbf067e59c", 240),
    tint: "#eef6ff",
    children: [
      { title: "برندهای گوشی", items: ["سامسونگ", "اپل", "شیائومی", "نوکیا", "آنر"] },
      { title: "گوشی بر اساس قیمت", items: ["تا ۵ میلیون", "۵ تا ۱۵ میلیون", "۱۵ تا ۳۰ میلیون", "بالای ۳۰ میلیون"] },
      { title: "تبلت", items: ["تبلت سامسونگ", "آیپد", "تبلت شیائومی"] },
    ],
  },
  {
    slug: "digital",
    title: "کالای دیجیتال",
    icon: "Laptop",
    image: img("1496181133206-80ce9b88a853", 240),
    tint: "#f1f5f9",
    children: [
      { title: "لپ‌تاپ", items: ["لپ‌تاپ گیمینگ", "اولترابوک", "مک‌بوک", "لپ‌تاپ دانشجویی"] },
      { title: "کامپیوتر", items: ["مانیتور", "کیس", "قطعات داخلی", "ماشین‌های اداری"] },
      { title: "صوتی و تصویری", items: ["اسپیکر", "دوربین", "کنسول بازی"] },
    ],
  },
  {
    slug: "accessories",
    title: "لوازم جانبی",
    icon: "Headphones",
    image: img("1505740420928-5e560c06d30e", 240),
    tint: "#fef3f2",
    children: [
      { title: "جانبی موبایل", items: ["قاب و کاور", "شارژر", "کابل", "پاوربانک", "گلس"] },
      { title: "صوتی", items: ["هدفون", "هندزفری بی‌سیم", "اسپیکر بلوتوثی"] },
      { title: "جانبی کامپیوتر", items: ["ماوس", "کیبورد", "هاب USB", "کیف لپ‌تاپ"] },
    ],
  },
  {
    slug: "fashion",
    title: "مد و پوشاک",
    icon: "Shirt",
    image: img("1542291026-7eec264c27ff", 240),
    tint: "#fdf2f8",
    children: [
      { title: "مردانه", items: ["تی‌شرت", "پیراهن", "شلوار", "کفش", "کاپشن"] },
      { title: "زنانه", items: ["مانتو", "پیراهن", "کیف", "کفش", "شال و روسری"] },
      { title: "اکسسوری", items: ["عینک آفتابی", "ساعت", "کمربند", "کوله‌پشتی"] },
    ],
  },
  {
    slug: "jewelry",
    title: "زیورآلات و بدلیجات",
    icon: "Gem",
    image: img("1599643478518-a784e5dc4c8f", 240),
    tint: "#fffbeb",
    children: [
      { title: "زنانه", items: ["گردنبند", "دستبند", "گوشواره", "انگشتر", "سرویس"] },
      { title: "مردانه", items: ["دستبند چرم", "انگشتر", "زنجیر"] },
      { title: "جنس", items: ["استیل", "نقره", "بدلیجات", "طلا روس"] },
    ],
  },
  {
    slug: "beauty",
    title: "زیبایی و سلامت",
    icon: "Sparkles",
    image: img("1585386959984-a4155224a1ad", 240),
    tint: "#f5f3ff",
    children: [
      { title: "آرایشی", items: ["رژ لب", "کرم پودر", "ریمل", "پالت سایه"] },
      { title: "بهداشتی", items: ["مراقبت پوست", "مراقبت مو", "بهداشت دهان"] },
      { title: "عطر", items: ["عطر زنانه", "عطر مردانه", "بادی اسپلش"] },
    ],
  },
  {
    slug: "home",
    title: "خانه و آشپزخانه",
    icon: "Sofa",
    image: img("1555041469-a586c61ea9bc", 240),
    tint: "#ecfdf5",
    children: [
      { title: "دکوراسیون", items: ["مبلمان", "روشنایی", "فرش", "تابلو"] },
      { title: "آشپزخانه", items: ["ظروف", "قهوه‌ساز", "لوازم پخت"] },
      { title: "لوازم خانگی", items: ["جاروبرقی", "اتو", "تصفیه هوا"] },
    ],
  },
  {
    slug: "supermarket",
    title: "سوپرمارکت",
    icon: "Apple",
    image: img("1610832958506-aa56368176cf", 240),
    tint: "#f0fdf4",
    children: [
      { title: "مواد غذایی", items: ["میوه و سبزی", "لبنیات", "خشکبار", "کالای اساسی"] },
      { title: "نوشیدنی", items: ["قهوه", "چای", "آبمیوه"] },
      { title: "صبحانه", items: ["عسل", "مربا", "غلات"] },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
