import { Page } from '@playwright/test';
import { locators } from '../config/locators';

export class LoginPage {
  constructor(private page: Page) {}

  /*  async acceptCookies() {
    await this.page.click(locators.loginPage.acceptCookies);
  } */
 
  async login(username: string, password: string) {
    const url = "https://admin.moralis.io/login";
    await this.page.goto(url);
    await this.page.click('//div[@id="cookiescript_accept"]');
    await this.page.fill(locators.loginPage.emailField, username);
    await this.page.fill(locators.loginPage.passwordField, password);
    await this.page.
    click(locators.loginPage.loginButton);
    return this.page.title();
  }
}
