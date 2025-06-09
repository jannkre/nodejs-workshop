# Promises in NodeJS

In diesem Abschnitt lernst du die moderne Promise-basierte asynchrone Programmierung in NodeJS kennen.

## Lernziele

- Promise-Konzepte und deren Verwendung verstehen
- Promise-Ketten und deren Vorteile kennenlernen
- Fehlerbehandlung mit Promises
- Best Practices für Promise-basierte Programmierung

## Grundkonzepte

### Was sind Promises?
- Objekte, die einen zukünftigen Wert repräsentieren
- Drei Zustände: pending, fulfilled, rejected
- Bessere Lesbarkeit als Callbacks
- Standardisierte Fehlerbehandlung

### Promise-States
```javascript
const promise = new Promise((resolve, reject) => {
    // Asynchrone Operation
    if (success) {
        resolve(result);
    } else {
        reject(error);
    }
});
```

## Promise-Verwendung

### Einfache Promises
```javascript
const fs = require('fs').promises;

fs.readFile('datei.txt')
    .then(data => {
        console.log('Daten:', data);
    })
    .catch(err => {
        console.error('Fehler:', err);
    });
```

### Promise-Ketten
```javascript
fs.readFile('datei1.txt')
    .then(data1 => {
        return fs.readFile('datei2.txt');
    })
    .then(data2 => {
        return fs.writeFile('ergebnis.txt', data1 + data2);
    })
    .then(() => {
        console.log('Fertig!');
    })
    .catch(err => {
        console.error('Fehler:', err);
    });
```

## Promise-Methoden

### Promise.all
```javascript
Promise.all([
    fs.readFile('datei1.txt'),
    fs.readFile('datei2.txt')
])
    .then(([data1, data2]) => {
        console.log('Beide Dateien gelesen');
    })
    .catch(err => {
        console.error('Fehler:', err);
    });
```

### Promise.race
```javascript
Promise.race([
    fetch('api1'),
    fetch('api2')
])
    .then(result => {
        console.log('Erste Antwort:', result);
    })
    .catch(err => {
        console.error('Fehler:', err);
    });
```

## Fehlerbehandlung

### Try-Catch mit Promises
```javascript
async function beispiel() {
    try {
        const data = await fs.readFile('datei.txt');
        console.log(data);
    } catch (err) {
        console.error('Fehler:', err);
    }
}
```

### Fehlerweitergabe
```javascript
fs.readFile('datei.txt')
    .then(data => {
        if (!data) {
            throw new Error('Keine Daten');
        }
        return processData(data);
    })
    .catch(err => {
        console.error('Fehler:', err);
    });
```

## Best Practices

### Promise-Erstellung
- Promises nur einmal erstellen
- Keine verschachtelten Promises
- Reject mit Error-Objekten
- Keine synchronen Operationen in Promises

### Fehlerbehandlung
- Immer .catch() verwenden
- Fehler nicht verschlucken
- Aussagekräftige Fehlermeldungen
- Fehlerweitergabe wenn nötig

### Performance
- Promise.all für parallele Operationen
- Unnötige Promise-Ketten vermeiden
- Memory Leaks verhindern
- Ressourcen rechtzeitig freigeben

## Von Callbacks zu Promises

### Callback zu Promise konvertieren
```javascript
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
```

### Promisify
```javascript
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('datei.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

## Nächste Schritte

Nachdem du die Promise-basierte Programmierung kennengelernt hast, kannst du mit dem [Async/Await](asyncAwait.md) Modul fortfahren, um die modernste Form der asynchronen Programmierung in NodeJS zu lernen. 