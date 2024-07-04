//import {chromium} from 'playwright';
import { test, expect, Browser, Page } from '@playwright/test';
import { Context } from 'vm';
const { Request } = require('@playwright/test');
const { chromium } = require('playwright-extra');
const axios = require('axios');
// Load the stealth plugin and use defaults (all tricks to hide playwright usage)

// Add the Imports before StealthPlugin
require('puppeteer-extra-plugin-stealth/evasions/chrome.app')
require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')
require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')
require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')
require('puppeteer-extra-plugin-stealth/evasions/defaultArgs') // pkg warned me this one was missing
require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')
require('puppeteer-extra-plugin-stealth/evasions/media.codecs')
require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')
require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')
require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')
require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')
require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')
require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')
require('puppeteer-extra-plugin-stealth/evasions/sourceurl')
require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')
require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')

const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");



async function login(context: Context, page: Page, username: string, password: string) {
    const url = "https://admin.moralis.io/login";
    await page.goto(url);
    await page.click('//div[@id="cookiescript_accept"]');
    await page.fill('span[title="Email"]', username);
    await page.fill('span[title="Password"]', password);
    await page.click('//button[@data-testid="test-button"]');
    //await handleCaptcha(page);
    const homePageTitle = await page.title();
    return homePageTitle as string;
}

async function createNode(page: Page) {
    await page.click('//div[text()="Nodes"]');
    await page.click('//button[text()="Create a New Node"]');
    await page.selectOption('select#select-protoccol', 'Ethereum');
    await page.selectOption('select#select-network', 'Mainnet');
    await page.click('//button[text()="Create Node"]');
    const nodeSite1Url = await page.getAttribute('//span[text()="Site" and text()="1"]/parent::div//input', 'value');
    console.log('Value attribute:', nodeSite1Url);
    await page.click('//button[@data-testid="test-button"]');
    return nodeSite1Url as string
}

async function getAPIKey(page: Page) {
    await page.click('//div[text()="API Keys"]');
    await page.click('//div[@data-testid="mui-showhide"]');
    const apiKeyLoc = await page.$('//div[contains(@class,"TextContainerStyled")]');
    const apiKey = await apiKeyLoc?.innerText();
    console.log('Text content (innerText) from element handle:', apiKey);
    return apiKey as string;
}

async function handleCaptcha(page: Page) {
    // Check if CAPTCHA appears
    const captchaSelector = 'iframe[src*="captcha"]'; // Adjust the selector based on your CAPTCHA's structure
    const captchaFrame = await page.waitForSelector(captchaSelector, { timeout: 10000 }).catch(() => null);

    if (captchaFrame) {
        console.log('CAPTCHA detected. Please solve it manually.');

        // Optionally, you could wait for manual intervention:
        await page.waitForTimeout(30000); // Wait 30 seconds for manual CAPTCHA solving

        // Alternatively, you could pause for debugging:
        // await page.pause();
    } else {
        console.log('No CAPTCHA detected. Continuing with the test.');
    }
}

async function executeRpcPost(apiUrl: string, method: string, params: any[]) {
    console.log('Executing api');
    console.log('Endpoint', apiUrl);

    const headers = {
        'accept': 'application/json',
        'content-type': 'application/json'
    };
    const data = {
        jsonrpc: "2.0",
        id: 1,
        method,
        params
    };
    try {
        const response = await axios.post(apiUrl, data, { headers });
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making the API request:', error);
        throw error;
    }
}

async function executeRpcGet(apiUrl: string, headers ={}) {
    console.log('Executing get api');
    console.log('Endpoint', apiUrl);
    try {
        const response = await axios.get(apiUrl, { headers });
        console.log('Get Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making the API request:', error);
        throw error;
    }
}


let browser: Browser;
let context: any;
let page: Page;
let latestBlock = '';
let nodeSite1Url = '';
let firstTransaction = '';

// Global setup: runs once before all tests
test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.setDefaultTimeout(60000);
});

// Global teardown: runs once after all tests
test.afterAll(async () => {
    const endpoint = nodeSite1Url;
    console.log('endpoint === ', nodeSite1Url)
    await browser.close();
});

// All tests
test.describe('Moralis admin UI scenarios', () => {
    let nodeSite1Url: string = '';
    let actualHomePageTitle: string = '';

    

    test('Login to Moralis Admin', async () => {
        const expectedHomePageTitle = 'Moralis | The Ultimate Web3 Development Platform';
        actualHomePageTitle = await login(context, page, 'rohitmanekar.work@gmail.com', 'Rohit@1986');
        console.log('actualTitle:', actualHomePageTitle);
        expect(actualHomePageTitle).toEqual(expectedHomePageTitle);
    });

    test('Create a Node in Moralis Admin', async () => {
        nodeSite1Url = await createNode(page);
        console.log('node url is', nodeSite1Url);
        expect(nodeSite1Url).not.toBeNull(); // Add an assertion to check if nodeSite1Url is not null or empty
    });

    test('Get the block number', async () => {
        const endpoint = nodeSite1Url;
        console.log('endpoint is - ', endpoint);
        const method = 'eth_blockNumber';
        const params: any[] = [];
        try {
            const result = await executeRpcPost(endpoint, method, params);
            console.log('eth_blockNumber Result:', result);
            expect(result).toBeDefined();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    test('Get the block by number', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getBlockByNumber';
        const params = [
            "latest",
            true
        ];
        try {
            const result = await executeRpcPost(endpoint, method, params);
            console.log('eth_getBlockByNumber Result:', result);
            expect(result).toBeDefined();
            latestBlock = result.result;
        } catch (error) {
            console.error('Error:', error);
        }
    });

    test('Get the Transaction By Hash)', async () => {
        const endpoint = nodeSite1Url;
        const method = 'eth_getTransactionByHash';
        const params = [
            "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3"
        ];
        try {
            const result = await executeRpcPost(endpoint, method, params);
            console.log('eth_getTransactionByHash Result:', result);
            expect(result).toBeDefined();
            firstTransaction = result.result;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

test.describe('Moralis admin UI scenarios', () => {
    //let nodeSite1Url: string = '';
    //let actualHomePageTitle: string = '';
    let apiKey: string = '';

    /* test('Login to Moralis Admin 2', async () => {
        const expectedHomePageTitle = 'Moralis | The Ultimate Web3 Development Platform';
        actualHomePageTitle = await login(context, page, 'rohitmanekar.work@gmail.com', 'Rohit@1986');
        console.log('actualTitle:', actualHomePageTitle);
        expect(actualHomePageTitle).toEqual(expectedHomePageTitle);
    }); */

    test('Get API Key', async () => {
        apiKey = await getAPIKey(page);
        console.log('getAPIKey -- ',getAPIKey);
        expect(getAPIKey).not.toBeNull();
    });

    test('Get the Wallet NFTs', async () => {
        const address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e';
        const chain = 'eth';
        const endpoint = `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&media_items=false`;
        const headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-Key': apiKey
        };
        try {
            const result = await executeRpcGet(endpoint, headers);
            console.log('getWalletNFTs Result:', result);
            expect(result).toBeDefined();
            firstTransaction = result.result;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});