import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly path = '/login';

  private readonly emailInput = this.page.getByTestId('email-input');
  private readonly passwordInput = this.page.getByTestId('password-input');
  private readonly loginButton = this.page.getByTestId('login-button');
  private readonly ssoButton = this.page.getByTestId('sso-login-link');

  async goto() {
    await this.page.goto(this.path);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithSSO() {
    await this.ssoButton.click();
    //add after this
  }

  async expectLoggedIn() {
    await expect(this.page).not.toHaveURL(/\/login/, {
      timeout: 15000,
    });
  }
}