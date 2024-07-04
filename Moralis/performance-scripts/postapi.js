import http from 'k6/http';
import {check} from 'k6';

export const options = {
    vus: 1,
    duration: '1s' ,
}
 
export default function () {
    const endpoint = 'https://site1.moralis-nodes.com/eth/286e93da330b489796179bda0cd400a9';
    const method = 'eth_blockNumber';
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
    try{
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

