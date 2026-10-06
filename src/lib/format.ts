const nf = new Intl.NumberFormat("fa-IR");

export const toman = (n: number) => nf.format(n);

export const faNum = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
