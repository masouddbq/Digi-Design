import Link from "next/link";
import { siteConfig } from "@/config/site";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: siteConfig.shortName, href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all.map((i) => ({ name: i.name, url: `${siteConfig.url}${i.href}` })))} />
      <nav aria-label="مسیر صفحه" className="no-scrollbar overflow-x-auto py-3">
        <ol className="flex items-center gap-1.5 text-[11px] whitespace-nowrap text-neutral-500">
          {all.map((i, idx) => (
            <li key={i.href} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-neutral-300">/</span>}
              {idx === all.length - 1 ? (
                <span aria-current="page" className="text-neutral-700">{i.name}</span>
              ) : (
                <Link href={i.href} className="hover:text-neutral-800">{i.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
