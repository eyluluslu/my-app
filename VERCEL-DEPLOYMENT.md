# 🚀 Vercel Deployment Rehberi

## 🔧 Environment Variables Ayarları

Vercel dashboard'unda şu environment variable'ları ekleyin:

### 1. Database URL
```
DATABASE_URL=postgresql://username:password@your-postgres-host:5432/your-database
```

### 2. Authentication Secrets
```
NEXTAUTH_SECRET=your-very-secure-random-string-min-32-chars
NEXTAUTH_URL=https://your-app-name.vercel.app
JWT_SECRET=your-jwt-secret-key-min-32-chars
```

## 📝 Deployment Adımları

### 1. GitHub Repository'yi Bağlayın
- Vercel dashboard'a gidin
- "New Project" butonuna tıklayın
- GitHub repository'nizi seçin

### 2. Build Settings
```bash
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 3. Environment Variables Ekleyin
- Project Settings > Environment Variables
- Yukarıdaki tüm variables'ı ekleyin
- Production, Preview, Development için hepsini seçin

### 4. Database Setup (PostgreSQL)
- Vercel Postgres kullanın VEYA
- External PostgreSQL provider (Neon, Supabase, etc.)

### 5. İlk Deployment Sonrası
```bash
# Database migrate
npx prisma db push

# Seed data (opsiyonel)
npm run seed
```

## 🐛 Yaygın Hatalar ve Çözümleri

### 404 NOT_FOUND Hatası
1. Environment variables'ların doğru set edildiğini kontrol edin
2. Database connection string'inin doğru olduğunu kontrol edin
3. `export const dynamic = 'force-dynamic'` satırının sayfalarda olduğunu kontrol edin

### Database Connection Hatası
1. DATABASE_URL'nin doğru format'ta olduğunu kontrol edin
2. PostgreSQL database'inin erişilebilir olduğunu kontrol edin
3. Connection string'de special karakterler varsa URL encode edin

### Build Hatası
1. All dependencies installed: `npm install`
2. Prisma client generated: `npx prisma generate`
3. No TypeScript errors (if using TS)

## 🔑 Güvenlik Notları

- Asla production secrets'ları commit etmeyin
- Environment variables'ları güvenli tutun
- Database connection'ları encrypted olsun
- NEXTAUTH_SECRET ve JWT_SECRET en az 32 karakter olmalı

## 📞 Debug İpuçları

### Vercel Logs
```bash
vercel logs your-deployment-url
```

### Function Logs
- Vercel dashboard > Functions tab
- Real-time logs'u inceleyin

### Database Connection Test
```javascript
// Test database connection
console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 20) + '...')
```

## ✅ Deployment Checklist

- [ ] Environment variables set
- [ ] Database connection working
- [ ] Build successful locally
- [ ] No console errors
- [ ] All pages loading
- [ ] Authentication working
- [ ] Database queries working

## 🎯 Son Adımlar

1. Custom domain bağlayın (opsiyonel)
2. SSL certificate otomatik aktif
3. CDN ve caching otomatik
4. Performance monitoring setup

Deployment başarılı olduktan sonra site `https://your-app-name.vercel.app` adresinde yayında olacak! 🚀 

## Hızlı Deployment Adımları

### 1. Repository Hazırlığı
```bash
# Projeyi GitHub'a push edin (eğer henüz yapmadıysanız)
git add .
git commit -m "Vercel deployment için hazırlandı"
git push origin main
```

### 2. Vercel'de Proje Oluşturma
1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Framework olarak "Next.js" seçili olduğundan emin olun

### 3. Environment Variables Ayarları
Vercel dashboard'da **Environment Variables** bölümünde şu değişkenleri ekleyin:

```
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=your-very-secure-secret-key-here-32-chars-min
JWT_SECRET=another-very-secure-jwt-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
NODE_ENV=production
SKIP_ENV_VALIDATION=1
```

**ÖNEMLİ:** 
- `NEXTAUTH_SECRET` ve `JWT_SECRET` en az 32 karakter olmalı
- `NEXTAUTH_URL` gerçek domain adresiniz olmalı
- SQLite yerine PostgreSQL kullanmak için DATABASE_URL'i değiştirin

### 4. PostgreSQL Database (Önerilen)
SQLite yerine PostgreSQL kullanın:

1. [Neon.tech](https://neon.tech) veya [Supabase](https://supabase.com) üzerinden ücretsiz PostgreSQL database oluşturun
2. Connection string'i alın
3. Environment Variables'da DATABASE_URL'i güncelleyin:
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

### 5. Build Ayarları
Vercel'de build komutları otomatik ayarlanır:
```
Build Command: npm run build
Install Command: npm install
Output Directory: .next
```

### 6. Domain Ayarları
1. Deploy edildikten sonra Vercel size otomatik domain verir
2. Custom domain eklemek isterseniz "Domains" sekmesinden ekleyebilirsiniz

## 404 Hatası Çözümü

Eğer 404 hatası alıyorsanız:

### Çözüm 1: Environment Variables
1. Vercel dashboard'da Environment Variables kontrol edin
2. Eksik olan değişkenleri ekleyin
3. **Redeploy** yapın

### Çözüm 2: Database Bağlantısı
1. PostgreSQL kullanın (SQLite yerine)
2. Database connection string'i test edin
3. SSL connection gerekli olabilir

### Çözüm 3: Manual Redeploy
1. Vercel dashboard'a gidin
2. Deployments sekmesine tıklayın
3. En son deployment'ın yanındaki "..." menüsünden "Redeploy" seçin

### Çözüm 4: Build Logs Kontrol
1. Failed deployment'a tıklayın
2. Build logs'u inceleyin
3. Hata mesajlarını kontrol edin

## Database Kurulumu (Production)

### PostgreSQL için:
```bash
# Schema'yı deploy edin
npx prisma db push

# Veya migration'ları çalıştırın
npx prisma migrate deploy
```

### Seed Data:
```bash
npm run seed
```

## Environment Variables Detayı

### Gerekli Variables:
- `DATABASE_URL`: Database bağlantı string'i
- `NEXTAUTH_SECRET`: Authentication için güvenlik anahtarı
- `JWT_SECRET`: JWT token'lar için güvenlik anahtarı
- `NEXTAUTH_URL`: Uygulamanızın tam URL'i

### Opsiyonel Variables:
- `NODE_ENV`: production (otomatik ayarlanır)
- `SKIP_ENV_VALIDATION`: 1 (validasyon hatalarını atlar)

## Troubleshooting

### Build Hatası:
```bash
# Local'de test edin
npm run build

# Hata varsa düzeltin ve tekrar push edin
```

### Database Hatası:
```bash
# Prisma client'ı yeniden generate edin
npx prisma generate

# Database schema'sını güncelle
npx prisma db push
```

### Static Generation Hatası:
- Tüm sayfalar server-side render ediliyor
- `export const dynamic = 'force-dynamic'` eklendi

## Deployment Sonrası Kontrol

1. **Ana sayfa** çalışıyor mu?
2. **Login/Register** sayfaları çalışıyor mu?
3. **Admin panel** erişilebilir mi?
4. **Database** bağlantısı çalışıyor mu?

## Support

Sorun devam ederse:
1. Build logs'u kontrol edin
2. Environment variables'ı doğrulayın
3. PostgreSQL database kullanmayı deneyin
4. [Vercel support](https://vercel.com/support) ile iletişime geçin

---

**Not:** Bu proje Next.js 15 ve React 19 kullanıyor. Güncel sürümler kullandığınızdan emin olun. 