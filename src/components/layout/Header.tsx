import Link from "next/link";
import { BadgePercent, Flame, Gift, LogIn, MapPin, ShoppingBag, Store, Zap } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { HeaderShell } from "./HeaderShell";
import { SearchBox } from "./SearchBox";
import { CartButton } from "./CartButton";
import { MegaMenu } from "./MegaMenu";
import { siteConfig } from "@/config/site";
import { faNum, toman } from "@/lib/format";

const navLinks = [
  { href: "/incredible-offers", label: "شگفت‌انگیزها", icon: BadgePercent },
  { href: "/category/supermarket", label: "سوپرمارکت", icon: ShoppingBag },
  { href: "/search?fast=1", label: "ارسال سریع", icon: Zap },
  { href: "/search?sort=best", label: "پرفروش‌ترین‌ها", icon: Flame },
  { href: "/category/jewelry", label: "کارت هدیه", icon: Gift },
  { href: "/categories", label: "همه دسته‌ها", icon: Store },
];

export function Header() {
  return (
    <>
      <Link
        href="/incredible-offers"
        className="block bg-gradient-to-l from-brand to-rose-400 py-1.5 text-center text-[11px] font-medium text-white sm:text-xs"
      >
        ارسال رایگان برای سفارش‌های بالای {toman(siteConfig.freeShippingThreshold)} تومان · تا {faNum(40)}٪ تخفیف شگفت‌انگیز
      </Link>
      <HeaderShell
        top={
          <div className="container-x flex h-16 items-center gap-4">
            <Logo className="hidden shrink-0 lg:flex" />
            <div className="flex-1 lg:max-w-[600px]">
              <SearchBox />
            </div>
            <div className="ms-auto hidden items-center gap-3 lg:flex">
              <Link
                href="/login"
                className="flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-xs font-bold text-neutral-800 hover:bg-surface"
              >
                <LogIn className="size-[18px]" strokeWidth={1.7} />
                ورود | ثبت‌نام
              </Link>
              <span className="h-6 w-px bg-line" />
              <CartButton />
            </div>
            <div className="lg:hidden">
              <CartButton />
            </div>
          </div>
        }
        nav={
          <nav aria-label="منوی اصلی" className="container-x flex h-10 items-center gap-5">
            <MegaMenu />
            <span className="h-4 w-px bg-line" />
            <ul className="flex items-center gap-5">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <Link href={href} className="flex items-center gap-1 text-xs text-neutral-600 transition hover:text-neutral-900">
                    <Icon className="size-4 text-neutral-400" strokeWidth={1.7} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" className="ms-auto flex items-center gap-1 text-xs text-neutral-600">
              <MapPin className="size-4 text-amber-500" />
              لطفا شهر خود را انتخاب کنید
            </button>
          </nav>
        }
      />
    </>
  );
}
