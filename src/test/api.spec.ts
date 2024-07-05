import { test, expect } from '@playwright/test';
import { executeRpcPost, executeRpcGet } from '../main/api/apiHelper';
import { APIKeyPage } from '../main/ui/APIKeyPage';

let nodeSite1Url: string;
let apiKey: string;

test.describe('API Tests', () => {
  test.beforeAll(async ({ page }) => {
    const apiKeyPage = new APIKeyPage(page);
    apiKey = await apiKeyPage.getAPIKey();
    console.log('API Key:', apiKey);
  });

  test('Get Block Number', async () => {
    const endpoint = nodeSite1Url;
    const method = 'eth_blockNumber';
    const params: any[] = [];
    const result = await executeRpcPost(endpoint, method, params);
    expect(result).toBeDefined();
  });

  test('Get Block by Number', async () => {
    const endpoint = nodeSite1Url;
    const method = 'eth_getBlockByNumber';
    const params = ['latest', true];
    const result = await executeRpcPost(endpoint, method, params);
    expect(result).toBeDefined();
  });

  test('Get Wallet NFTs', async () => {
    const address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e';
    const chain = 'eth';
    const endpoint = `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&media_items=false`;
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': apiKey,
    };
    const result = await executeRpcGet(endpoint, headers);
    expect(result).toBeDefined();
  });
});
