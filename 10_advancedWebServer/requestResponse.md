# Request & Response mit Express

In diesem Modul lernst du, wie man HTTP-Anfragen und -Antworten in Express.js-Anwendungen verarbeitet.

## Lernziele

- HTTP-Anfragen (GET, POST, PUT, DELETE) verarbeiten
- Request-Parameter extrahieren (Query, Body, Route)
- Verschiedene Response-Typen senden
- Datei-Uploads verwalten
- Fehlerbehandlung implementieren

## Basis-Setup

```javascript
import express from 'express';
const app = express();

// Middleware für JSON und URL-encoded Daten
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statische Dateien
app.use(express.static('public'));
```

## Request-Handling

### Query-Parameter

```javascript
app.get('/search', (req, res) => {
    const { query, page = 1 } = req.query;
    // Verarbeitung der Suchparameter
    res.json({ results: [], page });
});
```

### Route-Parameter

```javascript
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    // Benutzer mit ID finden
    res.json({ id, name: 'Max Mustermann' });
});
```

### Request-Body

```javascript
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    // Neuen Benutzer erstellen
    res.status(201).json({ id: 1, name, email });
});
```

### Datei-Upload

```javascript
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    // Datei verarbeiten
    res.json({ filename: file.originalname });
});
```

## Response-Handling

### JSON-Response

```javascript
app.get('/api/data', (req, res) => {
    res.json({ data: [] });
});
```

### Status-Codes

```javascript
app.post('/api/resource', (req, res) => {
    // Ressource erstellen
    res.status(201).json({ id: 1 });
});

app.get('/api/not-found', (req, res) => {
    res.status(404).json({ error: 'Nicht gefunden' });
});
```

### Redirects

```javascript
app.get('/old-path', (req, res) => {
    res.redirect('/new-path');
});
```

### File-Download

```javascript
app.get('/download', (req, res) => {
    res.download('path/to/file.pdf');
});
```

### Streaming

```javascript
app.get('/stream', (req, res) => {
    const stream = createReadStream('large-file.txt');
    stream.pipe(res);
});
```

### Server-Sent Events (SSE)

Server-Sent Events ermöglichen es, Daten vom Server zum Client zu streamen. Im Gegensatz zu WebSockets ist SSE unidirektional und basiert auf HTTP. Hier ein Beispiel für einen Event-Stream:

```javascript
// Server-seitige Implementierung
app.get('/events', (req, res) => {
    // Header für SSE setzen
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Heartbeat senden
    const heartbeat = setInterval(() => {
        res.write('event: ping\n');
        res.write('data: ' + new Date().toISOString() + '\n\n');
    }, 30000);

    // Beispiel: Daten-Stream
    const dataStream = setInterval(() => {
        const data = {
            time: new Date().toISOString(),
            value: Math.random() * 100
        };
        
        res.write(`event: update\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);

    // Cleanup bei Verbindungsabbruch
    req.on('close', () => {
        clearInterval(heartbeat);
        clearInterval(dataStream);
    });
});
```

Client-seitige Implementierung:

```javascript
// Client-seitiger Code
const eventSource = new EventSource('/events');

// Event-Listener für verschiedene Event-Typen
eventSource.addEventListener('update', (event) => {
    const data = JSON.parse(event.data);
    console.log('Neue Daten:', data);
});

eventSource.addEventListener('ping', (event) => {
    console.log('Server ist aktiv:', event.data);
});

// Fehlerbehandlung
eventSource.onerror = (error) => {
    console.error('EventSource Fehler:', error);
    eventSource.close();
};
```

### SSE vs. WebSocket Vergleich

| Aspekt | Server-Sent Events (SSE) | WebSocket |
|--------|-------------------------|-----------|
| Richtung | Unidirektional (Server → Client) | Bidirektional |
| Protokoll | HTTP | WS/WSS |
| Reconnect | Automatisch | Manuell |
| Browser-Support | Gut | Sehr gut |
| Overhead | Gering | Höher |
| Beste Anwendung | Echtzeit-Updates, Live-Daten | Echtzeit-Kommunikation, Chat |

### Best Practices für SSE

1. **Verbindungsmanagement**
   - Heartbeats implementieren
   - Reconnect-Logik
   - Verbindungsabbruch behandeln

2. **Performance**
   - Event-Queue optimieren
   - Datenmenge kontrollieren
   - Caching-Header setzen

3. **Fehlerbehandlung**
   - Timeout-Handling
   - Fehler-Events senden
   - Graceful Degradation

## Error-Handling

### 1. Lokale Fehlerbehandlung (Try-Catch)

Die lokale Fehlerbehandlung mit try-catch ist ideal für spezifische Fehler in einzelnen Routen. Sie ermöglicht eine präzise Fehlerbehandlung und benutzerdefinierte Fehlermeldungen:

```javascript
// Beispiel: Fehlerbehandlung in einer Route
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                error: 'Benutzer nicht gefunden',
                code: 'USER_NOT_FOUND'
            });
        }
        res.json(user);
    } catch (error) {
        // Spezifische Fehlerbehandlung
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Ungültige Daten',
                details: error.message
            });
        }
        // Unerwartete Fehler
        console.error('Unerwarteter Fehler:', error);
        res.status(500).json({ 
            error: 'Interner Server-Fehler',
            code: 'INTERNAL_ERROR'
        });
    }
});
```

### 2. Globale Fehlerbehandlung (Error Middleware)

Die globale Fehlerbehandlung fängt alle nicht behandelten Fehler ab. Sie sollte als letzte Middleware definiert werden:

```javascript
// Error Middleware (muss nach allen Routen definiert werden)
app.use((err, req, res, next) => {
    // Logging
    console.error('Fehler aufgetreten:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    // Fehlertyp-basierte Antworten
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validierungsfehler',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Nicht autorisiert',
            message: 'Bitte melden Sie sich an'
        });
    }

    // Standard-Fehlerantwort
    res.status(500).json({
        error: 'Interner Server-Fehler',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Ein Fehler ist aufgetreten'
    });
});
```

### 3. Asynchrone Fehlerbehandlung

Für asynchrone Funktionen bietet Express eine spezielle Fehlerbehandlung. Hier ein Beispiel mit einem Wrapper:

```javascript
// Async Error Handler Wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Verwendung in Routen
app.get('/api/async-data', asyncHandler(async (req, res) => {
    const data = await fetchData();
    if (!data) {
        throw new Error('Daten nicht gefunden');
    }
    res.json(data);
}));
```

### 4. Best Practices für Error-Handling

1. **Fehlerstruktur**
   - Konsistente Fehlerformate
   - Aussagekräftige Fehlercodes
   - Detaillierte Fehlermeldungen (nur in Development)

2. **Logging**
   - Strukturiertes Error-Logging
   - Kontext-Informationen
   - Stack Traces (nur in Development)

3. **Sicherheit**
   - Keine sensiblen Daten in Fehlermeldungen
   - Rate Limiting für Fehler-Endpunkte
   - CORS für Fehler-Responses

4. **Monitoring**
   - Fehler-Tracking
   - Performance-Metriken
   - Alert-System

## Nächste Schritte

Nach Abschluss dieses Moduls kannst du mit dem [EJS Templating](templating.md) Modul fortfahren.