import { test, expect, Page, Browser } from '@playwright/test';
import { chromium } from 'playwright';
import { LoginPage } from '../../main/ui/LoginPage';
import { config } from '../../main/config/functional-config';
import { executeRpcPost } from '../../main/api/apiHelper';
import { NodePage } from '../../main/ui/NodePage';

let browser: Browser;
let context: any;
let pageObj: Page;
let nodeSite1Url: string;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    pageObj = await context.newPage();
    await pageObj.setDefaultTimeout(60000);
});

// Global teardown: runs once after all tests
test.afterAll(async () => {
    await browser.close();
});

test.describe.serial('Task 1 tests', () => {
    // Logging to Moralis Admin
    test('Login to Moralis Admin', async () => {
        const loginPage = new LoginPage(pageObj);
        const title = await loginPage.login(config.credentials.username, config.credentials.password);
        expect(title).toEqual('Moralis | The Ultimate Web3 Development Platform');
    });

    //Creating node
    test('Create a Node in Moralis Admin', async () => {
        const nodePage = new NodePage(pageObj);
        nodeSite1Url = await nodePage.createNode();
        console.log('Node URL:', nodeSite1Url);
        expect(nodeSite1Url).not.toBeNull();
    });

    // Getting the block number
    test('Positive flow - Get Block Number', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_blockNumber';
        const params: any[] = [];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result.body).toBeDefined();
        expect(result.status).toBe(200); 
    });

     // Getting the block number
     test('Negative flow - Unauthorized Get Block Number', async () => {
        const endpoint = nodeSite1Url+'88';
        const method = 'eth_blockNumber';
        const params: any[] = [];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result.status).toBe(401); 
        //expect(result.body).toHaveProperty('jsonrpc', '2.0');
    });

    //Getting block by number
    test('Positive flow - Get Block by Number', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getBlockByNumber';
        const params = ['latest', true];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result).toBeDefined();
        expect(result.status).toBe(200); 
    });

    test('Negative flow - Bad request - Get Block by Number', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getBlockByNumber_incorrect';
        const params = ['latest', true];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result.status).toBe(400); 
    });

    // Getting the transaction by Hash
    test('Positive flow - Get the Transaction By Hash)', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getTransactionByHash';
        const params = [
            "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3"
        ];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result).toBeDefined();
        expect(result.status).toBe(200); 
    });

    test('Negative flow - incorrect hash - Get the Transaction By Hash)', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getTransactionByHash';
        const params = [
            "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3_incorrect"
        ];
        const result = await executeRpcPost(endpoint, method, params);
        expect(result).toBeDefined();
        expect(result.body.error).toHaveProperty('code', -32602);
        expect(result.body.error.message).toMatch(/invalid argument 0/);
    });
});
