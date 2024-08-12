import { test, expect } from "@playwright/test";
import { Language } from "./utils/types";
import { createAuthCookie, createEncodedToken, getNestedTranslation, loadTranslations } from "./utils";
import { testUser } from "./fixtures/auth";

const languages: Language[] = ["en", "es"];

test.describe("Authentication Tests - Language Dependent", () => {
  for (const lang of languages) {
    test.describe(`Authentication Tests - ${lang}`, () => {
      let translations: ReturnType<typeof loadTranslations>;

      test.beforeEach(async () => {
        translations = loadTranslations(lang);
      });

      test(`should render SignIn page with form - ${lang}`, async ({ page }) => {
        await page.goto(`/${lang}/auth/signin`);

        await expect(page.locator("h3")).toContainText(getNestedTranslation(translations, 'signin.title'));
        await expect(
          page.locator("form").filter({ hasText: getNestedTranslation(translations, 'signin.submit.label') })
        ).toBeVisible();
      });

      test(`should show error messages for invalid inputs - ${lang}`, async ({ page }) => {
        await page.goto(`/${lang}/auth/signin`);

        await page.click('button[type="submit"]');

        await expect(
          page.locator(`text="${getNestedTranslation(translations, 'signin.errors.email.invalidString')}"`)
        ).toBeVisible();
        await expect(
          page.locator(`text="${getNestedTranslation(translations, 'signin.errors.password.tooSmall')}"`)
        ).toBeVisible();
      });

      test(`should show error message on failed login - ${lang}`, async ({ page }) => {
        await page.goto(`/${lang}/auth/signin`);

        await page.fill('input[name="email"]', "user@example.com");
        await page.fill('input[name="password"]', "invalidpassword");

        await page.route("**/api/auth", (route) =>
          route.fulfill({
            status: 401,
            body: JSON.stringify({ error: "Invalid credentials" }),
          })
        );

        await page.click('button[type="submit"]');

        await expect(
          page.locator(`text="${getNestedTranslation(translations, 'signin.errors.auth.invalidCredentials')}"`)
        ).toBeVisible();
      });
    });
  }

  test.describe("Authentication Tests - Language Independent", () => {
    test("should set authentication cookie", async ({ context }) => {
      const encodedToken = await createEncodedToken(testUser);
      const authCookie = createAuthCookie(encodedToken);

      await context.addCookies([authCookie]);

      const cookies = await context.cookies();
      const sessionCookie = cookies.find(
        (cookie) => cookie.name === "next-auth.session-token"
      );

      expect(sessionCookie).toBeDefined();
      expect(sessionCookie?.value).toBe(encodedToken);
    });

    test("should navigate to dashboard on successful login", async ({
      page,
      context,
    }) => {
      const encodedToken = await createEncodedToken(testUser);
      const authCookie = createAuthCookie(encodedToken);

      await context.addCookies([authCookie]);

      await page.goto(`${process.env.APP_URL}/dashboard`);

      expect(page.url()).toContain("/dashboard");
    });
  });

  test.describe("Internationalization Tests", () => {
    for (const lang of languages) {
      test(`should display correct language content - ${lang}`, async ({ page }) => {
        const translations = loadTranslations(lang);
        
        await page.goto(`/${lang}/auth/signin`);

        await expect(page.locator("h3")).toContainText(getNestedTranslation(translations, 'signin.title'));
        await expect(page.locator('label[for="email"]')).toContainText(getNestedTranslation(translations, 'signin.email.label'));
        await expect(page.locator('label[for="password"]')).toContainText(getNestedTranslation(translations, 'signin.password.label'));
        await expect(page.locator('button[type="submit"]')).toContainText(getNestedTranslation(translations, 'signin.submit.label'));
      });
    }
  });
});