import { Page } from '@playwright/test';
import { locators } from '../config/locators';

export class APIKeyPage {
  constructor(private page: Page) {}

  async gotoApiKeyPage() {
    const url = "https://admin.moralis.io/api-keys";
    await this.page.goto(url);
  }

  async getAPIKey() {
    await this.page.click(locators.apiKeyPage.apiKeysTab);
    await this.page.click(locators.apiKeyPage.showHideButton);
    const apiKeyLoc = await this.page.$(locators.apiKeyPage.apiKeyText);
    const apiKey = await apiKeyLoc?.innerText();
    console.log('Text content (innerText) from element handle:', apiKey);
    return apiKey as string;
  }
}
