# Typen und Interfaces in TypeScript

## Grundlegende Typen

TypeScript bietet eine Vielzahl von eingebauten Typen:

```typescript
// Primitive Typen
let str: string = "Hallo";
let num: number = 42;
let bool: boolean = true;
let n: null = null;
let u: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple
let tuple: [string, number] = ["Max", 25];

// Enum
enum Color {
    Red,
    Green,
    Blue
}
let color: Color = Color.Red;

// Any
let anyValue: any = "kann alles sein";
anyValue = 42;
anyValue = true;

// Unknown
let unknownValue: unknown = "muss geprüft werden";
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());
}

// Never
function throwError(): never {
    throw new Error("Fehler!");
}
```

## Interfaces

Interfaces definieren die Struktur von Objekten:

```typescript
// Basis-Interface
interface User {
    id: number;
    name: string;
    email?: string; // Optional
    readonly createdAt: Date; // Nur lesbar
}

// Interface erweitern
interface Employee extends User {
    department: string;
    salary: number;
}

// Interface mit Methoden
interface Calculator {
    add(x: number, y: number): number;
    subtract(x: number, y: number): number;
}

// Implementierung
class BasicCalculator implements Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
    
    subtract(x: number, y: number): number {
        return x - y;
    }
}
```

## Generics

Generics ermöglichen typsichere, wiederverwendbare Komponenten:

```typescript
// Generische Funktion
function identity<T>(arg: T): T {
    return arg;
}

// Generische Interface
interface Container<T> {
    value: T;
    getValue(): T;
}

// Generische Klasse
class Box<T> {
    private content: T;

    constructor(value: T) {
        this.content = value;
    }

    getValue(): T {
        return this.content;
    }
}

// Verwendung
const numberBox = new Box<number>(42);
const stringBox = new Box<string>("Hallo");
```

## Type Assertions

Type Assertions erlauben es, den Compiler über den Typ zu informieren:

```typescript
// Angle-Bracket Syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as Syntax
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

// const Assertions
const colors = ["red", "green", "blue"] as const;
// colors ist jetzt readonly ["red", "green", "blue"]
```

## Übung

1. Erstelle ein Interface für einen E-Commerce-Artikel mit:
   - ID
   - Name
   - Preis
   - Kategorie
   - Verfügbarkeit
   - Bewertungen (optional)

2. Implementiere eine generische Funktion zum Filtern von Artikeln

Lösung:

```typescript
// Artikel-Interface
interface Article {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
    ratings?: {
        average: number;
        count: number;
    };
}

// Generische Filter-Funktion
function filterItems<T>(
    items: T[],
    predicate: (item: T) => boolean
): T[] {
    return items.filter(predicate);
}

// Beispiel-Verwendung
const articles: Article[] = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        inStock: true,
        ratings: {
            average: 4.5,
            count: 120
        }
    },
    {
        id: 2,
        name: "Buch",
        price: 19.99,
        category: "Books",
        inStock: true
    }
];

// Filter nach Kategorie
const electronics = filterItems(
    articles,
    article => article.category === "Electronics"
);

// Filter nach Preis
const affordable = filterItems(
    articles,
    article => article.price < 50
);
``` 