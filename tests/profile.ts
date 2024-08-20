import prisma from "@/lib/prisma";
import { test, expect } from "@playwright/test";
import bcrypt from "bcrypt";
import { createAuthCookie, createEncodedToken } from "./utils";
import { Role } from "@prisma/client";

test.describe("Profile and Password Update Page", () => {
  const testUser = {
    uuid: "e1a5f203-67c5-4c90-9138-ba044c177560",
    email: "test@example.com",
    name: "Usuario Test",
    password: "TestPassword123",
    role: Role.ADMIN,
  };

  test.beforeAll(async () => {
    // Crear usuario de prueba en la base de datos
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await prisma.user.create({
      data: {
        uuid: testUser.uuid,
        email: testUser.email,
        name: testUser.name,
        password: hashedPassword,
        role: testUser.role,
      },
    });
  });

  test.afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  const waitForNotification = async (page, message: string, type: string) => {
    console.log(`Waiting for notification: "${message}" of type "${type}"`);
    
    return new Promise<void>(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Notification "${message}" not found within 10 seconds`));
      }, 10000);

      const checkForNotification = async () => {
        const notificationLocator = page.locator('#notification')
          .filter({ hasText: message })
          .filter({ hasClass: `${type}-800` });
        
        console.log(`Checking for notification. Count: ${await notificationLocator.count()}`);
        
        if (await notificationLocator.count() > 0) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(checkForNotification, 100);
        }
      };

      await checkForNotification();
    });
  };

  const debugPageContent = async (page) => {
    console.log('Current page content:');
    console.log(await page.content());
  };

  test.beforeEach(async ({ page, context }) => {
    // Crear y establecer la cookie de autenticación
    const encodedToken = await createEncodedToken({
      ...testUser,
      id: "e1a5f203-67c5-4c90-9138-ba044c177560",
    });

    const authCookie = createAuthCookie(encodedToken);

    await context.addCookies([authCookie]);

    // Navegar al dashboard
    await page.goto("http://localhost:3000/dashboard", { timeout: 30000 });

    // Esperar a que se cargue la página y verificar que estamos en el dashboard
    await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    console.log("Body is visible");

    const dashboardTitle = page.locator('h1:has-text("Dashboard")');
    await expect(dashboardTitle).toBeVisible({ timeout: 10000 });
    console.log("Dashboard title is visible");

    // Localizar y abrir el dropdown del usuario
    const userDropdown = page.locator(`button:has-text("${testUser.name}")`);
    await expect(userDropdown).toBeVisible({ timeout: 10000 });
    console.log("User dropdown is visible");
    await userDropdown.click();

    // Hacer clic en 'Mi Perfil' dentro del dropdown
    await page.click("text=Mi Perfil");

    // Esperar a que la página de perfil se cargue
    await page.waitForURL("**/perfil", { timeout: 10000 });
    console.log("Navigated to profile page");
  });

  test("should update profile information", async ({ page }) => {
    const newName = "Nuevo Nombre";
    const newEmail = "nuevo@email.com";

    await page.fill("#name", newName);
    await page.fill("#email", newEmail);

    const updateButton = page.locator(
      'button:has-text("Actualizar información")'
    );
    await updateButton.click();

    // Esperar a que aparezca la notificación de éxito o un mensaje de error
    const successNotification = page.locator("text=Perfil actualizado");
    const errorMessage = page.locator("text=Error al actualizar el perfil");
    await expect(successNotification.or(errorMessage)).toBeVisible({
      timeout: 10000,
    });

    if (await errorMessage.isVisible()) {
      throw new Error(
        "Failed to update profile: " + (await errorMessage.textContent())
      );
    }

    // Verificar que los campos se han actualizado
    await expect(page.locator("#name")).toHaveValue(newName);
    await expect(page.locator("#email")).toHaveValue(newEmail);

    // Verificar en la base de datos que el usuario se actualizó correctamente
    const updatedUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name).toBe(newName);
  });

  test('should update password successfully', async ({ page }) => {
    const newPassword = 'NuevaContraseña456';

    await page.fill('#current-password', testUser.password);
    await page.fill('#new-password', newPassword);
    await page.fill('#confirm-password', newPassword);
    
    console.log('Filled password fields');
    
    // Configurar un listener para la notificación antes de hacer clic en el botón
    const notificationPromise = waitForNotification(page, 'Contraseña actualizada', 'green');
    
    await page.click('button:has-text("Cambiar contraseña")');
    console.log('Clicked change password button');

    try {
      await notificationPromise;
      console.log('Success notification detected');
    } catch (error) {
      console.error('Failed to find success notification:', error);
      await debugPageContent(page);
      
      // Verificar si la contraseña se actualizó a pesar de no ver la notificación
      const updatedUser = await prisma.user.findUnique({ where: { email: testUser.email } });
      if (updatedUser) {
        const passwordIsUpdated = await bcrypt.compare(newPassword, updatedUser.password);
        console.log('Password updated in database:', passwordIsUpdated);
      } else {
        console.log('User not found in database');
      }
      
      throw error;
    }

    // Verificaciones adicionales
    await expect(page.locator('#current-password')).toHaveValue('');
    await expect(page.locator('#new-password')).toHaveValue('');
    await expect(page.locator('#confirm-password')).toHaveValue('');

    const updatedUser = await prisma.user.findUnique({ where: { email: testUser.email } });
    expect(updatedUser).not.toBeNull();
    const passwordIsUpdated = await bcrypt.compare(newPassword, updatedUser!.password);
    expect(passwordIsUpdated).toBe(true);
  });

  // test('should show error messages for invalid password update', async ({ page }) => {
  //   await page.fill('#current-password', 'ContraseñaIncorrecta');
  //   await page.fill('#new-password', 'NuevaContraseña456');
  //   await page.fill('#confirm-password', 'ContraseñaDistinta789');
  //   await page.click('button:has-text("Cambiar contraseña")');

  //   await waitForNotification(page, 'Error al actualizar la contraseña', 'bg-red');
  // });

  test("should show error messages for invalid password update", async ({
    page,
  }) => {
    // Intentar actualizar con contraseñas que no coinciden
    await page.fill("#current-password", "ContraseñaActual123");
    await page.fill("#new-password", "NuevaContraseña456");
    await page.fill("#confirm-password", "ContraseñaDistinta789");

    await page.click('button:has-text("Cambiar contraseña")');

    // Verificar que se muestra el mensaje de error
    await expect(
      page.locator("text=Las contraseñas no coinciden")
    ).toBeVisible();
  });
});
