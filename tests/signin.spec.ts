import { test, expect } from "@playwright/test";
import { createAuthCookie, createEncodedToken } from "./utils";
import { testUser } from "./fixtures/auth";

// TODO: Agregar una base de datos en docker o en memoria para evitar que se conecte a la real

test.describe("Authentication Tests", () => {
  test("should render SignIn page with form", async ({ page }) => {
    await page.goto(`/auth/signin`);

    await expect(page.locator("h3")).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });

  test("should show error messages for invalid inputs", async ({ page }) => {
    await page.goto(`/auth/signin`);

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Ingresa un correo electrónico valido")).toBeVisible();
    await expect(page.locator("text=La contraseña debe tener al menos 6 caracteres")).toBeVisible();
  });

  test("should show error message on failed login", async ({ page }) => {
    await page.goto(`/auth/signin`);

    await page.fill('input[name="email"]', "user@example.com");
    await page.fill('input[name="password"]', "invalidpassword");

    await page.route("**/api/auth", (route) =>
      route.fulfill({
        status: 401,
        body: JSON.stringify({ error: "Invalid credentials" }),
      })
    );

    await page.click('button[type="submit"]');

    await expect(page.locator("text=El email o la contraseña son incorrectos")).toBeVisible();
  });

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

  test("should navigate to dashboard with pre-existing account", async ({
    page,
    context,
  }) => {
    const encodedToken = await createEncodedToken(testUser);
    const authCookie = createAuthCookie(encodedToken);

    await context.addCookies([authCookie]);

    await page.goto(`${process.env.APP_URL}/dashboard`);

    expect(page.url()).toContain("/dashboard");
  });

  test("should redirect to dashboard after successful login", async ({ page }) => {
    await page.goto(`${process.env.APP_URL}/auth/signin`);

    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "AdminPass123!");

    await page.route("**/api/auth/callback/credentials", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true }),
      })
    );

    await Promise.all([
      page.waitForURL('**/dashboard'),
      page.click('button[type="submit"]')
    ]);

    expect(page.url()).toContain("/dashboard");

    await expect(page.locator("h2")).toContainText("Livestar");
  });
});