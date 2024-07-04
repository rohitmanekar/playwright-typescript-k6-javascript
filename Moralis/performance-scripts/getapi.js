import http from 'k6/http';
import {check} from 'k6';

export const options = {
    vus: 1,
    duration: '1s' ,
}

export default function () {
    const address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjJkNDFkNTZhLWU0YmYtNGZjYS04MzhlLWEyNzUwMzg2MzU4ZCIsIm9yZ0lkIjoiMzk3OTAzIiwidXNlcklkIjoiNDA4ODU5IiwidHlwZUlkIjoiM2FmYTA3ZGYtYTYyYy00ZTAyLTk5ODktMDVlMGYxZmIyN2MxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0MDgxMzEsImV4cCI6NDg3NTE2ODEzMX0.VzJZuvkrVHWXz9m7kxNV-gwirD-67iRrzyDrFsqrF8s';
    const chain = 'eth';
    const endpoint = `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&media_items=false`;
    const params = {
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-Key': apiKey,
        },
    };
    const result = http.get(endpoint, params);
    console.log(result);
    check(result, {
        'is status 200': (r) => r.status === 201,
        'contain status as synced ..': (r) => r.body.includes('SYNCED'),
    });
}

