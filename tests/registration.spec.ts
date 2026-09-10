import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { buildCustomerRegistrationData,} from '../utils/test-data';

test.describe('Customer Registration', () => {
  
  test('customer can submit the registration form successfully', async ({ page }, testInfo) => {
    const registrationPage = new RegistrationPage(page);
    const data = buildCustomerRegistrationData(testInfo.workerIndex);

    await registrationPage.goto();
    await registrationPage.fillForm(data);
    await registrationPage.submit();
    await registrationPage.expectSubmissionSucceeded();
  });

});

