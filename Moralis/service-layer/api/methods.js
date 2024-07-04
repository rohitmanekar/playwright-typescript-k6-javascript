import { test, expect, Browser, Page } from '@playwright/test';
import { Context } from 'vm';
const { Request } = require('@playwright/test');
const { chromium } = require('playwright-extra');
const axios = require('axios');

async function executeRpcPost(apiUrl, method, params) {
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