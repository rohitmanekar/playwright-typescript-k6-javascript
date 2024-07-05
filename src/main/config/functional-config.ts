export const config = {
    urls: {
      login: 'https://admin.moralis.io/login',
      nftApi: (address: string, chain: string) => `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=${chain}&format=decimal&media_items=false`,
    },
    credentials: {
      username: 'rohitmanekar.work@gmail.com',
      password: 'Rohit@1986',
    },
    walletinfo: {
      address: '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e',
      chain:'eth',
    },
    apiKey: '', // To be set dynamically  
  };
