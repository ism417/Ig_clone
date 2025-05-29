const WebSocket = require('ws');
const url = require('url');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3001 }); // Use port 3001 for WebSocket server

console.log("WebSocket server is running on ws://localhost:3001");

wss.on('connection', (ws, req) => {
    // Parse the conversation ID from the URL
    const query = url.parse(req.url, true).query;
    const convoId = query.convoId;

    console.log(`Client connected to convoId: ${convoId}`);

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Message received for convoId ${convoId}: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log(`Client disconnected from convoId: ${convoId}`);
    });
});