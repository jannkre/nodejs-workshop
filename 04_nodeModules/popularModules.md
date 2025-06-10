# Populäre Module

In diesem Abschnitt lernst du die wichtigsten und am häufigsten verwendeten NodeJS-Module kennen.

## Lernziele

- Kennenlernen wichtiger Module
- Verstehen der Anwendungsfälle
- Best Practices für die Verwendung
- Sicherheitsaspekte

## Web-Frameworks

### Express.js
```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hallo Welt!');
});

app.listen(3000);
```

## Umgebungsvariablen & Konfiguration

### dotenv
```javascript
import dotenv from 'dotenv';
dotenv.config();

// Zugriff auf Umgebungsvariablen
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

### config
```javascript
import config from 'config';

// Konfiguration aus verschiedenen Umgebungen
const dbConfig = config.get('database');
const serverConfig = config.get('server');

// Beispiel: config/default.json
// {
//   "database": {
//     "host": "localhost",
//     "port": 5432
//   }
// }
```

## Datenbank-Integration

### Mongoose (MongoDB)
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);
```

### Sequelize (SQL)
```javascript
import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('database', 'user', 'password');

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
});
```

## Utility-Module

### Lodash
```javascript
import _ from 'lodash';

const users = [
    { name: 'Max', age: 30 },
    { name: 'Anna', age: 25 }
];

const names = _.map(users, 'name');
```

### Moment.js
```javascript
import moment from 'moment';

const jetzt = moment();
const morgen = moment().add(1, 'days');
```

## Sicherheit

### JWT
```javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, 'geheim');
```

### bcrypt
```javascript
import bcrypt from 'bcrypt';

// Passwort hashen
const hashedPassword = await bcrypt.hash('myPassword', 10);

// Passwort verifizieren
const isMatch = await bcrypt.compare('myPassword', hashedPassword);
```

## HTTP/Network

### node-fetch
```javascript
import fetch from 'node-fetch';

// GET Request
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST Request
const postResponse = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John',
        email: 'john@example.com'
    })
});
```

## Best Practices

- Regelmäßige Updates
- Sicherheitsaudits
- Performance-Monitoring
- Dokumentation lesen
- Lizenzprüfung


## Weitere nützliche Module

| Kategorie | Modul | Beschreibung | Typische Anwendung |
|-----------|-------|--------------|-------------------|
| **Datei-Operationen** | multer | Middleware für Datei-Uploads | Formulare mit Datei-Upload |
| | sharp | Bildverarbeitung und -optimierung | Bildgrößen anpassen, Formate konvertieren |
| | csv-parser | CSV-Dateien verarbeiten | Datenimport/Export |
| | exceljs | Excel-Dateien erstellen und lesen | Berichte generieren |
| **Validierung & Formatierung** | validator | String-Validierung und -Sanitization | Formularvalidierung |
| | date-fns | Moderne Datums-Manipulation | Datumsberechnungen |
| | uuid | Generierung von eindeutigen IDs | Datenbank-Primary-Keys |
| | chalk | Farbige Konsolenausgaben | CLI-Tools |
| **Entwicklung & Testing** | nodemon | Automatischer Neustart bei Änderungen | Entwicklung |
| | mocha | Test-Framework | Unit-Tests |
| | chai | Assertion-Bibliothek | Test-Assertions |
| | supertest | HTTP-Testing | API-Tests |
| **Performance & Caching** | compression | Gzip-Komprimierung | Response-Optimierung |
| | redis | In-Memory-Datenbank | Caching, Session-Management |
| | node-cache | Einfaches In-Memory-Caching | Lokales Caching |
| | bull | Job-Queue und Background-Processing | Asynchrone Tasks |
| **Logging & Monitoring** | morgan | HTTP-Request-Logging | Access-Logs |
| | debug | Debugging-Tool | Entwicklung |
| | newrelic | Application Performance Monitoring | Performance-Tracking |
| | sentry | Error-Tracking | Fehlerüberwachung |
| **API & Integration** | swagger-ui-express | API-Dokumentation | API-Docs |
| | socket.io | Echtzeit-Kommunikation | Chat, Live-Updates |
| | nodemailer | E-Mail-Versand | E-Mail-Versand |
| | stripe | Payment-Processing | Zahlungsabwicklung |
| **Sicherheit** | cors | Cross-Origin Resource Sharing | API-Sicherheit |
| | rate-limiter-flexible | Rate-Limiting | DDoS-Schutz |
| | sanitize-html | HTML-Sanitization | XSS-Schutz |
| | express-rate-limit | Request-Limiting | API-Limits |
| **Datenverarbeitung** | cheerio | HTML-Parsing und -Manipulation | Web-Scraping |
| | xml2js | XML-Parsing | XML-Verarbeitung |
| | jsdom | DOM-Manipulation | Server-seitiges DOM |
| | pdfkit | PDF-Generierung | PDF-Erstellung |
| **Deployment & DevOps** | pm2 | Process Manager | Production-Deployment |
| | cross-env | Cross-Platform Umgebungsvariablen | Umgebungsvariablen |
| | husky | Git Hooks | Pre-commit Checks |
| | dotenv-cli | CLI für dotenv | Umgebungsvariablen-CLI |
| **Datenbank-Tools** | knex | SQL Query Builder | Datenbankabfragen |
| | typeorm | TypeScript ORM | TypeScript-Projekte |
| | mongoose-paginate-v2 | Pagination für Mongoose | MongoDB-Pagination |
| | sequelize-cli | CLI für Sequelize | Datenbank-Migrationen |
| **Utility & Helper** | commander | CLI-Argument-Parsing | CLI-Tools |
| | inquirer | Interaktive CLI | Benutzerinteraktion |
| | ora | Elegante Terminal-Spinner | Ladeanimationen |
| | boxen | Boxen in der Konsole | Konsolenausgaben |

## Best Practices

- Regelmäßige Updates
- Sicherheitsaudits
- Performance-Monitoring
- Dokumentation lesen
- Lizenzprüfung

## Nächste Schritte

Nachdem du die wichtigsten Module kennengelernt hast, kannst du mit dem [FileSystem](../fileSystem/README.md) Modul fortfahren. 