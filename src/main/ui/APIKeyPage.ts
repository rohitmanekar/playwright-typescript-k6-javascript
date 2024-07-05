import { Page } from '@playwright/test';
import { locators } from '../config/locators';

export class APIKeyPage {
  constructor(private page: Page) {}

  async getAPIKey() {
    await this.page.click(locators.apiKeyPage.apiKeysTab);
    await this.page.click(locators.apiKeyPage.showHideButton);
    const apiKeyLoc = await this.page.$(locators.apiKeyPage.apiKeyText);
    const apiKey = await apiKeyLoc?.innerText();
    console.log('Text content (innerText) from element handle:', apiKey);
    return apiKey as string;
  }
}
