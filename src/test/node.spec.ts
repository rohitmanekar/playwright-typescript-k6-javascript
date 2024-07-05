import { test, expect } from '@playwright/test';
import { NodePage } from '../main/ui/NodePage';

test.describe('Node Tests', () => {
  test('Create a Node in Moralis Admin', async ({ page }) => {
    const nodePage = new NodePage(page);
    const nodeSite1Url = await nodePage.createNode();
    console.log('Node URL:', nodeSite1Url);
    expect(nodeSite1Url).not.toBeNull();
  });
});
