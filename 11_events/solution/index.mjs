import { WebSocketServer } from 'ws';
import { logWatcher } from './lib/fileWatcher.mjs';

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server is running on port 8080');

// Store all connected clients
const clients = new Set();

// Handle new connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Send initial message
    ws.send(JSON.stringify({
        type: 'system',
        message: 'Connected to log monitor'
    }));

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

// Listen for log changes
logWatcher.on('logChange', (logContent) => {
    // Broadcast the log update to all connected clients
    const message = JSON.stringify({
        type: 'log',
        content: logContent,
        timestamp: new Date().toISOString()
    });

    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});

// Handle errors from the log watcher
logWatcher.on('error', (error) => {
    console.error('Error in log watcher:', error);
});
