// Create web server
// 1. Create a web server
// 2. Define a route
// 3. Read data from file
// 4. Send data to client
// 5. Handle errors

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Define route
  if (req.url === '/comments' && req.method === 'GET') {
    // Read data from file
    fs.readFile(
      path.join(__dirname, 'data', 'comments.json'),
      'utf-8',
      (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Internal server error' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      }
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});