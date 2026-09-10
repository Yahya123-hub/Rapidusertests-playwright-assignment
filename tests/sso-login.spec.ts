
import { test } from '@playwright/test';
import { SSOPage } from '../pages/SSOPage';
import { env } from '../utils/env';

test.describe('SSO Login', () => {
  test('customer can log in via the external SSO provider', async ({ page }) => {

    /*test.skip(
      !env.sso.email || !env.sso.password,
      'SSO credentials are not configured.' //will be skipping if creds are not provided  
    );*/
   
    const ssoPage = new SSOPage(page);

    await ssoPage.goto();
    await ssoPage.expectSSOPage();

    await ssoPage.completeLogin(
      env.sso.email,
      env.sso.password
    );

    //if creds are provided then uncomment this assertion
    //await ssoPage.expectLoggedIn();
  });
});

