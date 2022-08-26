const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.development.local') });

exports.handler = async (event, context) => {
  const resp = await fetch(`${process.env.REACT_APP_PROCORE_URL}/api/v1/me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${event.queryStringParameters.token}`,
    },
  });
  const body = await resp.json();
  return { statusCode: 200, body: JSON.stringify(body) };
};
