import http from 'k6/http';
import { check } from 'k6';
import { config } from '../../main/config/performance-config.js';

export const options = {
    vus: config.performanceParams.vus,
    duration: config.performanceParams.duration,
};

export default function () {
    const params = {
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-Key': config.performanceParams.apiKey,
        },
    };
    const result = http.get(config.urls.nftApi(config.performanceParams.address, config.performanceParams.chain), params);
    check(result, {
        'is status 200': (r) => r.status === 200,
        'contain status as synced ..': (r) => r.body.includes('SYNCED'),
    });
}