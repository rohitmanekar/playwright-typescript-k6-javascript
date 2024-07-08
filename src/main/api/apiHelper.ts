const request = require('request-promise-native');

// Executing post request
export async function executeRpcPost(apiUrl: string, method: string, params: any[]) {
  console.log('Executing POST API:', apiUrl);
  const options = {
    method: 'POST',
    uri: apiUrl,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    body: {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    },
    json: true,
    resolveWithFullResponse: true,
    simple: false, // Prevents request from throwing on 4xx and 5xx statuses
  };
  try {
    const response = await request(options);
    console.log(response.body);
    return {
      status: response.statusCode,
      body: response.body,
    };
  } catch (error) {
    console.error('Error making the API request:', error);
    throw error;
  }
}

// Executing get request
export async function executeRpcGet(apiUrl: string, headers = {}) {
  console.log('Executing GET API:', apiUrl);
  const options = {
    method: 'GET',
    uri: apiUrl,
    headers: headers,
    json: true,
    resolveWithFullResponse: true,
    simple: false, 
  };
  try {
    const response = await request(options);
    console.log(response.body);
    return {
      status: response.statusCode,
      body: response.body,
    };
  } catch (error) {
    console.error('Error making the API request:', error);
    throw error;
  }
}
