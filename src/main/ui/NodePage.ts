import { Page } from '@playwright/test';
import { locators } from '../config/locators';

export class NodePage {
  constructor(private page: Page) {}

  async createNode() {
    await this.page.click(locators.nodePage.nodesTab);
    const referSkp = this.page.locator('selector');
    const count = await referSkp.count();
    if (count > 0) {
      await this.page.click(locators.nodePage.referSkip);
    } else {
        console.log('Element does not exist ', referSkp);
    }    
    await this.page.click(locators.nodePage.createNodeButton);
    await this.page.selectOption(locators.nodePage.protocolDropdown, 'Ethereum');
    await this.page.selectOption(locators.nodePage.networkDropdown, 'Mainnet');
    await this.page.click(locators.nodePage.createNodeButton2);
    const nodeSite1Url = await this.page.getAttribute(locators.nodePage.site1NodeUrlInput, 'value');
    console.log('Value attribute:', nodeSite1Url);
    return nodeSite1Url as string;
  }
}
