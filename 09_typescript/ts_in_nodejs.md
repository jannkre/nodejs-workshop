# TypeScript in NodeJS

## Installation und Setup

1. **Projekt initialisieren**
```bash
mkdir typescript-project
cd typescript-project
npm init -y
```

2. **TypeScript installieren**
```bash
npm install typescript @types/node --save-dev
```

3. **TypeScript-Konfiguration initialisieren**
```bash
npx tsc --init
```

## tsconfig.json Konfiguration

Hier ist eine typische Konfiguration für ein NodeJS-Projekt:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Wichtige Compiler-Optionen

- `target`: ECMAScript-Version für den kompilierten Code
- `module`: Modulsystem (commonjs für NodeJS)
- `outDir`: Ausgabeverzeichnis für kompilierte Dateien
- `rootDir`: Quellverzeichnis
- `strict`: Strikte Typenprüfung aktivieren
- `esModuleInterop`: Bessere Interoperabilität mit CommonJS-Modulen

## Projektstruktur

```
typescript-project/
├── src/
│   ├── index.ts
│   └── utils/
│       └── helper.ts
├── dist/
├── package.json
└── tsconfig.json
```

## Beispiel: Express-Server mit TypeScript

1. **Express und Typen installieren**
```bash
npm install express
npm install @types/express --save-dev
```

2. **Server-Code (src/index.ts)**
```typescript
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'Max' },
    { id: 2, name: 'Anna' }
];

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

3. **Scripts in package.json**
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  }
}
```

## Übung

Erstelle einen einfachen Express-Server mit TypeScript, der:
1. Eine Liste von Todos verwaltet
2. CRUD-Operationen für Todos unterstützt
3. Typsichere Request- und Response-Handler verwendet

Lösung:

```typescript
// src/types.ts
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// src/index.ts
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let todos: Todo[] = [];
let nextId = 1;

// GET /todos
app.get('/todos', (req: Request, res: Response) => {
    res.json(todos);
});

// POST /todos
app.post('/todos', (req: Request, res: Response) => {
    const { title } = req.body;
    const todo: Todo = {
        id: nextId++,
        title,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// PUT /todos/:id
app.put('/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        Object.assign(todo, req.body);
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE /todos/:id
app.delete('/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
``` 