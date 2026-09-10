import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';

test.describe('Standard Login', () => {
  test('customer can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.standardLogin.email, env.standardLogin.password);
    await loginPage.expectLoggedIn();
  });
});