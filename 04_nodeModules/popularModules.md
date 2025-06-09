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

### Fastify
```javascript
import Fastify from 'fastify';
const fastify = Fastify();

fastify.get('/', async (request, reply) => {
    return { hello: 'welt' };
});

fastify.listen(3000);
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

### Helmet
```javascript
import express from 'express';
import helmet from 'helmet';
const app = express();

app.use(helmet());
```

### JWT
```javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, 'geheim');
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

## Nächste Schritte

Nachdem du die wichtigsten Module kennengelernt hast, kannst du mit dem [FileSystem](../fileSystem/README.md) Modul fortfahren. 