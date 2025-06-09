# Async/Await in NodeJS

In diesem Abschnitt lernst du die modernste Form der asynchronen Programmierung in NodeJS mit async/await kennen.

## Lernziele

- Async/Await Syntax und Konzepte verstehen
- Vorteile gegenüber Promises und Callbacks
- Fehlerbehandlung mit try/catch
- Best Practices für Async/Await

## Grundkonzepte

### Was ist Async/Await?
- Syntaktischer Zucker über Promises
- Ermöglicht synchron-aussehenden asynchronen Code
- Verbesserte Lesbarkeit und Wartbarkeit
- Einfachere Fehlerbehandlung

### Async Functions
```javascript
async function beispiel() {
    const ergebnis = await asynchroneOperation();
    return ergebnis;
}
```

## Async/Await Verwendung

### Einfache Verwendung
```javascript
const fs = require('fs').promises;

async function dateiLesen() {
    try {
        const data = await fs.readFile('datei.txt');
        console.log('Daten:', data);
    } catch (err) {
        console.error('Fehler:', err);
    }
}
```

### Mehrere asynchrone Operationen
```javascript
async function dateienVerarbeiten() {
    try {
        const data1 = await fs.readFile('datei1.txt');
        const data2 = await fs.readFile('datei2.txt');
        await fs.writeFile('ergebnis.txt', data1 + data2);
        console.log('Fertig!');
    } catch (err) {
        console.error('Fehler:', err);
    }
}
```

## Parallele Ausführung

### Promise.all mit Async/Await
```javascript
async function paralleleOperationen() {
    try {
        const [data1, data2] = await Promise.all([
            fs.readFile('datei1.txt'),
            fs.readFile('datei2.txt')
        ]);
        console.log('Beide Dateien gelesen');
    } catch (err) {
        console.error('Fehler:', err);
    }
}
```

### Async Iteration
```javascript
async function dateienVerarbeiten(dateien) {
    for (const datei of dateien) {
        try {
            const data = await fs.readFile(datei);
            console.log(`${datei} gelesen`);
        } catch (err) {
            console.error(`Fehler bei ${datei}:`, err);
        }
    }
}
```

## Fehlerbehandlung

### Try/Catch
```javascript
async function fehlerBehandlung() {
    try {
        const data = await unsichereOperation();
        return data;
    } catch (err) {
        console.error('Fehler aufgetreten:', err);
        throw err; // Fehler weitergeben
    }
}
```

### Fehler-Propagation
```javascript
async function operationenKette() {
    try {
        const data = await ersteOperation();
        const verarbeitet = await zweiteOperation(data);
        return await dritteOperation(verarbeitet);
    } catch (err) {
        console.error('Fehler in der Kette:', err);
        throw err;
    }
}
```

## Best Practices

### Async Function Deklaration
- Immer async vor der Funktion
- Await nur in async Funktionen
- Klare Fehlerbehandlung
- Sinnvolle Rückgabewerte

### Performance
- Parallele Operationen nutzen
- Unnötige await vermeiden
- Memory Leaks verhindern
- Ressourcen rechtzeitig freigeben

### Code-Organisation
- Kleine, fokussierte async Funktionen
- Klare Fehlerbehandlung
- Vermeidung von verschachtelten async Funktionen
- Sinnvolle Modularisierung

## Von Promises zu Async/Await

### Promise zu Async/Await konvertieren
```javascript
// Promise Version
function promiseVersion() {
    return fs.readFile('datei.txt')
        .then(data => processData(data))
        .catch(err => console.error(err));
}

// Async/Await Version
async function asyncVersion() {
    try {
        const data = await fs.readFile('datei.txt');
        return processData(data);
    } catch (err) {
        console.error(err);
    }
}
```

## Nächste Schritte

Nachdem du die Async/Await Programmierung kennengelernt hast, kannst du mit dem [Event Loop](eventLoop.md) Modul fortfahren, um mehr über die grundlegende Funktionsweise des NodeJS Event Loops zu lernen. 