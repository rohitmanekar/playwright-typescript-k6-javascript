//@ts-ignore
import http from 'k6/http';
import { check } from 'k6';
import { config } from '../../main/config/performance-config.js';

export const options = {
    vus: config.performanceParams.vus,
    duration: config.performanceParams.duration,
};

export default function () {
    const endpoint = config.urls.nodesiteurl;
    const method = config.apiMethods.method_blockNumber;
    const params = {
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
    };
    const payload = JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
    });
    try {
        const result = http.post(endpoint, payload, params);
        console.log(result);
        check(result, {
            'is status 200': (r) => r.status === 200,
            'contain jsonrpc as synced': (r) => r.body.includes('2.0'),
        });
    } catch (error) {
        console.error('Error making the API request:  ', error);
        throw error;
    }
}