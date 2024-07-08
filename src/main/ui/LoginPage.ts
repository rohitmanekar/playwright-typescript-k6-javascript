import { Page, Browser, BrowserContext, BrowserType, LaunchOptions } from '@playwright/test';
import { locators } from '../config/locators';

export class LoginPage {
  constructor(private page: Page) {}
 
  async login(username: string, password: string) {
    const url = "https://admin.moralis.io/login";
    await this.page.goto(url);
    await this.page.click(locators.loginPage.acceptCookies);
    await this.page.fill(locators.loginPage.emailField, username);
    await this.page.fill(locators.loginPage.passwordField, password);
    await this.page.click(locators.loginPage.loginButton);
    return this.page.title();
  }
}
function delay(arg0: number) {
  throw new Error('Function not implemented.');
}