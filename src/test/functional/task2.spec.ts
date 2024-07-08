import { test, expect, Page, Browser } from '@playwright/test';
import { chromium } from 'playwright';
import { executeRpcGet } from '../../main/api/apiHelper';
import { APIKeyPage } from '../../main/ui/APIKeyPage';
import { config } from '../../main/config/functional-config';
import { LoginPage } from '../../main/ui/LoginPage';

let apiKey: string;
let browser: Browser;
let context: any;
let pageObj: Page;
let nodeSite1Url: string;
let authFile = 'src/main/config/auth.json';

//setup method for initializing browser, context and page
test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    pageObj = await context.newPage();
    await pageObj.setDefaultTimeout(60000);
});

//teardown method for closing browser
test.afterAll(async () => {
   await browser.close();
});

/**
 * Consists of the tests as a part of the task 1 assesment
 */
test.describe('Task 1 tests', () => {
    //Logging to the Moralis Admin site
    test('Login to Moralis Admin', async () => {
        const loginPage = new LoginPage(pageObj);
        const title = await loginPage.login(config.credentials.username, config.credentials.password);
        expect(title).toEqual('Moralis | The Ultimate Web3 Development Platform');
    });

    //Test for getting the api key and validating it
    test('Get API Key', async () => {
        const apiKeyPage = new APIKeyPage(pageObj);
        apiKey = await apiKeyPage.getAPIKey();
        console.log('getAPIKey -- ', apiKey);
        expect(apiKey).not.toBeNull();
    });

    //Test for getting the wallet NFTs
    test('Get Wallet NFTs', async () => {
        const endpoint = config.urls.nftApi(config.walletinfo.address, config.walletinfo.chain);
        const headers = {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-Key': apiKey,
        };
        const result = await executeRpcGet(endpoint, headers);
        expect(result).toBeDefined();
    });
});
