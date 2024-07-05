import axios from 'axios';

export async function executeRpcPost(apiUrl: string, method: string, params: any[]) {
  console.log('Executing API:', apiUrl);

  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
  };
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
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

export async function executeRpcGet(apiUrl: string, headers = {}) {
  console.log('Executing GET API:', apiUrl);

  try {
    const response = await axios.get(apiUrl, { headers });
    console.log('GET Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making the API request:', error);
    throw error;
  }
}
