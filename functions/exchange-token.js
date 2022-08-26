const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.development.local') });

exports.handler = async (event, context) => {
  const resp = await fetch(`${process.env.REACT_APP_PROCORE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_PROCORE_CLIENT,
      client_secret: process.env.REACT_APP_PROCORE_SECRET,
      code: event.queryStringParameters.code,
      redirect_uri: process.env.REACT_APP_PROCORE_CALLBACK,
      refresh_token: 'string',
    }),
  });
  const body = await resp.json();
  console.log(body);
  return { statusCode: 200, body: JSON.stringify(body) };
};
