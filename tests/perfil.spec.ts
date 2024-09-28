import { test as base, expect } from "@playwright/test";
import { testUser } from "./fixtures/auth";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

const test = base.extend({
  authedPage: async ({ page }, use) => {
    await page.goto("/auth/signin");
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard");
    await use(page);
  },
});

test.describe("Pruebas de la Página de Perfil", () => {
  test.beforeAll(async () => {
    const hashedPassword = await hash(testUser.password, 10);
    await prisma.user.upsert({
      where: { email: testUser.email },
      update: {
        name: testUser.name,
        password: hashedPassword,
        role: testUser.role,
      },
      create: {
        email: testUser.email,
        name: testUser.name,
        password: hashedPassword,
        role: testUser.role,
      },
    });
  });

  test.afterAll(async () => {
    const hashedPassword = await hash(testUser.password, 10);
    await prisma.user.update({
      where: { email: testUser.email },
      data: {
        name: testUser.name,
        password: hashedPassword,
        role: testUser.role,
      },
    });
  });

  test("debe navegar correctamente desde el dashboard hasta la página de perfil", async ({ authedPage: page }) => {
    await page.waitForURL("/dashboard");
    
    const userOptionsDropdown = page.locator('[data-testid="user-options"]');
    await expect(userOptionsDropdown).toBeVisible();
    
    await userOptionsDropdown.click();
    
    await page.click('text="Mi Perfil"');
    
    await page.waitForURL("/perfil");
    
    await expect(page.locator("h3:has-text('Editar perfil')")).toBeVisible();
    
    await expect(page.locator("input#name")).toHaveValue(testUser.name);
    await expect(page.locator("input#email")).toHaveValue(testUser.email);
  });


  test("debe mostrar la información del usuario correctamente", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    await expect(page.locator("input#name")).toHaveValue(testUser.name);
    await expect(page.locator("input#email")).toHaveValue(testUser.email);
  });

  test("debe actualizar la información del perfil con éxito", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    const nuevoNombre = "Nuevo Nombre de Prueba";
    await page.fill("input#name", nuevoNombre);
    await page.click('button:has-text("Actualizar información")');

    const notificacion = page.locator('[data-testid="notification"]');
    await expect(notificacion).toBeVisible();
    await expect(notificacion).toHaveText("Perfil actualizado");

    const usuarioActualizado = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    expect(usuarioActualizado?.name).toBe(nuevoNombre);
  });

  test("debe mostrar mensajes de error para actualización de perfil inválida", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    await page.fill("input#name", "");
    await page.fill("input#email", "correo-invalido@example");
    await page.click('button:has-text("Actualizar información")');

    await expect(page.locator("text=El nombre debe tener al menos 3 caracteres")).toBeVisible();
    await expect(page.locator("text=escribe un correo electrónico valido")).toBeVisible();
  });

  test("debe cambiar la contraseña con éxito", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    const nuevaContraseña = "nuevaContraseña123";
    await page.fill("input#current-password", testUser.password);
    await page.fill("input#new-password", nuevaContraseña);
    await page.fill("input#confirm-password", nuevaContraseña);
    await page.click('button:has-text("Cambiar contraseña")');

    const notificacion = page.locator('[data-testid="notification"]');
    await expect(notificacion).toBeVisible();
    await expect(notificacion).toHaveText("Contraseña actualizada");

    const hashedPassword = await hash(testUser.password, 10);
    await prisma.user.update({
      where: { email: testUser.email },
      data: { password: hashedPassword },
    });
  });

  test("debe mostrar error cuando las contraseñas no coinciden", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    await page.fill("input#current-password", testUser.password);
    await page.fill("input#new-password", "nuevaContraseña123");
    await page.fill("input#confirm-password", "contraseñaDiferente");
    await page.click('button:has-text("Cambiar contraseña")');

    await expect(page.locator("text=Las contraseñas no coinciden")).toBeVisible();
  });

  test("la notificación debe tener el data-testid correcto", async ({ authedPage: page }) => {
    await page.goto("/perfil");
    await page.fill("input#name", "Otro Nombre de Prueba");
    await page.click('button:has-text("Actualizar información")');

    const notificacion = page.locator('[data-testid="notification"]');
    await expect(notificacion).toBeVisible();
  });
});