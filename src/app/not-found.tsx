import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-20 text-center">
      <p className="bg-gradient-to-l from-brand to-accent bg-clip-text text-7xl font-black text-transparent">۴۰۴</p>
      <h1 className="mt-4 text-base font-extrabold text-neutral-900">صفحه‌ای که دنبال آن بودید پیدا نشد!</h1>
      <Link href="/" className="mt-6 rounded-lg bg-brand px-6 py-2.5 text-xs font-bold text-white">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
