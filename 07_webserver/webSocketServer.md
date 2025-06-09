# WebSocket-Server in NodeJS

WebSockets ermöglichen eine bidirektionale, Echtzeit-Kommunikation zwischen Client und Server. Im Gegensatz zu HTTP, das auf Request-Response basiert, bleibt die WebSocket-Verbindung offen und erlaubt kontinuierlichen Datenaustausch.

## Installation

```bash
npm install ws
```

## Grundlegender WebSocket-Server

```javascript
const WebSocket = require('ws');

// Server erstellen
const wss = new WebSocket.Server({ port: 8080 });

// Verbindungs-Handler
wss.on('connection', function connection(ws) {
    console.log('Neue Verbindung hergestellt');

    // Nachrichten-Handler
    ws.on('message', function incoming(message) {
        console.log('Empfangene Nachricht:', message.toString());
        
        // Echo zurück an den Client
        ws.send(`Server hat empfangen: ${message}`);
    });

    // Verbindungsabbruch-Handler
    ws.on('close', function close() {
        console.log('Verbindung geschlossen');
    });

    // Fehler-Handler
    ws.on('error', function error(err) {
        console.error('WebSocket Fehler:', err);
    });
});

console.log('WebSocket-Server läuft auf Port 8080');
```

## Erweiterte Funktionen

### 1. Broadcast an alle Clients

```javascript
// Broadcast-Funktion
function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Verwendung im message-Handler
ws.on('message', function incoming(message) {
    broadcast(message.toString());
});
```

### 2. Client-Verwaltung

```javascript
// Client-Informationen speichern
const clients = new Map();

wss.on('connection', function connection(ws) {
    const id = Date.now();
    clients.set(id, ws);

    // Client-ID senden
    ws.send(JSON.stringify({
        type: 'connection',
        id: id
    }));

    // Client entfernen bei Verbindungsabbruch
    ws.on('close', function close() {
        clients.delete(id);
    });
});
```

### 3. Nachrichten-Typen

```javascript
// Nachrichten-Struktur
const messageTypes = {
    CHAT: 'chat',
    SYSTEM: 'system',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left'
};

// Nachrichten-Handler
ws.on('message', function incoming(message) {
    try {
        const data = JSON.parse(message);
        
        switch(data.type) {
            case messageTypes.CHAT:
                handleChatMessage(data);
                break;
            case messageTypes.SYSTEM:
                handleSystemMessage(data);
                break;
            default:
                console.log('Unbekannter Nachrichtentyp:', data.type);
        }
    } catch (err) {
        console.error('Fehler beim Verarbeiten der Nachricht:', err);
    }
});
```

## Sicherheit

### 1. Authentifizierung

```javascript
const wss = new WebSocket.Server({ 
    port: 8080,
    verifyClient: function(info, callback) {
        // Token aus URL-Parametern extrahieren
        const token = new URL(info.req.url, 'ws://localhost').searchParams.get('token');
        
        if (isValidToken(token)) {
            callback(true);
        } else {
            callback(false, 401, 'Unauthorized');
        }
    }
});
```

### 2. Rate Limiting

```javascript
const rateLimit = new Map();

wss.on('connection', function connection(ws, req) {
    const ip = req.socket.remoteAddress;
    const limit = {
        count: 0,
        lastReset: Date.now()
    };
    
    rateLimit.set(ip, limit);

    ws.on('message', function incoming(message) {
        const now = Date.now();
        const userLimit = rateLimit.get(ip);

        // Limit zurücksetzen nach 1 Minute
        if (now - userLimit.lastReset > 60000) {
            userLimit.count = 0;
            userLimit.lastReset = now;
        }

        // Prüfen ob Limit überschritten
        if (userLimit.count > 100) {
            ws.close(1008, 'Rate limit exceeded');
            return;
        }

        userLimit.count++;
        // Nachricht verarbeiten...
    });
});
```

## Beispiel: Chat-Anwendung

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Benutzer-Verwaltung
const users = new Map();

wss.on('connection', function connection(ws) {
    let userId = null;

    // Benutzer-Anmeldung
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if (data.type === 'login') {
            userId = data.userId;
            users.set(userId, {
                ws: ws,
                name: data.name
            });

            // Anmeldung broadcasten
            broadcast({
                type: 'system',
                message: `${data.name} ist dem Chat beigetreten`
            });
        }
        else if (data.type === 'chat') {
            // Chat-Nachricht broadcasten
            broadcast({
                type: 'chat',
                userId: userId,
                name: users.get(userId).name,
                message: data.message
            });
        }
    });

    // Verbindungsabbruch
    ws.on('close', function close() {
        if (userId) {
            const user = users.get(userId);
            users.delete(userId);
            
            broadcast({
                type: 'system',
                message: `${user.name} hat den Chat verlassen`
            });
        }
    });
});

function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
```

## Best Practices

1. **Fehlerbehandlung**
   - Implementiere robuste Fehlerbehandlung
   - Logge Fehler für Debugging
   - Sende aussagekräftige Fehlermeldungen an Clients

2. **Verbindungsmanagement**
   - Überwache Verbindungsstatus
   - Implementiere Reconnect-Logik
   - Setze Timeouts für inaktive Verbindungen

3. **Nachrichtenverarbeitung**
   - Validiere eingehende Nachrichten
   - Nutze strukturierte Nachrichtenformate (JSON)
   - Implementiere Nachrichten-Queuing bei hoher Last

4. **Skalierung**
   - Nutze Load Balancing für mehrere Server
   - Implementiere Clustering für horizontale Skalierung
   - Verwende Redis für Server-übergreifende Kommunikation

## Debugging

```javascript
// Debug-Logging
wss.on('connection', function connection(ws) {
    console.log('Neue Verbindung');
    
    ws.on('message', function incoming(message) {
        console.log('Nachricht empfangen:', message.toString());
    });

    ws.on('error', function error(err) {
        console.error('WebSocket Fehler:', err);
    });

    ws.on('close', function close() {
        console.log('Verbindung geschlossen');
    });
});
``` 