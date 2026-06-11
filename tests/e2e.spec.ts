import { test, expect } from "@playwright/test";

test.describe("Solar Cleaning Platform E2E Tests", () => {
  
  test("Homepage loads and theme toggle works", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/NivaArt Kurumsal Platformu/);
    
    // Check main elements
    await expect(page.locator("text=Güneş Enerjisinden Maksimum Verim Alın")).toBeVisible();
 
    // Theme toggle test
    const themeBtn = page.locator('button[aria-label="Temayı değiştir"]').first();
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
  });
 
  test("Security guard redirects /nivaart/dashboard to /nivaart/login", async ({ page }) => {
    await page.goto("/nivaart/dashboard");
    // Should be redirected to /nivaart/login
    await page.waitForURL("**/nivaart/login");
    await expect(page.locator("text=Yönetici Girişi")).toBeVisible();
  });
 
  test("Contact form handles submission successfully", async ({ page }) => {
    await page.goto("/iletisim");
    await expect(page).toHaveTitle(/İletişim/);
 
    // Fill contact form
    await page.fill('input[name="name"]', "Test Kullanıcısı");
    await page.fill('input[name="email"]', "test@nivaart.com");
    await page.fill('input[name="phone"]', "+90 555 123 45 67");
    await page.fill('input[name="subject"]', "E2E Test Konusu");
    await page.fill('textarea[name="message"]', "Bu mesaj Playwright E2E test aracı tarafından gönderilmiştir.");

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success feedback banner
    const successBanner = page.locator("text=Tebrikler! Mesajınız başarıyla iletildi");
    await expect(successBanner).toBeVisible();
  });
});
