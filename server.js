const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require("path")

const port = 6969;
const app = express(); // Create an Express app
const server = http.createServer(app); // Pass the Express app to createServer
const wss = new WebSocket.Server({ server });

// Handle '/' route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`);
});
