# API-Testing in NodeJS

## Einführung

API-Testing ist ein wichtiger Teil der Qualitätssicherung. In diesem Modul lernst du, wie du APIs mit Postman und CLI-Tools testen kannst.

## Postman

### 1. Installation und Einrichtung

1. [Postman herunterladen](https://www.postman.com/downloads/)
2. Account erstellen (optional)
3. Workspace einrichten

### 2. Erste API-Tests

```javascript
// Beispiel-API-Endpunkte
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

#### Collection erstellen

1. Neue Collection "User API Tests"
2. Environment-Variablen definieren:
   - `baseUrl`: http://localhost:3000
   - `token`: Bearer Token für Auth

#### Request-Beispiele

```javascript
// GET /api/users
GET {{baseUrl}}/api/users
Authorization: Bearer {{token}}

// POST /api/users
POST {{baseUrl}}/api/users
Authorization: Bearer {{token}}
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com"
}
```

### 3. Tests schreiben

```javascript
// Tests für GET /api/users
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Users array is not empty", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    pm.expect(jsonData.length).to.be.greaterThan(0);
});

// Tests für POST /api/users
pm.test("User created successfully", function () {
    pm.response.to.have.status(201);
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData.name).to.eql("Test User");
});
```

### 4. Test-Suiten

```javascript
// Pre-request Script
pm.environment.set("timestamp", new Date().getTime());

// Tests
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Response has required headers", function () {
    pm.response.to.have.header("Content-Type");
    pm.response.to.have.header("X-Request-ID");
});
```

## CLI-basiertes API-Testing

### 1. curl

```bash
# GET Request
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"

# POST Request
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

### 2. Newman (Postman CLI)

```bash
# Collection ausführen
newman run collection.json -e environment.json

# Mit Report
newman run collection.json -e environment.json -r cli,html
```

### 3. Jest mit Supertest

```javascript
// api.test.js
import request from 'supertest';
import app from './app';

describe('User API', () => {
    let authToken;

    beforeAll(async () => {
        // Login und Token holen
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password'
            });
        authToken = response.body.token;
    });

    test('GET /api/users', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /api/users', async () => {
        const newUser = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
    });
});
```

## Automatisierte API-Tests

### 1. CI/CD Integration

```yaml
# .github/workflows/api-tests.yml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16.x'
      - run: npm install
      - run: npm test
      - name: Run API Tests
        run: newman run collection.json -e environment.json
```

### 2. Test-Reporte

```javascript
// jest.config.js
module.exports = {
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'reports/junit',
            outputName: 'junit.xml',
            classNameTemplate: '{classname}',
            titleTemplate: '{title}'
        }]
    ]
};
```

## Best Practices

1. **Test-Organisation**
   - Klare Test-Struktur
   - Wiederverwendbare Tests
   - Umgebungsvariablen nutzen

2. **Test-Abdeckung**
   - Happy Path
   - Error Cases
   - Edge Cases

3. **Wartbarkeit**
   - DRY (Don't Repeat Yourself)
   - Klare Test-Beschreibungen
   - Regelmäßige Updates

## Übung

Erstelle eine Postman-Collection für eine Todo-API:

```javascript
// Todo API Endpoints
GET    /api/todos
POST   /api/todos
GET    /api/todos/:id
PUT    /api/todos/:id
DELETE /api/todos/:id
```

Lösung:

```javascript
// Todo API Tests
// GET /api/todos
pm.test("Todos werden geladen", function () {
    pm.response.to.have.status(200);
    const todos = pm.response.json();
    pm.expect(todos).to.be.an('array');
});

// POST /api/todos
pm.test("Todo wird erstellt", function () {
    pm.response.to.have.status(201);
    const todo = pm.response.json();
    pm.expect(todo).to.have.property('id');
    pm.expect(todo.title).to.eql(pm.request.body.title);
});

// PUT /api/todos/:id
pm.test("Todo wird aktualisiert", function () {
    pm.response.to.have.status(200);
    const todo = pm.response.json();
    pm.expect(todo.completed).to.be.true;
});

// DELETE /api/todos/:id
pm.test("Todo wird gelöscht", function () {
    pm.response.to.have.status(204);
});
```

## Nächste Schritte

1. **Vertiefung**
   - Performance-Testing
   - Security-Testing
   - Load-Testing

2. **Tools**
   - JMeter
   - K6
   - Artillery

3. **Best Practices**
   - API-Dokumentation
   - Versionierung
   - Monitoring 