# Vercel 404 Hatası Çözüm Rehberi

## 🚨 Hata: 404: NOT_FOUND

### 1. Acil Çözüm - Environment Variables Kontrolü

Vercel Dashboard'da **MUTLAKA** bu environment variables'ları ekleyin:

```bash
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=livkors-super-secret-key-2025-change-this
NEXTAUTH_URL=https://your-app-name.vercel.app
JWT_SECRET=livkors-jwt-secret-key-2025-change-this
NODE_ENV=production
SKIP_ENV_VALIDATION=1
```

### 2. Adım Adım Çözüm

#### Adım 1: Environment Variables Ekleme
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projenizi seçin
2. **Settings** → **Environment Variables**
3. Yukarıdaki tüm değişkenleri ekleyin
4. **Production**, **Preview** ve **Development** için hepsini işaretleyin

#### Adım 2: Redeploy (ÖNEMLİ!)
1. **Settings** → **General**
2. **"Redeploy"** butonuna basın
3. **"Use existing build cache"** seçeneğini **KAPATIN**
4. **"Redeploy"** butonuna basın

#### Adım 3: Test Sayfalarını Kontrol Edin
Deploy tamamlandıktan sonra bu sayfaları test edin:
- `https://your-app.vercel.app/` (Ana sayfa)
- `https://your-app.vercel.app/test-page` (Test sayfası)

### 3. Debug İçin Test Sayfaları

Aşağıdaki sayfalar debug için oluşturuldu:

#### `/test-page` - Minimal Test Sayfası
- Database bağımlılığı yok
- Sadece environment bilgilerini gösterir
- Bu sayfa çalışıyorsa Vercel deployment'ı OK

#### `/not-found` - 404 Debug Sayfası
- Environment variables'ları gösterir
- Timestamp ile debug bilgileri
- Ana sayfaya ve test sayfasına linkler

### 4. Sorun Giderme Kontrol Listesi

#### ✅ Kontrol 1: Build Logs
1. Vercel Dashboard → **Deployments**
2. En son deployment'a tıklayın
3. **"View Function Logs"** linkine tıklayın
4. Hata mesajlarını kontrol edin

#### ✅ Kontrol 2: Environment Variables
Vercel Dashboard'da **tüm** environment variables'ların şu şekilde olduğunu kontrol edin:
- ✅ DATABASE_URL: `file:./prisma/dev.db`
- ✅ NEXTAUTH_SECRET: (set)
- ✅ NEXTAUTH_URL: (your-app.vercel.app)
- ✅ JWT_SECRET: (set)
- ✅ NODE_ENV: `production`
- ✅ SKIP_ENV_VALIDATION: `1`

#### ✅ Kontrol 3: Domain Ayarları
1. **Settings** → **Domains**
2. Custom domain varsa, kaldırın
3. Sadece `.vercel.app` domain'i ile test edin

### 5. Muhtemel Hatalar ve Çözümleri

#### Hata 1: "Environment variable not found"
**Çözüm**: Environment variables'ları ekledikten sonra **Use existing build cache**'i KAPATARAK redeploy yapın.

#### Hata 2: "Database connection failed"
**Çözüm**: `DATABASE_URL=file:./prisma/dev.db` olarak ayarlayın ve SQLite dosyasının repository'de mevcut olduğunu kontrol edin.

#### Hata 3: "Functions timeout"
**Çözüm**: `vercel.json` dosyasından `functions` konfigürasyonunu kaldırdık, bu sorunu çözmeli.

### 6. Alternatif Çözümler

#### Seçenek 1: Minimal Deployment
Eğer sorun devam ederse, minimal bir deployment yapın:
1. Ana sayfayı `/test-page` ile değiştirin
2. Database bağımlılıklarını kaldırın
3. Step by step özellik ekleyin

#### Seçenek 2: Different Database
SQLite yerine Vercel Postgres kullanın:
1. Vercel Dashboard → **Storage** → **Create Database**
2. **Postgres** seçin
3. Connection string'i `DATABASE_URL` olarak ekleyin

### 7. Son Kontrol Komutu

Deploy sonrası şu URL'leri test edin:
```
https://your-app.vercel.app/
https://your-app.vercel.app/test-page
https://your-app.vercel.app/api/settings
```

### 8. Hata Devam Ederse

1. **Vercel Support**: [vercel.com/support](https://vercel.com/support)
2. **GitHub Issues**: Repository'de yeni issue açın
3. **Logs**: Function logs'ları screenshot alın

---

**📝 Not**: Bu rehberdeki adımları sırasıyla takip edin. Environment variables ekleme ve cache'siz redeploy yapma genellikle sorunu çözer. 