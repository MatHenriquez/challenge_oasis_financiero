const http = require('http');

const word = 'example';

const apiUrl = 'https://api.dictionaryapi.dev'

const options = {
  hostname: 'localhost',
  port: 80,
  path: `${apiUrl}/api/v2/entries/en/${word}`,
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const jsonResponse = JSON.parse(data);
    console.log(jsonResponse);
  });
});

req.on('error', (error) => {
  console.error(`Error making API request: ${error}`);
});

req.end();
