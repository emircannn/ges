import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import "dotenv/config";

const getAdapter = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  const dbUrl = new URL(connectionString);
  return new PrismaMariaDb({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || "3306"),
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password || ""),
    database: dbUrl.pathname.replace(/^\//, ""),
  });
};

const prisma = new PrismaClient({
  adapter: getAdapter(),
});

async function main() {
  console.log("Seeding started...");

  // 1. Create Admin Users
  const adminAccounts = [
    { email: "admin@admin.com", password: "admin123" }
  ];

  for (const account of adminAccounts) {
    const existingUser = await prisma.user.findUnique({
      where: { email: account.email }
    });

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(account.password, 10);
      const adminUser = await prisma.user.create({
        data: {
          email: account.email,
          passwordHash: passwordHash,
          role: "ADMIN",
          manageBlogs: true,
          manageProducts: true,
          manageGallery: true,
          manageMessages: true,
          manageSettings: true,
        },
      });
      console.log(`Admin user seeded: ${adminUser.email} (Password: ${account.password})`);
    } else {
      console.log(`Admin user already exists: ${existingUser.email}. Skipping seeding for this user.`);
    }
  }

  // 2. Create Settings
  const settingsCount = await prisma.setting.count();
  if (settingsCount === 0) {
    await prisma.setting.create({
      data: {
        id: 1,
        phone: "+90 555 123 4567",
        email: "info@nivaart.com",
        address: "NivaArt Plaza, No:12, Kadıköy, İstanbul",
        workingHours: "Pazartesi - Cumartesi: 09:00 - 19:00",
        whatsapp: "+90 555 123 4567",
        showBlogViews: true,
        showPrices: true,
      },
    });
    console.log("Default settings seeded.");
  }

  // 3. Create Homepage Content Default Entries
  const defaultHomepageContents = [
    { key: "hero_title", value: "NivaArt Kurumsal Platformu" },
    {
      key: "hero_subtitle",
      value: "Sanat, tasarım ve yaratıcı çözümlerde profesyonel hizmetler. Projelerinize modern ve estetik dokunuşlar katın.",
    },
    {
      key: "about_text",
      value: "NivaArt olarak, kurumsal kimlik, görsel tasarım, dijital sanatlar ve yaratıcı iç mimari çözümler sunmaktayız. Yenilikçi bakış açımız, uzman ekibimiz ve kaliteli işçiliğimiz ile markanızın ve mekanlarınızın değerini artırıyoruz.",
    },
  ];

  for (const content of defaultHomepageContents) {
    await prisma.homepageContent.upsert({
      where: { key: content.key },
      update: {},
      create: content,
    });
  }
  console.log("Homepage content defaults seeded.");

  // 3. Create Sample Blog Post
  const sampleBlogPost = await prisma.blogPost.upsert({
    where: { slug: "gunes-panellerinde-kirlenme-ve-verim-kaybi" },
    update: {},
    create: {
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
      imageUrl: null,
      published: true,
    },
  });
  console.log(`Sample blog post seeded: ${sampleBlogPost.title}`);

  // 4. Create Sample Product
  const sampleProduct = await prisma.product.upsert({
    where: { slug: "profesyonel-solar-panel-temizleme-solusyonu" },
    update: {},
    create: {
      slug: "profesyonel-solar-panel-temizleme-solusyonu",
      name: "Profesyonel Solar Panel Temizleme Solüsyonu",
      description: "Güneş panellerinin hassas cam yüzeyleri için özel olarak formüle edilmiş, tortu ve iz bırakmayan saf su ile uyumlu konsantre temizlik solüsyonu.",
      specs: "Miktar: 5 Litre\nUygulama: 1/50 Seyreltme Oranı\nÖzellik: Antistatik formül, toz tutmayı geciktirir",
      price: 1250.0,
      imageUrl: null,
      inStock: true,
    },
  });
  console.log(`Sample product seeded: ${sampleProduct.name}`);

  // 5. Create Sample Gallery Item
  const count = await prisma.galleryItem.count();
  if (count === 0) {
    await prisma.galleryItem.create({
      data: {
        title: "Endüstriyel GES Temizliği",
        description: "10 MW kapasiteli arazi tipi güneş enerjisi santrali saf su ile temizleme çalışması.",
        imageUrl: "/next.svg", // Placeholder image path
        mediaType: "IMAGE",
        sortOrder: 1,
      },
    });
    console.log("Sample gallery item seeded.");
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
