import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/format";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} - صفحه اصلی`} className={cn("flex items-center gap-1.5", className)}>
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-brand" />
        <path d="M9 12h14l-1.4 9.2a2 2 0 0 1-2 1.8h-7.2a2 2 0 0 1-2-1.8z" fill="white" />
        <path d="M12.5 12a3.5 3.5 0 0 1 7 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-xl font-black tracking-tight text-brand">{siteConfig.shortName}</span>
    </Link>
  );
}
