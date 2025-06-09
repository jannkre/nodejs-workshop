# NodeJS als Skriptsprache

In diesem Abschnitt lernst du, wie du NodeJS als Skriptsprache für Automatisierung und einfache Programme nutzen kannst.

## Lernziele

- NodeJS als Skriptsprache verstehen
- Einfache Skripte erstellen
- Kommandozeilenargumente verarbeiten
- Dateien und Verzeichnisse bearbeiten

## Grundlagen

### Was ist ein Skript?
- Ausführbare Datei mit JavaScript-Code
- Automatisierung von Aufgaben
- Einfache Programme ohne Web-Server

## Erstes Skript

```javascript
// hello.js
console.log('Hallo, ich bin ein NodeJS-Skript!');
```

Ausführen:
```bash
node hello.js
```

## Kommandozeilenargumente

```javascript
// args.js
const args = process.argv.slice(2);
console.log('Argumente:', args);
```

Ausführen:
```bash
node args.js arg1 arg2
```

## Dateien bearbeiten

```javascript
// file.js
const fs = require('fs');

// Datei lesen
const inhalt = fs.readFileSync('beispiel.txt', 'utf8');
console.log('Dateiinhalt:', inhalt);

// Datei schreiben
fs.writeFileSync('neue-datei.txt', 'Hallo Welt!');
```

## Nützliche Module

- `fs`: Dateisystem-Operationen
- `path`: Pfad-Manipulation
- `child_process`: Externe Programme ausführen
- `os`: Betriebssystem-Informationen

## Nächste Schritte

Nachdem du die Grundlagen von NodeJS als Skriptsprache kennengelernt hast, kannst du mit dem [FileSystem](../fileSystem/README.md) Modul fortfahren, um mehr über Dateisystem-Operationen zu lernen. 