export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  specs: string | null;
  price: number | null;
  imageUrl: string | null;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  mediaType: string;
  sortOrder: number;
  createdAt: Date;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Setting {
  id: number;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  whatsapp: string;
  showBlogViews: boolean;
  showPrices: boolean;
}

export interface User {
  id: number;
  email: string;
  role: string;
  manageBlogs: boolean;
  manageProducts: boolean;
  manageGallery: boolean;
  manageMessages: boolean;
  manageSettings: boolean;
  createdAt: Date;
}

// ----------------------------------------------------
// STATIC INITIAL DATA STORE
// ----------------------------------------------------

export let staticSettings: Setting = {
  id: 1,
  phone: "+90 555 123 4567",
  email: "info@nivaart.com",
  address: "NivaArt Plaza, No:12, Kadıköy, İstanbul",
  workingHours: "Pazartesi - Cumartesi: 09:00 - 19:00",
  whatsapp: "+90 555 123 4567",
  showBlogViews: true,
  showPrices: true,
};

export let staticHomepageContents: Record<string, string> = {
  hero_title: "Güneş Enerjisinden Maksimum Verim Alın",
  hero_subtitle: "Profesyonel güneş paneli temizliği, saf su sistemleri ve uzman danışmanlık hizmetleri ile enerji üretim verimliliğinizi %30'a kadar artırın.",
  about_text: "NivaArt Kurumsal Platformu olarak, yenilenebilir enerji yatırımlarınızın değerini koruyor ve performansını zirveye taşıyoruz. Özel 0 TDS saf su deiyonizasyon teknolojimiz ve alanında uzman ekibimizle, güneş panellerinize zarar vermeden en inatçı kirleri ve toz tabakalarını arındırıyoruz. Enerji santrallerinizin ömrünü uzatıyor, verimlilik kayıplarını minimuma indiriyoruz.",
  hero_image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&auto=format&fit=crop&q=80",
};

export let staticBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "gunes-panellerinde-kirlenme-ve-verim-kaybi",
    title: "Güneş Panellerinde Kirlenme ve Verim Kaybı",
    summary: "Güneş panellerinin kirlenmesi enerji üretimini nasıl etkiler? Düzenli temizliğin önemi nedir?",
    content: `### Güneş Panelleri Neden Kirlenir?
Güneş panelleri dış mekanlarda kurulu oldukları için toz, polen, kuş pisliği, endüstriyel kurum ve yağmur lekeleri gibi çevresel faktörlere sürekli maruz kalırlar. Bu birikintiler panellerin üzerinde ince bir katman oluşturarak güneş ışınlarının fotovoltaik hücrelere ulaşmasını engeller.

### Kirlenmenin Verimliliğe Etkisi
Yapılan araştırmalara göre, düzenli temizlenmeyen güneş panellerinde kirlilik derecesine bağlı olarak **%5 ile %30 arasında verim kaybı** yaşanmaktadır. Özellikle tarım alanlarına yakın bölgelerde tozlanma, sanayi bölgelerinde ise kurum birikmesi verim kaybını ciddi seviyelere taşır.

### Profesyonel Temizliğin Önemi
Sıradan musluk suyu ile yapılan temizlikler suyun sertliğine bağlı olarak kireç lekelerine yol açabilir. Bu sebeple temizlik işlemlerinde saf su ve güneş panellerine özel tasarlanmış hassas fırçalar kullanılmalıdır.

*   Saf su kullanımı kireçlenmeyi önler.
*   Özel fırçalar panel camını çizmez.
*   Düzenli temizlik yatırımınızın geri dönüş süresini kısaltır.`,
    imageUrl: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=60",
    published: true,
    views: 142,
    createdAt: new Date("2026-05-10T10:00:00Z"),
    updatedAt: new Date("2026-05-10T10:00:00Z"),
  },
  {
    id: 2,
    slug: "saf-su-ile-panel-temizliginin-onemi",
    title: "0 TDS Saf Su ile Temizliğin Avantajları",
    summary: "Normal musluk suyu neden panellere zarar verir? Deiyonize saf suyun farkı nedir?",
    content: `### Normal Su Neden Zararlıdır?
Normal şebeke sularında yüksek oranda kireç, klor ve çeşitli mineraller bulunur. Bu suyla yıkanan paneller kuruduğunda, yüzeylerinde kireç lekeleri ve mineral tortuları kalır. Bu lekeler zamanla kalıcı hale gelerek ışık geçirgenliğini azaltır ve kalıcı verim kaybına neden olur.

### 0 TDS Saf Su Nedir?
TDS (Total Dissolved Solids), suyun içinde çözünmüş katı madde miktarını gösterir. Özel deiyonizasyon filtrelerimizden geçirilerek elde edilen 0 TDS saf su, tamamen minerallerden arındırılmıştır.

### Saf Su ile Temizliğin Avantajları
1. **Tortu Bırakmaz:** Kuruduğunda yüzeyde kireç veya leke bırakmaz, tamamen pürüzsüz bir cam yüzey sağlar.
2. **Daha Geç Kirlenir:** Antistatik özelliği sayesinde toz ve polenlerin panel yüzeyine yapışmasını geciktirir.
3. **Kimyasalsız Koruma:** Deterjan veya sabun kullanılmadığı için çevre dostudur ve panellerin sızdırmazlık contalarına zarar vermez.`,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=60",
    published: true,
    views: 89,
    createdAt: new Date("2026-05-18T14:30:00Z"),
    updatedAt: new Date("2026-05-18T14:30:00Z"),
  },
  {
    id: 3,
    slug: "robotik-temizleme-sistemleri",
    title: "GES Projelerinde Robotik Temizlik Çözümleri",
    summary: "Geniş arazi ve endüstriyel çatı projelerinde robotik sistemlerin sağladığı hız ve güvenlik avantajları.",
    content: `### Neden Robotik Temizlik?
Geniş kapasiteli güneş enerjisi santrallerinde (GES) insan gücüyle yapılan temizlikler hem çok uzun zaman alır hem de iş güvenliği riskleri taşır. Robotik temizleme çözümlerimiz bu süreci hızlandırır ve optimize eder.

### Robotik Sistemlerimizin Özellikleri
- **Hassas Basınç Kontrolü:** Panel yüzeyine uygulanan baskıyı otomatik ayarlayarak mikro çatlak oluşumunu engeller.
- **Yüksek Eğim Yeteneği:** 30 dereceye kadar eğimli çatılarda ve arazi kurulumlarında güvenle çalışabilir.
- **Hızlı Operasyon:** Günde 2-3 MWp kapasiteye kadar panel temizliğini tek bir robotla tamamlayabilir.

### Yatırımcıya Faydaları
Süreçlerin kısalması operasyon maliyetlerini düşürür ve santralin üretim kesintisi yaşamadan maksimum verimle çalışmaya devam etmesini sağlar.`,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60",
    published: true,
    views: 215,
    createdAt: new Date("2026-06-02T09:15:00Z"),
    updatedAt: new Date("2026-06-02T09:15:00Z"),
  }
];

export let staticProducts: Product[] = [
  {
    id: 1,
    slug: "profesyonel-solar-panel-temizleme-solusyonu",
    name: "Profesyonel Solar Panel Temizleme Solüsyonu",
    description: "Güneş panellerinin hassas cam yüzeyleri için özel olarak formüle edilmiş, tortu ve iz bırakmayan saf su ile uyumlu konsantre temizlik solüsyonu.",
    specs: "Miktar: 5 Litre\nUygulama: 1/50 Seyreltme Oranı\nÖzellik: Antistatik formül, toz tutmayı geciktirir",
    price: 1250.0,
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=60",
    inStock: true,
    createdAt: new Date("2026-04-20T12:00:00Z"),
    updatedAt: new Date("2026-04-20T12:00:00Z"),
  },
  {
    id: 2,
    slug: "0-tds-saf-su-deiyonizasyon-cihazi",
    name: "0 TDS Saf Su Deiyonizasyon Cihazı",
    description: "Şebeke suyunu anında sıfır iletkenlikte saf suya dönüştüren mobil deiyonizasyon tüp ve filtre seti. Saha temizlikleri için mükemmel taşınabilir çözüm.",
    specs: "Kapasite: Saatte 300 Litre\nFiltre Tipi: Mixbed Reçine\nGiriş-Çıkış: Hızlı Bağlantı Rekorları",
    price: 18500.0,
    imageUrl: "https://images.unsplash.com/photo-1585832770485-e38e53f1d9d5?w=800&auto=format&fit=crop&q=60",
    inStock: true,
    createdAt: new Date("2026-04-25T15:00:00Z"),
    updatedAt: new Date("2026-04-25T15:00:00Z"),
  },
  {
    id: 3,
    slug: "antistatik-panel-koruyucu-sprey",
    name: "Antistatik Panel Koruyucu Sprey",
    description: "Temizlik sonrasında panel camına uygulanan, toz, polen ve su lekelerinin yapışmasını engelleyen nano-teknolojik antistatik sprey.",
    specs: "Miktar: 1 Litre\nEtki Süresi: 6 Ay\nUygulama: Püskürtme ve mikrofiber bez ile yayma",
    price: 850.0,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=60",
    inStock: true,
    createdAt: new Date("2026-05-02T10:30:00Z"),
    updatedAt: new Date("2026-05-02T10:30:00Z"),
  }
];

export let staticGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Arazi Tipi GES Temizliği",
    description: "10 MW kapasiteli arazi tipi güneş enerjisi santrali saf su ile temizleme çalışması.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
    videoUrl: null,
    mediaType: "IMAGE",
    sortOrder: 1,
    createdAt: new Date("2026-05-15T08:00:00Z"),
  },
  {
    id: 2,
    title: "Endüstriyel Çatı GES Robotik Temizlik",
    description: "Fabrika çatısı üzerindeki GES projemizin uzaktan kumandalı robotla temizlenmesi.",
    imageUrl: "https://images.unsplash.com/photo-1548613053-2200874c20d7?w=800&auto=format&fit=crop&q=60",
    videoUrl: null,
    mediaType: "IMAGE",
    sortOrder: 2,
    createdAt: new Date("2026-05-22T08:00:00Z"),
  },
  {
    id: 3,
    title: "Panel Yüzey Kontrolü & Muayene",
    description: "Temizlik öncesi ve sonrası drone ile termal kamera yardımıyla panel hücre kontrolü.",
    imageUrl: "https://images.unsplash.com/photo-1620038650444-2455b79fa238?w=800&auto=format&fit=crop&q=60",
    videoUrl: null,
    mediaType: "IMAGE",
    sortOrder: 3,
    createdAt: new Date("2026-05-30T08:00:00Z"),
  }
];

export let staticUsers: User[] = [
  {
    id: 1,
    email: "admin@admin.com",
    role: "ADMIN",
    manageBlogs: true,
    manageProducts: true,
    manageGallery: true,
    manageMessages: true,
    manageSettings: true,
    createdAt: new Date("2026-01-01T12:00:00Z"),
  }
];

export let staticSubmissions: ContactSubmission[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@gmail.com",
    phone: "0532 123 45 67",
    subject: "GES Temizlik Teklifi",
    message: "500 kW çatı tipi santralimiz için saf su ile temizlik teklifi almak istiyoruz.",
    isRead: false,
    createdAt: new Date("2026-06-10T11:20:00Z"),
  },
  {
    id: 2,
    name: "Mehmet Demir",
    email: "mehmet@demirenerji.com",
    phone: "0505 987 65 43",
    subject: "Solüsyon Tedariği",
    message: "Toplu solar temizleme solüsyonu alımı yapmak istiyoruz. Fiyat listenizi iletebilir misiniz?",
    isRead: true,
    createdAt: new Date("2026-06-08T09:45:00Z"),
  }
];
