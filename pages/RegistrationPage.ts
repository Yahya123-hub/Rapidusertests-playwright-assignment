import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CustomerRegistrationData } from '../utils/test-data';

export class RegistrationPage extends BasePage {
  readonly path = '/customer/signup';

  private readonly firstNameInput = this.page.locator('#first_name_input')
  private readonly lastNameInput = this.page.locator('#last_name_input')
  private readonly companyandlegalFormInput = this.page.locator('#company_name_input')
  private readonly emailInput = this.page.locator('#email_input')
  private readonly pswdInput = this.page.locator('#password_input')
  private readonly terms_checkboxInput = this.page.locator('#comments')
  private readonly registerButton = this.page.getByTestId('create-account-button').first();
  private readonly register_asserter = this.page.getByTestId('resend-confirmation-email-link');

  async goto() {
    await this.page.goto(this.path);}

  async fillForm(data: CustomerRegistrationData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyandlegalFormInput.fill(data.companyandlegal);
    await this.emailInput.fill(data.email);
    await this.pswdInput.fill(data.password);
    await this.terms_checkboxInput.check();
  }

  async submit() {
    await this.registerButton.click();
  }

  async expectSubmissionSucceeded() {
    await expect(this.register_asserter).toBeVisible();
  }

  async expectButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }

}