# Vercel Environment Variables Kurulumu (SQLite)

## Vercel 404 Hatasını Çözmek İçin Gerekli Adımlar

### 1. Vercel Dashboard'a Giriş
- [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
- Projenizi seçin (my-app)

### 2. Environment Variables Ekleme
Aşağıdaki environment variables'ları ekleyin:

#### Settings > Environment Variables bölümünde:

```bash
# Zorunlu Environment Variables (SQLite):
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=your-super-secret-key-here-change-this-to-something-unique
NEXTAUTH_URL=https://your-vercel-url.vercel.app
JWT_SECRET=your-jwt-secret-key-here-make-it-unique
NODE_ENV=production
SKIP_ENV_VALIDATION=1

# Opsiyonel Environment Variables:
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

### 3. SQLite Database Kurulumu (Vercel İçin)

#### SQLite Vercel'de Nasıl Çalışır:
- SQLite dosyası her deployment'ta yeniden oluşturulur
- Versiyon kontrolünde `prisma/dev.db` dosyası bulunmalı
- Production için otomatik migration çalışır

#### Gerekli Ayarlar:

1. **Local SQLite dosyasını commit edin**:
```bash
# Veritabanını oluşturun
npx prisma db push

# SQLite dosyasını git'e ekleyin
git add prisma/dev.db
git commit -m "Add SQLite database file for Vercel"
git push
```

2. **Prisma Generate için Build Script**:
   - Bu ayar zaten `package.json`'da mevcut
   - Vercel otomatik olarak `prisma generate` çalıştırır

### 4. Vercel Build Commands (Otomatik)

Vercel aşağıdaki komutları otomatik çalıştırır:
```bash
npm install
npx prisma generate
npm run build
```

### 5. Deployment Sonrası Kontrol

Deployment tamamlandıktan sonra:

1. Vercel dashboard'da "Deployments" sekmesini kontrol edin
2. En son deployment'ın başarılı olduğunu doğrulayın
3. Build logs'ları kontrol edin
4. Sitenizi ziyaret edin

### 6. Sorun Giderme

#### Eğer hala 404 hatası alıyorsanız:

1. **Vercel Function Logs**:
   - Dashboard > Functions > View Function Logs
   - SQLite connection hatalarını kontrol edin

2. **Environment Variables Doğrulama**:
   - `DATABASE_URL=file:./prisma/dev.db` olduğunu kontrol edin
   - Production, Preview ve Development için aynı değerlerin olduğunu doğrulayın

3. **Redeploy (Önemli)**:
   - Settings > General > "Redeploy" butonuna basın
   - "Use existing build cache" seçeneğini **KAPATIN**
   - Bu SQLite dosyasının yeniden upload edilmesini sağlar

4. **Database Dosyası Kontrol**:
   - Repository'de `prisma/dev.db` dosyasının mevcut olduğunu kontrol edin
   - Dosya boyutunun 0 byte olmadığını doğrulayın

### 7. SQLite Vercel Deployment Özellikleri

#### ✅ Avantajlar:
- Kurulum gerektirmez
- Ücretsiz
- Hızlı başlatma
- Kolay deployment

#### ⚠️ Dikkat Edilecekler:
- Her deployment'ta database sıfırlanır
- Test verileri kaybolur
- Concurrent connections sınırlı

#### 🔄 Production için Öneri:
Eğer production'da veri kalıcılığı istiyorsanız:
- Vercel Postgres (ücretli)
- PlanetScale (ücretli)
- Neon.tech (ücretsiz plan mevcut)

### 8. Test Verilerini Her Deployment'ta Eklemek

`package.json`'da build script'ini güncelleyin:
```json
{
  "scripts": {
    "postbuild": "npx prisma db seed"
  }
}
```

### 9. Hızlı Kontrol Komutu

Local'de test etmek için:
```bash
# Database'i sıfırla ve test verilerini ekle
npx prisma db push --force-reset
npx prisma db seed

# Build'i test et
npm run build
```

---

**Not**: SQLite ile Vercel deployment'ı çok daha basit! Sadece environment variables'ları ekleyip redeploy yapmanız yeterli. Database dosyası otomatik olarak repository'den alınır. 