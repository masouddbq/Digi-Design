"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Line = { slug: string; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  ready: boolean;
  qtyOf: (slug: string) => number;
  add: (slug: string) => void;
  dec: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "shop-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback(
    (slug: string) =>
      setLines((ls) =>
        ls.some((l) => l.slug === slug)
          ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l))
          : [...ls, { slug, qty: 1 }],
      ),
    [],
  );

  const dec = useCallback(
    (slug: string) =>
      setLines((ls) =>
        ls.flatMap((l) => (l.slug !== slug ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])),
      ),
    [],
  );

  const remove = useCallback((slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      ready,
      count: lines.reduce((s, l) => s + l.qty, 0),
      qtyOf: (slug) => lines.find((l) => l.slug === slug)?.qty ?? 0,
      add,
      dec,
      remove,
      clear,
    }),
    [lines, ready, add, dec, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
