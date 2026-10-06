"use client";

import { useEffect, useState } from "react";
import { faNum } from "@/lib/format";

const pad = (n: number) => faNum(String(n).padStart(2, "0"));

function left() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const s = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export function Countdown({ light }: { light?: boolean }) {
  const [t, setT] = useState<number[] | null>(null);

  useEffect(() => {
    setT(left());
    const id = setInterval(() => setT(left()), 1000);
    return () => clearInterval(id);
  }, []);

  const cell = light ? "bg-white text-brand" : "bg-brand text-white";

  return (
    <div className="ltr-num flex items-center gap-1 text-xs font-bold" aria-label="زمان باقی‌مانده">
      {(t ?? [0, 0, 0]).map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className={light ? "text-white" : "text-brand"}>:</span>}
          <span className={`grid size-7 place-items-center rounded-md ${cell}`}>{t ? pad(v) : "--"}</span>
        </span>
      ))}
    </div>
  );
}
