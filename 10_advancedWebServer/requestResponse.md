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

## Error-Handling

### Try-Catch

```javascript
app.get('/api/error', async (req, res) => {
    try {
        // Fehleranfällige Operation
        throw new Error('Ein Fehler ist aufgetreten');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### Error-Middleware

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Interner Server-Fehler' });
});
```

## Best Practices

1. **Validierung**
   - Request-Daten validieren
   - Fehler früh abfangen
   - Klare Fehlermeldungen

2. **Sicherheit**
   - Input sanitization
   - Rate limiting
   - CORS-Konfiguration

3. **Performance**
   - Response-Compression
   - Caching-Header
   - Asynchrone Verarbeitung

## Nächste Schritte

Nach Abschluss dieses Moduls kannst du mit dem [EJS Templating](templating.md) Modul fortfahren. 