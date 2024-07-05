import { env } from 'k6';

export const config = {
  urls: {
    login: 'https://admin.moralis.io/login',
    nftApi: (address, chain) => `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&media_items=false`,
    nodesiteurl: 'https://site1.moralis-nodes.com/eth/286e93da330b489796179bda0cd400a9',
  },
  credentials: {
    username: 'rohitmanekar.work@gmail.com',
    password: 'Rohit@1986',
  },
  apiMethods: {
    method_blockNumber: 'eth_blockNumber',

  },
  performanceParams: {
    vus: parseInt(__ENV.VUS) || 1,
    duration: __ENV.DURATION || '1s',
    address: __ENV.ADDRESS || '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e',
    apiKey: __ENV.API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjJkNDFkNTZhLWU0YmYtNGZjYS04MzhlLWEyNzUwMzg2MzU4ZCIsIm9yZ0lkIjoiMzk3OTAzIiwidXNlcklkIjoiNDA4ODU5IiwidHlwZUlkIjoiM2FmYTA3ZGYtYTYyYy00ZTAyLTk5ODktMDVlMGYxZmIyN2MxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0MDgxMzEsImV4cCI6NDg3NTE2ODEzMX0.VzJZuvkrVHWXz9m7kxNV-gwirD-67iRrzyDrFsqrF8s',
    chain: __ENV.CHAIN || 'eth',
  },

};
