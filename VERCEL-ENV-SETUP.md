# Vercel Environment Variables Kurulumu

## Vercel 404 Hatasını Çözmek İçin Gerekli Adımlar

### 1. Vercel Dashboard'a Giriş
- [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
- Projenizi seçin (my-app)

### 2. Environment Variables Ekleme
Aşağıdaki environment variables'ları ekleyin:

#### Settings > Environment Variables bölümünde:

```bash
# Zorunlu Environment Variables:
DATABASE_URL=postgresql://username:password@hostname:port/database_name
NEXTAUTH_SECRET=your-super-secret-key-here-change-this
NEXTAUTH_URL=https://your-vercel-url.vercel.app
JWT_SECRET=your-jwt-secret-key-here
NODE_ENV=production
SKIP_ENV_VALIDATION=1

# Opsiyonel Environment Variables:
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

### 3. PostgreSQL Database Kurulumu (Ücretsiz Seçenekler)

#### Seçenek 1: Vercel Postgres (Önerilen)
1. Vercel Dashboard'da projenizi seçin
2. Storage sekmesine gidin
3. "Create Database" > "Postgres" seçin
4. Database oluşturduktan sonra connection string'i alın
5. DATABASE_URL olarak ekleyin

#### Seçenek 2: Neon (Ücretsiz)
1. [Neon.tech](https://neon.tech) hesabı oluşturun
2. Yeni database oluşturun
3. Connection string'i kopyalayın
4. DATABASE_URL olarak ekleyin

#### Seçenek 3: Aiven (Ücretsiz)
1. [Aiven.io](https://aiven.io) hesabı oluşturun
2. PostgreSQL service oluşturun
3. Connection string'i alın

### 4. Deployment Sonrası Kontrol

Deployment tamamlandıktan sonra:

1. Vercel dashboard'da "Deployments" sekmesini kontrol edin
2. En son deployment'ın başarılı olduğunu doğrulayın
3. Sitenizi ziyaret edin

### 5. Sorun Giderme

#### Eğer hala 404 hatası alıyorsanız:

1. **Vercel Logs Kontrol**:
   - Dashboard > Functions > View Function Logs
   - Hata mesajlarını kontrol edin

2. **Environment Variables Doğrulama**:
   - Tüm gerekli değişkenlerin eklendiğini kontrol edin
   - Production, Preview ve Development için aynı değerlerin olduğunu doğrulayın

3. **Redeploy**:
   - Settings > General > "Redeploy" butonuna basın
   - "Use existing build cache" seçeneğini kapatın

### 6. Örnek DATABASE_URL Formatları

```bash
# PostgreSQL Format:
DATABASE_URL="postgresql://username:password@hostname:port/database_name?sslmode=require"

# Neon Format:
DATABASE_URL="postgresql://username:password@hostname/database_name?sslmode=require"

# Vercel Postgres Format (otomatik oluşturulur):
DATABASE_URL="postgres://username:password@hostname:port/database_name?sslmode=require"
```

### 7. Deployment Tamamlandıktan Sonra

Database migration'ları çalıştırmak için Vercel'de:

1. Vercel CLI ile:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

2. Veya Vercel dashboard'da Functions > Serverless Functions bölümünden database migration endpoint'ini çağırın

---

**Not**: Bu adımları takip ettikten sonra, site normal şekilde çalışmaya başlamalıdır. Herhangi bir sorun yaşarsanız, Vercel support ile iletişime geçebilirsiniz. 