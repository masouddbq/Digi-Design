import Link from "next/link";
import { BadgePercent, Flame, Gift, LayoutGrid, Package, Star, Zap, Wallet } from "lucide-react";

const links = [
  { href: "/incredible-offers", label: "شگفت‌انگیزها", icon: BadgePercent, color: "#ef394e" },
  { href: "/search?fast=1", label: "ارسال سریع", icon: Zap, color: "#f59e0b" },
  { href: "/search?sort=best", label: "پرفروش‌ها", icon: Flame, color: "#f97316" },
  { href: "/search?sort=rating", label: "محبوب‌ترین‌ها", icon: Star, color: "#eab308" },
  { href: "/category/jewelry", label: "کارت هدیه", icon: Gift, color: "#8b5cf6" },
  { href: "/category/supermarket", label: "خرید عمده", icon: Package, color: "#10b981" },
  { href: "/login", label: "کیف پول", icon: Wallet, color: "#0ea5e9" },
  { href: "/categories", label: "بیشتر", icon: LayoutGrid, color: "#64748b" },
];

export function QuickLinks() {
  return (
    <nav aria-label="دسترسی سریع" className="grid grid-cols-4 gap-y-4 sm:grid-cols-8">
      {links.map(({ href, label, icon: Icon, color }) => (
        <Link key={label} href={href} className="group flex flex-col items-center gap-1.5 text-center">
          <span
            className="grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-14"
            style={{ backgroundColor: `${color}14`, color }}
          >
            <Icon className="size-6" strokeWidth={1.6} />
          </span>
          <span className="text-[11px] text-neutral-700">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
