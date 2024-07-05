import { test, expect } from '@playwright/test';
import { LoginPage } from '../main/ui/LoginPage';
import { config } from '../main/config/functional-config';

test.describe('Login Tests', () => {
  test('Login to Moralis Admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acceptCookies();
    const title = await loginPage.login(config.credentials.username, config.credentials.password);
    expect(title).toEqual('Moralis | The Ultimate Web3 Development Platform');
  });
});
