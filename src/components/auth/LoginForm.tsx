"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { faNum } from "@/lib/format";

export function LoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const valid = /^(09|۰۹)[\d۰-۹]{9}$/.test(phone);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-line p-6 sm:p-8">
      <div className="relative mb-6 flex justify-center">
        {step === "otp" && (
          <button type="button" aria-label="بازگشت" onClick={() => setStep("phone")} className="absolute start-0 top-1">
            <ChevronRight className="size-5 text-neutral-600" />
          </button>
        )}
        <Logo />
      </div>

      {step === "phone" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) setStep("otp");
          }}
        >
          <h1 className="text-base font-extrabold text-neutral-900">ورود | ثبت‌نام</h1>
          <p className="mt-3 text-xs text-neutral-600">سلام! لطفا شماره موبایل خود را وارد کنید</p>
          <input
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\s/g, ""))}
            maxLength={11}
            aria-label="شماره موبایل"
            placeholder="09xxxxxxxxx"
            className="mt-3 h-12 w-full rounded-lg border border-line bg-surface px-3 text-center text-sm tracking-widest outline-none focus:border-accent focus:bg-white"
          />
          <button disabled={!valid} className="mt-5 h-11 w-full rounded-lg bg-brand text-sm font-bold text-white transition disabled:opacity-40">
            ورود
          </button>
          <p className="mt-4 text-center text-[11px] leading-5 text-neutral-500">
            ورود شما به معنای پذیرش شرایط {siteConfig.shortName} و قوانین حریم‌خصوصی است
          </p>
        </form>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-base font-extrabold text-neutral-900">کد تایید را وارد کنید</h1>
          <p className="mt-3 text-xs text-neutral-600">
            کد تایید برای شماره <span className="ltr-num font-bold">{faNum(phone)}</span> پیامک شد
          </p>
          <div dir="ltr" className="mt-4 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <input
                key={i}
                inputMode="numeric"
                maxLength={1}
                aria-label={`رقم ${i + 1}`}
                onInput={(e) => {
                  const next = e.currentTarget.nextElementSibling as HTMLInputElement | null;
                  if (e.currentTarget.value && next) next.focus();
                }}
                className="size-12 rounded-lg border border-line bg-surface text-center text-lg font-bold outline-none focus:border-accent focus:bg-white"
              />
            ))}
          </div>
          <button className="mt-6 h-11 w-full rounded-lg bg-brand text-sm font-bold text-white">تایید</button>
          <p className="mt-4 text-center text-[11px] text-neutral-500">{faNum(2)}:۰۰ تا ارسال مجدد کد</p>
        </form>
      )}
    </div>
  );
}
