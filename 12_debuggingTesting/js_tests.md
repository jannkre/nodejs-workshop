# JavaScript Tests in NodeJS

## Einführung

In diesem Modul lernst du, wie du effektive Tests für deine NodeJS-Anwendungen schreibst. Wir verwenden Jest als Testing-Framework, da es einfach zu verwenden ist und viele nützliche Features bietet.

## Installation

```bash
# Jest installieren
npm install --save-dev jest

# TypeScript-Unterstützung
npm install --save-dev @types/jest ts-jest
```

## Jest Konfiguration

```javascript
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage'
};
```

## Unit Testing

### 1. Grundlegende Tests

```javascript
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };

// math.test.js
const { add, subtract } = require('./math');

describe('Math Funktionen', () => {
    test('addiert zwei Zahlen', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    test('subtrahiert zwei Zahlen', () => {
        expect(subtract(3, 2)).toBe(1);
        expect(subtract(1, 1)).toBe(0);
        expect(subtract(0, 5)).toBe(-5);
    });
});
```

### 2. Asynchrone Tests

```javascript
// userService.js
class UserService {
    async getUser(id) {
        // Simulierte API-Anfrage
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ id, name: 'Test User' });
            }, 100);
        });
    }
}

// userService.test.js
describe('UserService', () => {
    test('findet einen Benutzer', async () => {
        const service = new UserService();
        const user = await service.getUser(1);
        expect(user).toEqual({
            id: 1,
            name: 'Test User'
        });
    });
});
```

## Integration Testing

### 1. API-Tests

```javascript
// api.test.js
const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {
    test('GET /users', async () => {
        const response = await request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /users', async () => {
        const newUser = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
    });
});
```

### 2. Datenbank-Tests

```javascript
// db.test.js
const { MongoClient } = require('mongodb');
const UserRepository = require('./userRepository');

describe('UserRepository', () => {
    let connection;
    let db;
    let userRepository;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL);
        db = connection.db();
        userRepository = new UserRepository(db);
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('users').deleteMany({});
    });

    test('speichert einen neuen Benutzer', async () => {
        const user = {
            name: 'Test User',
            email: 'test@example.com'
        };

        const savedUser = await userRepository.save(user);
        expect(savedUser).toHaveProperty('_id');
        expect(savedUser.name).toBe(user.name);
    });
});
```

## Test-Driven Development (TDD)

### 1. TDD-Zyklus

1. **Red**: Schreibe einen fehlschlagenden Test
2. **Green**: Implementiere den Code, der den Test bestehen lässt
3. **Refactor**: Verbessere den Code, ohne die Tests zu brechen

### 2. Beispiel

```javascript
// calculator.test.js
describe('Calculator', () => {
    test('berechnet den Durchschnitt', () => {
        const calculator = new Calculator();
        expect(calculator.average([1, 2, 3])).toBe(2);
        expect(calculator.average([])).toBe(0);
    });
});

// calculator.js
class Calculator {
    average(numbers) {
        if (numbers.length === 0) return 0;
        return numbers.reduce((a, b) => a + b) / numbers.length;
    }
}
```

## Mocking und Stubbing

### 1. Jest Mocks

```javascript
// userService.test.js
jest.mock('./userRepository');

describe('UserService', () => {
    let userService;
    let userRepository;

    beforeEach(() => {
        userRepository = require('./userRepository');
        userService = new UserService(userRepository);
    });

    test('findet einen Benutzer', async () => {
        const mockUser = { id: 1, name: 'Test User' };
        userRepository.findById.mockResolvedValue(mockUser);

        const user = await userService.getUser(1);
        expect(user).toEqual(mockUser);
        expect(userRepository.findById).toHaveBeenCalledWith(1);
    });
});
```

### 2. Spies

```javascript
// logger.test.js
describe('Logger', () => {
    test('loggt Nachrichten', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const logger = new Logger();

        logger.info('Test Message');
        expect(consoleSpy).toHaveBeenCalledWith('INFO:', 'Test Message');
    });
});
```

## Best Practices

1. **Test-Struktur**
   - Klare Test-Beschreibungen
   - Isolierte Tests
   - Setup und Teardown

2. **Test-Abdeckung**
   - Wichtige Pfade testen
   - Edge Cases abdecken
   - Fehlerfälle testen

3. **Wartbarkeit**
   - DRY (Don't Repeat Yourself)
   - Test-Helper verwenden
   - Klare Test-Daten

## Übung

Schreibe Tests für eine einfache Todo-API:

```javascript
// todoService.js
class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    async createTodo(title) {
        if (!title) {
            throw new Error('Title is required');
        }
        return this.todoRepository.create({ title, completed: false });
    }

    async getTodos() {
        return this.todoRepository.findAll();
    }

    async toggleTodo(id) {
        const todo = await this.todoRepository.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return this.todoRepository.update(id, {
            completed: !todo.completed
        });
    }
}
```

Lösung:

```javascript
// todoService.test.js
describe('TodoService', () => {
    let todoService;
    let todoRepository;

    beforeEach(() => {
        todoRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn()
        };
        todoService = new TodoService(todoRepository);
    });

    test('erstellt ein neues Todo', async () => {
        const newTodo = { title: 'Test Todo', completed: false };
        todoRepository.create.mockResolvedValue({ id: 1, ...newTodo });

        const todo = await todoService.createTodo('Test Todo');
        expect(todo).toEqual({ id: 1, ...newTodo });
        expect(todoRepository.create).toHaveBeenCalledWith(newTodo);
    });

    test('wirft Fehler bei leerem Titel', async () => {
        await expect(todoService.createTodo('')).rejects.toThrow('Title is required');
    });

    test('findet alle Todos', async () => {
        const todos = [
            { id: 1, title: 'Todo 1', completed: false },
            { id: 2, title: 'Todo 2', completed: true }
        ];
        todoRepository.findAll.mockResolvedValue(todos);

        const result = await todoService.getTodos();
        expect(result).toEqual(todos);
    });

    test('wechselt Todo-Status', async () => {
        const todo = { id: 1, title: 'Test Todo', completed: false };
        todoRepository.findById.mockResolvedValue(todo);
        todoRepository.update.mockResolvedValue({ ...todo, completed: true });

        const result = await todoService.toggleTodo(1);
        expect(result.completed).toBe(true);
    });
});
``` 