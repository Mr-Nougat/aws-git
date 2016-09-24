var http = require('http');
let server = http.createServer(function (req, res) {
  res.send("Hello World!!!");
  res.end();
  }  
  
  server.listen(80, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});