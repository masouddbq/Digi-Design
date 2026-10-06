import { img } from "./categories";

export const heroSlides = [
  {
    id: 1,
    eyebrow: "جشنواره پاییزه",
    title: "تا ۴۰٪ تخفیف کالای دیجیتال",
    text: "گوشی، لپ‌تاپ و لوازم جانبی با ارسال رایگان",
    href: "/category/digital",
    image: img("1505740420928-5e560c06d30e", 900),
    from: "#0f172a",
    to: "#334155",
  },
  {
    id: 2,
    eyebrow: "کالکشن جدید",
    title: "استایل تازه برای فصل جدید",
    text: "پوشاک، کفش و اکسسوری از برندهای محبوب",
    href: "/category/fashion",
    image: img("1542291026-7eec264c27ff", 900),
    from: "#9f1239",
    to: "#f43f5e",
  },
  {
    id: 3,
    eyebrow: "درخشش هر روز",
    title: "بدلیجات و زیورآلات خاص",
    text: "گردنبند، دستبند و انگشتر با ضمانت کیفیت",
    href: "/category/jewelry",
    image: img("1599643478518-a784e5dc4c8f", 900),
    from: "#78350f",
    to: "#d97706",
  },
  {
    id: 4,
    eyebrow: "سوپرمارکت",
    title: "خرید روزانه، ارسال همان روز",
    text: "میوه تازه، قهوه، عسل و کالاهای اساسی",
    href: "/category/supermarket",
    image: img("1610832958506-aa56368176cf", 900),
    from: "#14532d",
    to: "#16a34a",
  },
];

export const promoBanners = [
  { title: "هدفون و هندزفری", sub: "تا ۲۰٪ تخفیف", href: "/category/accessories", image: img("1583394838336-acd977736f90", 500), tint: "#fde68a" },
  { title: "مراقبت پوست", sub: "محصولات اورجینال", href: "/category/beauty", image: img("1556228578-8c89e6adf883", 500), tint: "#fbcfe8" },
  { title: "ساعت و اکسسوری", sub: "کالکشن ۱۴۰۵", href: "/category/jewelry", image: img("1523275335684-37898b6baf30", 500), tint: "#bfdbfe" },
  { title: "دکوراسیون خانه", sub: "ارسال رایگان", href: "/category/home", image: img("1507473885765-e6ed057f782c", 500), tint: "#bbf7d0" },
];

export const wideBanners = [
  { title: "قهوه‌ات رو تازه دم کن", sub: "دانه قهوه عربیکا با ۱۳٪ تخفیف", href: "/product/arabica-coffee-beans", image: img("1559056199-641a0ac8b55e", 800), from: "#451a03", to: "#92400e" },
  { title: "گیمرها، آماده‌اید؟", sub: "دسته و کیبورد گیمینگ", href: "/category/digital", image: img("1606144042614-b2417e99c4e3", 800), from: "#1e1b4b", to: "#4338ca" },
];

export const brands = [
  "سامسونگ", "اپل", "شیائومی", "سونی", "نایکی", "لاجیتک", "کاسیو", "زارا", "انکر", "شانل", "ایکیا", "لاوازا",
];

export const stories = [
  { title: "پیشنهاد ویژه", image: img("1607082348824-0a96f2a4b9da", 160) },
  { title: "کالکشن پاییز", image: img("1445205170230-053b83016050", 160) },
  { title: "بدلیجات", image: img("1611591437281-460bfbe1220a", 160) },
  { title: "کیف زنانه", image: img("1584917865442-de89df76afd3", 160) },
  { title: "آرایشی", image: img("1586495777744-4413f21062fa", 160) },
  { title: "گجت‌ها", image: img("1546868871-7041f2a55e12", 160) },
  { title: "دکور", image: img("1555041469-a586c61ea9bc", 160) },
  { title: "صبحانه", image: img("1587049352846-4a222e784d38", 160) },
  { title: "کتانی", image: img("1600185365483-26d7a4cc7519", 160) },
  { title: "عینک", image: img("1511499767150-a48a237f0083", 160) },
];

export const posts = [
  { slug: "choose-phone", title: "راهنمای خرید گوشی میان‌رده در سال ۱۴۰۵", image: img("1498049794561-7780e7231661", 600), tag: "راهنمای خرید" },
  { slug: "autumn-style", title: "۱۰ ترفند ساده برای استایل پاییزی", image: img("1483985988355-763728e1935b", 600), tag: "مد و پوشاک" },
  { slug: "healthy-breakfast", title: "صبحانه سالم؛ چه بخوریم و چه نخوریم؟", image: img("1490818387583-1baba5e638af", 600), tag: "سلامت" },
  { slug: "skin-routine", title: "روتین مراقبت پوست برای مبتدی‌ها", image: img("1522335789203-aabd1fc54bc9", 600), tag: "زیبایی" },
];
