# Einführung in TypeScript

## Was ist TypeScript?

TypeScript ist eine von Microsoft entwickelte Programmiersprache, die JavaScript um statische Typisierung erweitert. Sie ist ein Superset von JavaScript, was bedeutet, dass jeder gültige JavaScript-Code auch gültiger TypeScript-Code ist.

## Vorteile von TypeScript

1. **Statische Typisierung**
   - Früherkennung von Fehlern
   - Bessere IDE-Unterstützung
   - Selbst-dokumentierender Code

2. **Verbesserte Entwicklererfahrung**
   - IntelliSense und Autovervollständigung
   - Bessere Refactoring-Möglichkeiten
   - Klare API-Definitionen

3. **Skalierbarkeit**
   - Bessere Wartbarkeit großer Codebases
   - Einfachere Teamarbeit
   - Klare Verträge zwischen Modulen

## Grundlegende Syntax

### Typen-Deklarationen

```typescript
// Grundlegende Typen
let name: string = "Max";
let age: number = 25;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Objekte
let user: { name: string; age: number } = {
    name: "Max",
    age: 25
};

// Union Types
let id: string | number = "abc123";
id = 123; // Auch erlaubt

// Type Aliases
type Point = {
    x: number;
    y: number;
};

let position: Point = { x: 10, y: 20 };
```

### Funktionen

```typescript
// Funktion mit Typen
function add(a: number, b: number): number {
    return a + b;
}

// Optionale Parameter
function greet(name: string, greeting?: string): string {
    return greeting ? `${greeting}, ${name}!` : `Hallo, ${name}!`;
}

// Rest Parameter
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
```

### Interfaces

```typescript
interface User {
    id: number;
    name: string;
    email?: string; // Optional
    readonly createdAt: Date; // Nur lesbar
}

// Implementierung
const user: User = {
    id: 1,
    name: "Max",
    createdAt: new Date()
};
```

## Übung

Versuche, die folgenden JavaScript-Funktionen in TypeScript zu konvertieren:

```javascript
function calculateArea(width, height) {
    return width * height;
}

function formatName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function createUser(id, name, email) {
    return {
        id: id,
        name: name,
        email: email,
        createdAt: new Date()
    };
}
```

Lösung:

```typescript
function calculateArea(width: number, height: number): number {
    return width * height;
}

function formatName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
}

interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

function createUser(id: number, name: string, email: string): User {
    return {
        id,
        name,
        email,
        createdAt: new Date()
    };
}
``` 