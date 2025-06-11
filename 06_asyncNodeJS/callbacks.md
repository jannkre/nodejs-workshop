# Callbacks in NodeJS

In diesem Abschnitt lernst du die grundlegenden Konzepte der Callback-basierten asynchronen Programmierung in NodeJS kennen.

## Lernziele

- Callback-Funktionen und deren Verwendung verstehen
- Error-First Callback Pattern kennenlernen
- Callback-Hölle vermeiden
- Best Practices für Callback-basierte Programmierung

## Grundkonzepte

### Was sind Callbacks?
- Funktionen, die als Argumente übergeben werden
- Werden nach Abschluss einer Operation ausgeführt
- Ermöglichen asynchrone Programmierung
- Traditionelle Methode in NodeJS

## Callback-Patterns

### Einfache Callbacks
```javascript
fs.readFile('datei.txt', (err, data) => {
    if (err) {
        console.error('Fehler:', err);
        return;
    }
    console.log('Daten:', data);
});
```

### Verschachtelte Callbacks
```javascript
fs.readFile('datei1.txt', (err, data1) => {
    if (err) {
        console.error('Fehler 1:', err);
        return;
    }
    fs.readFile('datei2.txt', (err, data2) => {
        if (err) {
            console.error('Fehler 2:', err);
            return;
        }
        console.log('Beide Dateien gelesen');
    });
});
```

### Error-First Callback Pattern
```javascript
function operation(callback) {
    // Asynchrone Operation
    if (error) {
        callback(error);
        return;
    }
    callback(null, result);
}
```

## Callback-Hölle

### Problem
- Tiefe Verschachtelung von Callbacks
- Schwer zu lesen und zu warten
- Komplexe Fehlerbehandlung
- Code wird unübersichtlich

### Beispiel für Callback-Hölle
```javascript
fs.readFile('datei1.txt', (err, data1) => {
    if (err) return console.error(err);
    fs.readFile('datei2.txt', (err, data2) => {
        if (err) return console.error(err);
        fs.writeFile('ergebnis.txt', data1 + data2, (err) => {
            if (err) return console.error(err);
            console.log('Fertig!');
        });
    });
});
```

## Vermeidung der Callback-Hölle

### Funktionen auslagern
```javascript
function readFile(path, callback) {
    fs.readFile(path, (err, data) => {
        if (err) return callback(err);
        callback(null, data);
    });
}

readFile('datei1.txt', (err, data1) => {
    if (err) return console.error(err);
    console.log(data1);
});
```

### Async.js Bibliothek
```javascript
const async = require('async');

async.waterfall([
    (callback) => {
        fs.readFile('datei1.txt', callback);
    },
    (data1, callback) => {
        fs.readFile('datei2.txt', callback);
    }
], (err, result) => {
    if (err) return console.error(err);
    console.log(result);
});
```

## Best Practices

### Error Handling
- Immer Error-First Pattern verwenden
- Fehler früh abfangen und behandeln
- Keine Fehler verschlucken
- Aussagekräftige Fehlermeldungen

### Code-Organisation
- Callbacks in separate Funktionen auslagern
- Maximal 2-3 Verschachtelungsebenen
- Async.js für komplexe Abläufe
- Klare Namensgebung

### Performance
- Callbacks nicht unnötig verschachteln
- Parallele Ausführung nutzen
- Ressourcen rechtzeitig freigeben
- Memory Leaks vermeiden

## Nächste Schritte

Nachdem du die Callback-basierte Programmierung kennengelernt hast, kannst du mit dem [Promises](promises.md) Modul fortfahren, um die modernere Promise-basierte asynchrone Programmierung zu lernen. 