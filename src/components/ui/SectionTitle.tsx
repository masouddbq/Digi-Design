import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function SectionTitle({ title, href, sub }: { title: string; href?: string; sub?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-base font-extrabold text-neutral-900 sm:text-lg">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
      </div>
      {href && (
        <Link href={href} className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-accent hover:opacity-80">
          مشاهده همه
          <ChevronLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
