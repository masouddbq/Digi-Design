"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, House, LayoutGrid, ShoppingCart, BadgePercent } from "lucide-react";
import { useCart } from "@/context/cart";
import { cn, faNum } from "@/lib/format";

const items = [
  { href: "/", label: "خانه", icon: House },
  { href: "/categories", label: "دسته‌بندی", icon: LayoutGrid },
  { href: "/cart", label: "سبد خرید", icon: ShoppingCart },
  { href: "/incredible-offers", label: "تخفیف‌ها", icon: BadgePercent },
  { href: "/login", label: "حساب من", icon: CircleUserRound },
];

export function MobileNav() {
  const path = usePathname();
  const { count } = useCart();

  return (
    <nav
      aria-label="منوی موبایل"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid h-14 grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn("relative flex h-full flex-col items-center justify-center gap-0.5 text-[10px]", active ? "font-bold text-neutral-900" : "text-neutral-500")}
              >
                <Icon className="size-[22px]" strokeWidth={active ? 2 : 1.5} />
                {label}
                {href === "/cart" && count > 0 && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-[18px] grid h-4 min-w-4 place-items-center rounded-md bg-brand px-1 text-[9px] font-bold text-white">
                    {faNum(count)}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
