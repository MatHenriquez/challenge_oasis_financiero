const server = require('./src/db_connection/server');

server.listen(3001, () => {

  console.log(`listening on port 3001`); 

});