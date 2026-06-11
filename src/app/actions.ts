"use server";

import { revalidatePath } from "next/cache";
import {
  staticBlogPosts,
  staticProducts,
  staticGalleryItems,
  staticHomepageContents,
  staticSubmissions,
  staticSettings,
  staticUsers,
  BlogPost,
  Product,
  GalleryItem,
  ContactSubmission,
  Setting,
  User
} from "@/lib/staticData";

// Helper to check authentication
async function checkAuth() {
  return { user: { email: "admin@admin.com", name: "admin", role: "ADMIN" } };
}

// Helper to convert text to URL slug
function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i',
    'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  };
  
  let slug = text;
  for (const char in trMap) {
    slug = slug.replaceAll(char, trMap[char]);
  }
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except space/hyphen
    .replace(/\s+/g, "-")          // replace spaces with hyphens
    .replace(/-+/g, "-")          // remove duplicate hyphens
    .replace(/^-+|-+$/g, "");     // trim hyphens from ends
}

// Get unique slug for blog post
async function getUniqueBlogSlug(title: string, currentId?: number): Promise<string> {
  const baseSlug = slugify(title) || "blog";
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = staticBlogPosts.find(
      b => b.slug === slug && (currentId === undefined || b.id !== currentId)
    );
    
    if (!existing) {
      break;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// Get unique slug for product
async function getUniqueProductSlug(name: string, currentId?: number): Promise<string> {
  const baseSlug = slugify(name) || "urun";
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = staticProducts.find(
      p => p.slug === slug && (currentId === undefined || p.id !== currentId)
    );
    
    if (!existing) {
      break;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// ==========================================
// 1. BLOG ACTIONS
// ==========================================

export async function getBlogPosts() {
  try {
    // Return a sorted copy of blogs (newest first)
    return [...staticBlogPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function createBlogPost(formData: {
  title: string;
  slug?: string | null;
  summary: string;
  content: string;
  imageUrl?: string | null;
  published?: boolean;
}) {
  await checkAuth();

  try {
    const finalSlug = await getUniqueBlogSlug(formData.slug ? formData.slug : formData.title);
    const newId = staticBlogPosts.length > 0 ? Math.max(...staticBlogPosts.map(b => b.id)) + 1 : 1;
    
    const post: BlogPost = {
      id: newId,
      title: formData.title,
      slug: finalSlug,
      summary: formData.summary,
      content: formData.content,
      imageUrl: formData.imageUrl || null,
      published: formData.published ?? false,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    staticBlogPosts.push(post);

    revalidatePath("/blog");
    revalidatePath("/nivaart/dashboard/blog");
    return { success: true, post };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: "Blog yazısı oluşturulurken hata." };
  }
}

export async function updateBlogPost(
  id: number,
  formData: {
    title: string;
    slug?: string | null;
    summary: string;
    content: string;
    imageUrl?: string | null;
    published?: boolean;
  }
) {
  await checkAuth();

  try {
    const index = staticBlogPosts.findIndex(b => b.id === id);
    if (index === -1) {
      return { success: false, error: "Yazı bulunamadı." };
    }

    const finalSlug = await getUniqueBlogSlug(formData.slug ? formData.slug : formData.title, id);
    
    const updatedPost = {
      ...staticBlogPosts[index],
      title: formData.title,
      slug: finalSlug,
      summary: formData.summary,
      content: formData.content,
      imageUrl: formData.imageUrl ?? staticBlogPosts[index].imageUrl,
      published: formData.published ?? staticBlogPosts[index].published,
      updatedAt: new Date()
    };

    staticBlogPosts[index] = updatedPost;

    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidatePath("/nivaart/dashboard/blog");
    return { success: true, post: updatedPost };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: "Blog yazısı güncellenirken hata." };
  }
}

export async function deleteBlogPost(id: number) {
  await checkAuth();

  try {
    const index = staticBlogPosts.findIndex(b => b.id === id);
    if (index !== -1) {
      staticBlogPosts.splice(index, 1);
    }

    revalidatePath("/blog");
    revalidatePath("/nivaart/dashboard/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: "Blog yazısı silinirken hata." };
  }
}

// ==========================================
// 2. PRODUCT ACTIONS
// ==========================================

export async function getProducts() {
  try {
    return [...staticProducts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(formData: {
  name: string;
  slug?: string | null;
  description: string;
  specs?: string | null;
  price?: number | null;
  imageUrl?: string | null;
  inStock?: boolean;
}) {
  await checkAuth();

  try {
    const finalSlug = await getUniqueProductSlug(formData.slug ? formData.slug : formData.name);
    const newId = staticProducts.length > 0 ? Math.max(...staticProducts.map(p => p.id)) + 1 : 1;
    
    const product: Product = {
      id: newId,
      name: formData.name,
      slug: finalSlug,
      description: formData.description,
      specs: formData.specs || null,
      price: formData.price || null,
      imageUrl: formData.imageUrl || null,
      inStock: formData.inStock ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    staticProducts.push(product);

    revalidatePath("/urunler");
    revalidatePath("/nivaart/dashboard/products");
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Ürün oluşturulurken hata." };
  }
}

export async function updateProduct(
  id: number,
  formData: {
    name: string;
    slug?: string | null;
    description: string;
    specs?: string | null;
    price?: number | null;
    imageUrl?: string | null;
    inStock?: boolean;
  }
) {
  await checkAuth();

  try {
    const index = staticProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, error: "Ürün bulunamadı." };
    }

    const finalSlug = await getUniqueProductSlug(formData.slug ? formData.slug : formData.name, id);
    
    const updatedProduct = {
      ...staticProducts[index],
      name: formData.name,
      slug: finalSlug,
      description: formData.description,
      specs: formData.specs ?? staticProducts[index].specs,
      price: formData.price ?? staticProducts[index].price,
      imageUrl: formData.imageUrl ?? staticProducts[index].imageUrl,
      inStock: formData.inStock ?? staticProducts[index].inStock,
      updatedAt: new Date()
    };

    staticProducts[index] = updatedProduct;

    revalidatePath("/urunler");
    revalidatePath(`/urunler/${updatedProduct.slug}`);
    revalidatePath("/nivaart/dashboard/products");
    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Ürün güncellenirken hata." };
  }
}

export async function deleteProduct(id: number) {
  await checkAuth();

  try {
    const index = staticProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      staticProducts.splice(index, 1);
    }

    revalidatePath("/urunler");
    revalidatePath("/nivaart/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Ürün silinirken hata." };
  }
}

// ==========================================
// 3. GALLERY ACTIONS
// ==========================================

export async function getGalleryItems() {
  try {
    return [...staticGalleryItems].sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export async function createGalleryItem(formData: {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  mediaType?: string;
  sortOrder?: number;
}) {
  await checkAuth();

  try {
    const newId = staticGalleryItems.length > 0 ? Math.max(...staticGalleryItems.map(g => g.id)) + 1 : 1;
    const item: GalleryItem = {
      id: newId,
      title: formData.title,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      videoUrl: formData.videoUrl || null,
      mediaType: formData.mediaType || "IMAGE",
      sortOrder: formData.sortOrder ?? 0,
      createdAt: new Date()
    };

    staticGalleryItems.push(item);

    revalidatePath("/galeri");
    revalidatePath("/nivaart/dashboard/gallery");
    return { success: true, item };
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return { success: false, error: "Galeri öğesi eklenirken hata." };
  }
}

export async function deleteGalleryItem(id: number) {
  await checkAuth();

  try {
    const index = staticGalleryItems.findIndex(g => g.id === id);
    if (index !== -1) {
      staticGalleryItems.splice(index, 1);
    }

    revalidatePath("/galeri");
    revalidatePath("/nivaart/dashboard/gallery");
    return { success: true };
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return { success: false, error: "Galeri öğesi silinirken hata." };
  }
}

// ==========================================
// 4. HOMEPAGE CONTENT ACTIONS
// ==========================================

export async function getHomepageContents() {
  try {
    return staticHomepageContents;
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {};
  }
}

export async function updateHomepageContent(key: string, value: string) {
  await checkAuth();

  try {
    staticHomepageContents[key] = value;

    revalidatePath("/");
    revalidatePath("/nivaart/dashboard/homepage");
    return { success: true, content: { key, value } };
  } catch (error) {
    console.error("Error updating homepage content:", error);
    return { success: false, error: "İçerik güncellenirken hata." };
  }
}

// ==========================================
// 5. CONTACT SUBMISSION ACTIONS
// ==========================================

export async function getContactSubmissions() {
  await checkAuth();

  try {
    return [...staticSubmissions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

export async function createContactSubmission(formData: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  try {
    const newId = staticSubmissions.length > 0 ? Math.max(...staticSubmissions.map(s => s.id)) + 1 : 1;
    const submission: ContactSubmission = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      subject: formData.subject,
      message: formData.message,
      isRead: false,
      createdAt: new Date()
    };

    staticSubmissions.push(submission);

    revalidatePath("/nivaart/dashboard/submissions");
    return { success: true, submission };
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return { success: false, error: "Mesaj gönderilirken hata oluştu." };
  }
}

export async function markSubmissionAsRead(id: number) {
  await checkAuth();

  try {
    const index = staticSubmissions.findIndex(s => s.id === id);
    if (index !== -1) {
      staticSubmissions[index].isRead = true;
    }
    revalidatePath("/nivaart/dashboard/submissions");
    return { success: true };
  } catch (error) {
    console.error("Error marking submission as read:", error);
    return { success: false, error: "Mesaj güncellenirken hata." };
  }
}

export async function deleteSubmission(id: number) {
  await checkAuth();

  try {
    const index = staticSubmissions.findIndex(s => s.id === id);
    if (index !== -1) {
      staticSubmissions.splice(index, 1);
    }
    revalidatePath("/nivaart/dashboard/submissions");
    return { success: true };
  } catch (error) {
    console.error("Error deleting submission:", error);
    return { success: false, error: "Mesaj silinirken hata." };
  }
}

// ==========================================
// 6. SETTINGS ACTIONS
// ==========================================

export async function getSettings() {
  try {
    return staticSettings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function updateSettings(formData: {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  whatsapp: string;
  showBlogViews: boolean;
  showPrices: boolean;
}) {
  await checkAuth();
  try {
    Object.assign(staticSettings, formData);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/urunler");
    revalidatePath("/iletisim");
    revalidatePath("/nivaart/dashboard/settings");
    return { success: true, settings: staticSettings };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Ayarlar güncellenirken bir hata oluştu." };
  }
}

// Helper to check ADMIN authentication
async function checkAdminAuth() {
  return { id: 1, email: "admin@admin.com", role: "ADMIN" };
}

// ==========================================
// 7. USER & PERMISSION ACTIONS
// ==========================================

export async function checkUserPermissions() {
  return staticUsers[0];
}

export async function getUsers() {
  await checkAdminAuth();
  try {
    return staticUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function createStaffUser(formData: {
  email: string;
  passwordHash: string;
  role: string;
  manageBlogs: boolean;
  manageProducts: boolean;
  manageGallery: boolean;
  manageMessages: boolean;
  manageSettings: boolean;
}) {
  await checkAdminAuth();
  try {
    const existing = staticUsers.find(u => u.email === formData.email);
    if (existing) {
      return { success: false, error: "Bu e-posta adresi zaten kullanımda." };
    }

    const newId = staticUsers.length > 0 ? Math.max(...staticUsers.map(u => u.id)) + 1 : 1;
    const user: User = {
      id: newId,
      email: formData.email,
      role: formData.role,
      manageBlogs: formData.manageBlogs,
      manageProducts: formData.manageProducts,
      manageGallery: formData.manageGallery,
      manageMessages: formData.manageMessages,
      manageSettings: formData.manageSettings,
      createdAt: new Date()
    };

    staticUsers.push(user);

    revalidatePath("/nivaart/dashboard/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Kullanıcı oluşturulurken bir hata oluştu." };
  }
}

export async function updateStaffUser(
  id: number,
  formData: {
    email: string;
    password?: string;
    role: string;
    manageBlogs: boolean;
    manageProducts: boolean;
    manageGallery: boolean;
    manageMessages: boolean;
    manageSettings: boolean;
  }
) {
  const admin = await checkAdminAuth();
  if (admin.id === id && formData.role !== "ADMIN") {
    return { success: false, error: "Kendi admin yetkinizi kaldıramazsınız." };
  }

  try {
    const index = staticUsers.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: "Kullanıcı bulunamadı." };
    }

    const updatedUser = {
      ...staticUsers[index],
      email: formData.email,
      role: formData.role,
      manageBlogs: formData.manageBlogs,
      manageProducts: formData.manageProducts,
      manageGallery: formData.manageGallery,
      manageMessages: formData.manageMessages,
      manageSettings: formData.manageSettings
    };

    staticUsers[index] = updatedUser;

    revalidatePath("/nivaart/dashboard/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Kullanıcı güncellenirken bir hata oluştu." };
  }
}

export async function deleteStaffUser(id: number) {
  const admin = await checkAdminAuth();
  if (admin.id === id) {
    return { success: false, error: "Kendi hesabınızı silemezsiniz." };
  }

  try {
    const index = staticUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      staticUsers.splice(index, 1);
    }
    revalidatePath("/nivaart/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Kullanıcı silinirken bir hata oluştu." };
  }
}

export async function updateSelfProfile(formData: {
  email: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  const user = staticUsers[0];

  try {
    if (formData.email) {
      user.email = formData.email;
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error updating self profile:", error);
    return { success: false, error: "Profil güncellenirken bir hata oluştu." };
  }
}
