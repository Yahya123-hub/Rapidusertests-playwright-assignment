import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SSOPage extends BasePage {
  readonly path = '/login';

  private readonly sso_btn = this.page.locator('//a[@href="/sso/login"]');
  private readonly emailInput = this.page.locator('#username')
  private readonly sso_continue_btn = this.page.locator('//button[normalize-space()="Continue"]')

  async goto() {
    await this.page.goto(this.path);
    await this.sso_btn.click();
  }

  async expectSSOPage() {
    await expect(this.page).toHaveURL(/login.*identifier/);
  }

  async completeLogin(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.sso_continue_btn.click();
    //due to invalid creds, we are unable to proceed after this
    //but the flow for password will be similar then we can
    //assert by url, or element

  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/logged-in/);
  }
}