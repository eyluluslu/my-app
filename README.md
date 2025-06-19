# 🛍️ Livkors E-Commerce Platform

Modern ve kullanıcı dostu bir e-ticaret platformu. Next.js 15.3.2 ile geliştirilmiş, Prisma ORM ve SQLite veritabanı kullanan tam özellikli bir online mağaza sistemi.

## ✨ Özellikler

### 🛒 **E-Ticaret Özellikleri**
- ✅ Ürün kataloğu ve kategori yönetimi
- ✅ Gelişmiş ürün arama ve filtreleme
- ✅ Sepet sistemi ve sipariş yönetimi
- ✅ Kullanıcı profili ve adres yönetimi
- ✅ Responsive tasarım (mobil uyumlu)

### 🎨 **Modern Tasarım**
- ✅ Glassmorphism ve gradient efektleri
- ✅ Animasyonlu banner slider sistemi
- ✅ Profesyonel ürün kartları
- ✅ Modern kategori sayfaları
- ✅ Kullanıcı dostu arayüz

### 👨‍💼 **Admin Paneli**
- ✅ Kapsamlı ürün yönetimi (CRUD)
- ✅ Kategori yönetimi
- ✅ Banner/slider yönetimi
- ✅ Site ayarları düzenleme
- ✅ Kullanıcı yönetimi
- ✅ Logo yükleme sistemi

### 🔐 **Güvenlik & Kullanıcı Yönetimi**
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Rol tabanlı erişim kontrolü (Admin/User)
- ✅ Güvenli oturum yönetimi
- ✅ Şifre hashleme (bcrypt)

## 🚀 Teknolojiler

- **Frontend:** Next.js 15.3.2, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Veritabanı:** SQLite + Prisma ORM
- **Kimlik Doğrulama:** JWT
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Lucide React
- **Image Handling:** Built-in Next.js Image Optimization

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/[kullanici-adi]/livkors-ecommerce
cd livkors-ecommerce
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Veritabanını oluşturun:**
```bash
npx prisma generate
npx prisma db push
```

4. **Seed verilerini ekleyin (opsiyonel):**
```bash
npm run seed
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

6. **Tarayıcıda açın:** [http://localhost:3000](http://localhost:3000)

## 🗄️ Veritabanı Şeması

### Ana Modeller
- **User** - Kullanıcı bilgileri ve kimlik doğrulama
- **Product** - Ürün kataloğu
- **Category** - Ürün kategorileri
- **Cart/CartItem** - Sepet sistemi
- **Order/OrderItem** - Sipariş yönetimi
- **SiteSettings** - Site ayarları
- **HeroBanner** - Ana sayfa banner'ları

## 🔧 Admin Paneli

### Erişim
- URL: `/admin`
- Varsayılan admin hesabı oluşturmak için:

```bash
node scripts/make-admin.js
```

### Admin Özellikleri
- **Dashboard:** Site istatistikleri
- **Ürünler:** Ürün ekleme, düzenleme, silme
- **Kategoriler:** Kategori yönetimi
- **Banner Yönetimi:** Ana sayfa slider'ı
- **Site Ayarları:** Logo, site adı, sosyal medya
- **Kullanıcılar:** Kullanıcı listesi ve yönetimi

## 📱 Sayfa Yapısı

```
/                 # Ana sayfa (slider, öne çıkan ürünler)
/products         # Tüm ürünler
/categories       # Kategori listesi
/categories/[id]  # Kategori sayfası
/cart            # Sepet
/profile         # Kullanıcı profili
/login           # Giriş
/register        # Kayıt
/admin           # Admin paneli
/about           # Hakkımızda
```

## 🎨 Tasarım Özellikleri

### CSS Özelleştirmeleri
- **Glassmorphism efektleri** - Modern şeffaf tasarım
- **Gradient arka planlar** - Renkli geçişler
- **Animasyonlu kartlar** - Hover efektleri
- **Responsive grid sistemi** - Mobil uyumlu
- **Custom scroll animasyonları** - Akıcı geçişler

### Renk Paleti
- **Primary:** Blue-600 to Purple-600 gradient
- **Secondary:** Yellow-400 to Yellow-500
- **Background:** Slate-900 to Slate-800
- **Accent:** Pink-400, Purple-400, Blue-400

## 🔒 Güvenlik

- **JWT Token Authentication**
- **Bcrypt Password Hashing**
- **Role-based Access Control**
- **CSRF Protection**
- **Input Validation**
- **XSS Protection**

## 📊 Performans

- **Next.js Image Optimization**
- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **Code Splitting**
- **Lazy Loading**
- **Optimized Bundle Size**

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm i -g vercel
vercel
```

### Diğer Platformlar
- Netlify
- Railway
- Heroku
- DigitalOcean

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Geliştirici:** [İsim]
- **Email:** [email@example.com]
- **Website:** [https://livkors.com](https://livkors.com)

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projelerden yararlanmıştır:
- Next.js
- Prisma
- Tailwind CSS
- Lucide Icons

---

**⭐ Projeyi beğendiyseniz star vermeyi unutmayın!**
