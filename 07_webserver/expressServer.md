# Express Server in NodeJS

In diesem Abschnitt lernst du, wie man einen Webserver mit dem Express.js Framework implementiert.

## Express.js im Vergleich

Express.js ist eines der ältesten und am weitesten verbreiteten Web-Frameworks für Node.js. Hier ein Vergleich mit anderen populären Frameworks:

| Framework | Stärken | Schwächen | Typische Anwendungsfälle |
|-----------|---------|-----------|--------------------------|
| Express.js | - Einfach zu lernen<br>- Große Community<br>- Viele Middleware<br>- Flexibel | - Wenig Struktur<br>- Keine eingebaute Typsicherheit<br>- Manuelle Fehlerbehandlung | - REST APIs<br>- Kleine bis mittlere Projekte<br>- Prototypen<br>- Legacy-Systeme |
| NestJS | - Typsicherheit<br>- Architektur-Patterns<br>- Dependency Injection<br>- Modulare Struktur | - Steile Lernkurve<br>- Mehr Boilerplate<br>- Komplexer Setup | - Enterprise Apps<br>- Große Projekte<br>- Microservices<br>- TypeScript-Projekte |
| Fastify | - Sehr performant<br>- Low Memory Footprint<br>- Schema-Validierung<br>- Plugin-System | - Kleinere Community<br>- Weniger Middleware<br>- Weniger Dokumentation | - High-Performance APIs<br>- Echtzeit-Anwendungen<br>- Ressourcen-kritische Systeme |
| Koa.js | - Modernes Design<br>- Leichtgewicht<br>- Async/Await<br>- Middleware-Kette | - Weniger Features<br>- Kleinere Community<br>- Weniger Middleware | - Moderne APIs<br>- Middleware-Entwicklung<br>- Experimentelle Projekte |
| Hapi | - Enterprise-Ready<br>- Eingebaute Validierung<br>- Plugin-System<br>- Konfiguration | - Komplexer Setup<br>- Overhead<br>- Weniger Flexibilität | - Enterprise Apps<br>- Große Teams<br>- Regulierte Umgebungen |

### Framework-Auswahl

Die Wahl des Frameworks hängt von verschiedenen Faktoren ab:

1. **Projektgröße und -komplexität**:
   - Express.js: Ideal für kleine bis mittlere Projekte
   - NestJS: Besser für große, komplexe Anwendungen
   - Fastify: Optimal für Performance-kritische Systeme

2. **Team-Erfahrung**:
   - Express.js: Gute Wahl für Einsteiger
   - NestJS: Besser für erfahrene Teams
   - Koa.js: Moderner Ansatz für JavaScript-Experten

3. **Performance-Anforderungen**:
   - Fastify: Höchste Performance
   - Express.js: Ausreichend für die meisten Anwendungen
   - Hapi: Enterprise-Grade Performance

4. **Wartbarkeit**:
   - NestJS: Beste Struktur und Wartbarkeit
   - Express.js: Flexibel, aber weniger strukturiert
   - Hapi: Enterprise-Grade Wartbarkeit


## Grundlegender Express-Server

### Server erstellen

Ein Express-Server wird durch die Erstellung einer Express-Anwendung und das Definieren von Routen aufgebaut. Der folgende Code zeigt die grundlegende Struktur eines Express-Servers mit einer einfachen Route.

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

Das Routing in Express.js ermöglicht es, verschiedene HTTP-Methoden und URL-Pfade zu verarbeiten. Hier sehen wir Beispiele für GET- und POST-Routen, sowie die Verarbeitung von URL-Parametern und Query-Strings.

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

Express.js bietet verschiedene eingebaute Middleware-Funktionen, die häufig benötigte Funktionalitäten bereitstellen. Diese Middleware kann für das Parsen von JSON, URL-encoded Daten und das Ausliefern statischer Dateien verwendet werden.

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

Neben den eingebauten Middleware-Funktionen können auch eigene Middleware-Funktionen erstellt werden. Diese können für Logging, Authentifizierung oder andere benutzerdefinierte Funktionalitäten verwendet werden.

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

Eine robuste Fehlerbehandlung ist essentiell für die Stabilität einer Anwendung. Express.js bietet verschiedene Möglichkeiten, Fehler zu behandeln und zu protokollieren.

- Error Middleware
- Try-Catch Blöcke
- Fehler-Logging
- Benutzerfreundliche Fehlermeldungen

### Performance

Die Performance einer Express.js-Anwendung kann durch verschiedene Optimierungen verbessert werden. Dazu gehören Kompression, Caching, Rate Limiting und die Verwendung asynchroner Handler.

- Compression Middleware
- Caching
- Rate Limiting
- Asynchrone Handler

### Sicherheit

Die Sicherheit einer Express.js-Anwendung sollte durch verschiedene Maßnahmen gewährleistet werden. Dazu gehören die Verwendung von Helmet, CORS-Konfiguration, Input-Validierung und XSS-Schutz.

- Helmet Middleware
- CORS konfigurieren
- Input Validierung
- XSS-Schutz

## Beispiel: REST API

Dieses Beispiel zeigt eine vollständige REST API mit CRUD-Operationen. Es demonstriert die Verwendung von Express.js für die Erstellung einer API mit In-Memory-Datenbank.

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

## Weitere Middleware-Beispiele

### Request-Validierung mit Joi

Die Validierung von eingehenden Requests ist eine wichtige Sicherheitsmaßnahme. Hier ein Beispiel mit der Joi-Bibliothek für Schema-Validierung:

```javascript
import express from 'express';
import Joi from 'joi';

const app = express();
app.use(express.json());

// Validierungsschema
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(0).max(120),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

// Validierungs-Middleware
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details.map(detail => detail.message)
        });
    }
    next();
};

// Geschützte Route mit Validierung
app.post('/api/users', validateUser, (req, res) => {
    // Daten sind validiert, sicher verarbeiten
    res.status(201).json({
        message: 'Benutzer erstellt',
        user: req.body
    });
});
```

### API-Rate Limiting

Rate Limiting verhindert Missbrauch der API durch zu viele Anfragen. Hier ein Beispiel mit der `express-rate-limit` Middleware:

```javascript
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

// Rate Limiter konfigurieren
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100, // Limit pro IP
    message: {
        error: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut'
    },
    standardHeaders: true, // Rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate Limiter auf alle API-Routen anwenden
app.use('/api/', apiLimiter);

// Spezieller Limiter für Login-Versuche
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Stunde
    max: 5, // 5 Versuche pro Stunde
    message: {
        error: 'Zu viele Login-Versuche, bitte versuchen Sie es später erneut'
    }
});

// Login-Route mit speziellem Limiter
app.post('/api/login', loginLimiter, (req, res) => {
    // Login-Logik hier
    res.json({ message: 'Login erfolgreich' });
});

// Beispiel für eine geschützte API-Route
app.get('/api/protected', apiLimiter, (req, res) => {
    res.json({ message: 'Geschützte Ressource' });
});
```

## Nächste Schritte

Nachdem du die Grundlagen des Express-Servers kennengelernt hast, kannst du mit dem [Performance & Asynchrone Callbacks](performance.md) Modul fortfahren, um die Performance-Optimierung zu lernen. 