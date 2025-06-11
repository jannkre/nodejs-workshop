# Promises in NodeJS

In diesem Abschnitt lernst du die moderne Promise-basierte asynchrone Programmierung in NodeJS kennen.

## Lernziele

- Promise-Konzepte und deren Verwendung verstehen
- Promise-Ketten und deren Vorteile kennenlernen
- Fehlerbehandlung mit Promises
- Best Practices für Promise-basierte Programmierung

## Grundkonzepte

### Was sind Promises?
Promises sind ein grundlegendes Konzept in der modernen JavaScript-Programmierung. Sie bieten eine elegantere Alternative zu Callbacks und machen asynchronen Code besser lesbar und wartbar.

- Objekte, die einen zukünftigen Wert repräsentieren
- Drei Zustände: pending, fulfilled, rejected
- Bessere Lesbarkeit als Callbacks
- Standardisierte Fehlerbehandlung

### Promise-States
Ein Promise durchläuft verschiedene Zustände während seines Lebenszyklus. Hier ein Beispiel, das die grundlegende Struktur eines Promises zeigt:

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
Die einfachste Form der Promise-Verwendung zeigt dieses Beispiel mit dem Dateisystem. Promises machen den Code flacher und vermeiden die "Callback-Hölle":

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
Promise-Ketten ermöglichen es, mehrere asynchrone Operationen nacheinander auszuführen. Jeder Schritt wartet auf den Abschluss des vorherigen, was den Code übersichtlich und wartbar macht:

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
`Promise.all` ist besonders nützlich, wenn mehrere asynchrone Operationen parallel ausgeführt werden sollen. Es wartet, bis alle Promises erfüllt sind, oder bricht ab, sobald ein Promise fehlschlägt:

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
`Promise.race` ist nützlich, wenn nur die erste abgeschlossene Operation relevant ist. Es eignet sich gut für Timeouts oder wenn mehrere Quellen für die gleichen Daten existieren:

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
Die Kombination von async/await mit try-catch macht die Fehlerbehandlung besonders elegant und ähnlich der synchronen Programmierung:

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
In Promise-Ketten können Fehler elegant weitergegeben werden. Der erste catch-Block in der Kette fängt alle Fehler ab:

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
Bei der Erstellung von Promises gibt es einige wichtige Regeln zu beachten, um Probleme zu vermeiden:

- Promises nur einmal erstellen
- Keine verschachtelten Promises
- Reject mit Error-Objekten
- Keine synchronen Operationen in Promises

### Fehlerbehandlung
Eine gute Fehlerbehandlung ist entscheidend für robuste Anwendungen:

- Immer .catch() verwenden
- Fehler nicht verschlucken
- Aussagekräftige Fehlermeldungen
- Fehlerweitergabe wenn nötig

### Performance
Die Performance von Promise-basierten Anwendungen kann durch folgende Praktiken optimiert werden:

- Promise.all für parallele Operationen
- Unnötige Promise-Ketten vermeiden
- Memory Leaks verhindern
- Ressourcen rechtzeitig freigeben

## Von Callbacks zu Promises

### Callback zu Promise konvertieren
Manchmal müssen ältere Callback-basierte APIs in Promises umgewandelt werden. Hier ein Beispiel für die manuelle Konvertierung:

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
Node.js bietet mit `util.promisify` eine elegante Lösung, um Callback-basierte Funktionen in Promise-basierte zu konvertieren:

```javascript
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('datei.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

## Nächste Schritte

Nachdem du die Promise-basierte Programmierung kennengelernt hast, kannst du mit dem [Async/Await](asyncAwait.md) Modul fortfahren, um die modernste Form der asynchronen Programmierung in NodeJS zu lernen. 