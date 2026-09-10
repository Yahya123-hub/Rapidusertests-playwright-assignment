
## Architecture

**Page Object Model (POM).** Each screen/flow has a page object under `pages/` that owns its locators and the actions you can perform on it; the spec files under `tests/` only describe *behavior* (fill this, click that, expect this), not selectors. This keeps tests readable and means a UI change only requires updating one file.

- `pages/BasePage.ts` — thin base class all page objects extend, just wraps the injected `Page` instance so shared helpers can be added later without touching every page object.
- `pages/LoginPage.ts` — standard email/password login.
- `pages/RegistrationPage.ts` — customer signup form.
- `pages/SSOPage.ts` — the external SSO identity provider flow (see note below).
- `utils/env.ts` — centralizes all environment/config access. Fails fast with a clear error if a required variable is missing, instead of letting a test fail later with a confusing "element not found."
- `utils/test-data.ts` — generates unique registration data per test (using `workerIndex` + timestamp + random suffix) so parallel runs never collide on a duplicate email.
- `playwright.config.ts` — `fullyParallel: true`, retries and 4 workers in CI only, HTML/list reporters, and `trace/screenshot/video` all set to capture on failure for debugging without bloating passing runs.

**Selector strategy.** Where the app exposes `data-testid` attributes (login, registration submit, SSO entry point), I used `getByTestId(...)` since it's stable against styling/copy changes. Where no test id existed, I fell back to `id` locators or a scoped XPath (e.g. the SSO "Continue" button). 

**Config over hardcoding.** All credentials, the base URL, and basic-auth values are read from `.env` (see `.env.example`) rather than hardcoded, so the same suite runs against different environments/accounts without code changes, and nothing sensitive is committed.

## SSO login — approach and current status

The scenario requires logging in through the external SSO provider. I do **not** have valid SSO credentials — I requested them two days ago and haven't received them yet — so the test cannot run end-to-end right now.

What's implemented and verified:
1. Click the SSO button on the login page.
2. Land on the provider's identifier page and enter the email.
3. Click **Continue**.

This part is confirmed working — `SSOPage.expectSSOPage()` asserts we land on the identifier step, and the email + Continue steps execute successfully against the live provider.

What's blocked: after clicking Continue, the provider presumably shows a password field. Without valid credentials I can't see that screen, so I can't confirm its selector or the shape of the post-login redirect.

**Not an issue since the approach will be straight forward with valid credentials ** :
1. Fill the password field on the screen that follows Continue.
2. Submit it.
3. Assert successful login the same way `LoginPage` does for standard login — either by URL (`expect(page).toHaveURL(/logged-in/)`, already stubbed as `expectLoggedIn()`) or by asserting a post-login element (e.g. an account/dashboard element) is visible, whichever proves more stable once I can see the real page.

I'd also add a negative case (invalid SSO password) once I can see the real error state, mirroring how a negative case could be added for standard login.

## Setup

```bash
npm install
npx playwright install
cp .env.example .env   # fill in real values — never commit .env
```

## Running tests

```bash
npm test                  # full suite
npm run test:registration
npm run test:login
npm run test:sso
npm run test:ui           # interactive UI mode
npm run report            # open the last HTML report
```


## Extensions with more time

- **SSO password step**: blocked on credentials as described above; simple approach documented, ready to finish once I get them.
- **Negative/validation cases** (invalid login, invalid registration fields, disabled-submit states): the registration page object already exposes `expectButtonDisabled()` for this, but I'd add dedicated test cases once the exact validation copy/markup is confirmed against the live app rather than guessed.
- **Cross-browser coverage**: currently Chromium only in `playwright.config.ts`; adding Firefox/WebKit projects is a one-line change once cross-browser support is in scope.

