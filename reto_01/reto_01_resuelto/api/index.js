// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end('Connection created');
// });

// server.listen(3000, () => {
//     console.log('Server listening...');
// });

const server = require('./src/db_connection/server');

server.listen(3001, () => {

  console.log(`listening on port 3001`); 

});