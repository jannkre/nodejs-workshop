# Express Server in NodeJS

In diesem Abschnitt lernst du, wie man einen Webserver mit dem Express.js Framework implementiert.

## Lernziele

- Express.js Server erstellen
- Routing implementieren
- Middleware nutzen
- Statische Dateien ausliefern

## Grundlegender Express-Server

### Server erstellen
```javascript
import express from 'express';

const app = express();
const port = 3000;

// Einfache Route
app.get('/', (req, res) => {
    res.send('Hallo Welt!');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
```

## Routing

### Basis-Routing
```javascript
import express from 'express';

const app = express();

// GET-Route
app.get('/about', (req, res) => {
    res.send('Über uns');
});

// POST-Route
app.post('/submit', (req, res) => {
    res.send('Daten empfangen');
});

// Route mit Parametern
app.get('/user/:id', (req, res) => {
    res.send(`Benutzer ID: ${req.params.id}`);
});

// Query-Parameter
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Suche nach: ${query}`);
});
```

## Middleware

### Eingebaute Middleware
```javascript
import express from 'express';

const app = express();

// JSON-Parser
app.use(express.json());

// URL-encoded Parser
app.use(express.urlencoded({ extended: true }));

// Statische Dateien
app.use(express.static('public'));

// Beispiel-Route mit JSON
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});
```

### Eigene Middleware
```javascript
import express from 'express';

const app = express();

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token === 'secret-token') {
        next();
    } else {
        res.status(401).json({ error: 'Nicht autorisiert' });
    }
};

// Geschützte Route
app.get('/protected', authMiddleware, (req, res) => {
    res.send('Geschützter Bereich');
});
```

## Best Practices

### Fehlerbehandlung
- Error Middleware
- Try-Catch Blöcke
- Fehler-Logging
- Benutzerfreundliche Fehlermeldungen

### Performance
- Compression Middleware
- Caching
- Rate Limiting
- Asynchrone Handler

### Sicherheit
- Helmet Middleware
- CORS konfigurieren
- Input Validierung
- XSS-Schutz

## Beispiel: REST API

```javascript
import express from 'express';

const app = express();
app.use(express.json());

// In-Memory Datenbank
const items = new Map();

// GET alle Items
app.get('/api/items', (req, res) => {
    res.json(Array.from(items.values()));
});

// GET einzelnes Item
app.get('/api/items/:id', (req, res) => {
    const item = items.get(req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item nicht gefunden' });
    }
});

// POST neues Item
app.post('/api/items', (req, res) => {
    const id = Date.now().toString();
    const item = { id, ...req.body };
    items.set(id, item);
    res.status(201).json(item);
});

// PUT Item aktualisieren
app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    if (items.has(id)) {
        const item = { id, ...req.body };
        items.set(id, item);
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item nicht gefunden' });
    }
});

// DELETE Item
app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    if (items.has(id)) {
        items.delete(id);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Item nicht gefunden' });
    }
});

app.listen(3000, () => {
    console.log('API-Server läuft auf http://localhost:3000');
});
```

## Nächste Schritte

Nachdem du die Grundlagen des Express-Servers kennengelernt hast, kannst du mit dem [Performance & Asynchrone Callbacks](performance.md) Modul fortfahren, um die Performance-Optimierung zu lernen. 