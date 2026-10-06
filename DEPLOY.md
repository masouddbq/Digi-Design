# راهنمای دپلوی پروژه‌های Next.js

این راهنما برای همین پروژه نوشته شده، اما برای هر پروژه Next.js (App Router) قابل استفاده است.

---

## ۱. پیش‌نیازها

| ابزار | نسخه پیشنهادی | بررسی |
| --- | --- | --- |
| Node.js | ۲۰ یا بالاتر (LTS) | `node -v` |
| npm | ۱۰ یا بالاتر | `npm -v` |
| Git | آخرین نسخه | `git --version` |

## ۲. اجرای محلی و تست بیلد

قبل از هر دپلوی، مطمئن شوید پروژه روی سیستم خودتان بدون خطا بیلد می‌شود:

```bash
npm install        # نصب وابستگی‌ها
npm run dev        # اجرای حالت توسعه روی http://localhost:3123
npm run build      # بیلد production (اگر اینجا خطا بگیرید، روی سرور هم خطا می‌گیرید)
npm run start      # اجرای نسخه production به صورت محلی
```

> نکته: پوشه‌های `node_modules` و `.next` هرگز نباید در Git ثبت شوند (در `.gitignore` آمده‌اند).

---

## ۳. دپلوی روی Vercel (پیشنهادی)

Vercel سازنده Next.js است و همه قابلیت‌ها (بهینه‌سازی تصاویر، SSG، ISR، Edge) را بدون تنظیمات اضافه پشتیبانی می‌کند.

### روش الف: از طریق GitHub (بهترین روش)

۱. یک ریپازیتوری در GitHub بسازید و پروژه را push کنید:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

۲. وارد [vercel.com](https://vercel.com) شوید و با حساب GitHub لاگین کنید.
۳. روی **Add New → Project** کلیک کنید و ریپازیتوری را **Import** کنید.
۴. Vercel به صورت خودکار فریمورک را `Next.js` تشخیص می‌دهد. تنظیمات پیش‌فرض را تغییر ندهید:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
۵. در بخش **Environment Variables** متغیر زیر را اضافه کنید (برای سئو، sitemap و canonical):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

۶. روی **Deploy** کلیک کنید. بعد از ۱ تا ۲ دقیقه سایت روی آدرسی مثل `https://project.vercel.app` بالا می‌آید.

از این به بعد با هر `git push` روی شاخه `main` سایت به صورت خودکار آپدیت می‌شود و برای هر Pull Request یک لینک پیش‌نمایش (Preview) جداگانه ساخته می‌شود.

### روش ب: با Vercel CLI (بدون GitHub)

```bash
npm i -g vercel
vercel login
vercel          # دپلوی پیش‌نمایش
vercel --prod   # دپلوی نهایی
```

### اتصال دامنه اختصاصی

۱. در پنل پروژه به **Settings → Domains** بروید و دامنه را وارد کنید.
۲. رکوردهای DNS را طبق دستور Vercel در پنل دامنه خود ثبت کنید:
   - دامنه اصلی (`example.com`): رکورد `A` به `76.76.21.21`
   - زیردامنه (`www`): رکورد `CNAME` به `cname.vercel-dns.com`
۳. SSL به صورت خودکار و رایگان فعال می‌شود.
۴. مقدار `NEXT_PUBLIC_SITE_URL` را به دامنه جدید تغییر دهید و دوباره Deploy کنید.

---

## ۴. دپلوی روی سرور شخصی (VPS) یا هاست Node.js

### با PM2

```bash
git clone https://github.com/USERNAME/REPO.git && cd REPO
npm ci
npm run build
npm i -g pm2
pm2 start npm --name shop -- start   # روی پورت 3123 (تعریف‌شده در package.json)
pm2 save && pm2 startup
```

### تنظیم Nginx به عنوان Reverse Proxy

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3123;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

برای SSL رایگان: `sudo certbot --nginx -d example.com -d www.example.com`

### با Docker

برای ایمیج سبک، در `next.config.ts` گزینه `output: "standalone"` را اضافه کنید و از این Dockerfile استفاده کنید:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t shop .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://example.com shop
```

---

## ۵. چک‌لیست قبل از انتشار

- [ ] `npm run build` بدون خطا اجرا می‌شود.
- [ ] `NEXT_PUBLIC_SITE_URL` روی دامنه واقعی تنظیم شده است.
- [ ] آدرس‌های `/sitemap.xml` و `/robots.txt` درست باز می‌شوند.
- [ ] سایت در [Google Search Console](https://search.google.com/search-console) ثبت و sitemap معرفی شده است.
- [ ] امتیاز Lighthouse (Performance، SEO، Accessibility) بررسی شده است.
- [ ] اگر از تصاویر یک دامنه خارجی جدید استفاده می‌کنید، آن را در `images.remotePatterns` فایل `next.config.ts` اضافه کرده‌اید.

## ۶. خطاهای رایج

| خطا | علت و راه‌حل |
| --- | --- |
| `Invalid src prop ... hostname is not configured` | دامنه تصویر را به `images.remotePatterns` در `next.config.ts` اضافه کنید. |
| بیلد روی Vercel خطا می‌دهد ولی محلی نه | حروف کوچک و بزرگ نام فایل‌ها را در importها چک کنید (لینوکس به حروف حساس است). |
| `Module not found` | پکیج در `dependencies` نیست؛ `npm install نام-پکیج` و دوباره push کنید. |
| تغییر متغیر محیطی اعمال نمی‌شود | متغیرهای `NEXT_PUBLIC_*` هنگام بیلد خوانده می‌شوند؛ بعد از تغییر، **Redeploy** کنید. |
| خطای Hydration | از `Date.now()`، `Math.random()` یا `localStorage` مستقیم در رندر اولیه استفاده نکنید؛ داخل `useEffect` بخوانید. |
| `listen EACCES: permission denied 0.0.0.0:3000` (ویندوز) | پورت توسط Hyper-V/WSL/Docker رزرو شده است. بازه‌های رزرو را با `netsh interface ipv4 show excludedportrange protocol=tcp` ببینید و در `package.json` پورت دیگری بدهید (مثل `next dev -p 3123`). |
| سایت روی VPS با پورت باز نمی‌شود | فایروال را بررسی کنید (`ufw allow 80,443/tcp`) و Nginx را ری‌استارت کنید. |
