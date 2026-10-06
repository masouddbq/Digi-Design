"use client";

import { ChevronUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex h-9 items-center gap-1 rounded-lg border border-line px-3 text-xs text-neutral-600 hover:bg-surface"
    >
      بازگشت به بالا
      <ChevronUp className="size-4" />
    </button>
  );
}
