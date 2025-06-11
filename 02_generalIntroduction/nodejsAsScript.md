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

## Anwendungsfälle

| Anwendungsfall | Beschreibung | Vorteile von NodeJS |
|----------------|--------------|---------------------|
| Build-Tools | Automatisierung von Build-Prozessen (z.B. Webpack, Gulp) | - Schnelle Ausführung durch Event-Loop<br>- Große Ökosystem an NPM-Paketen<br>- Einfache Integration in CI/CD |
| Datei-Transformation | Konvertierung von Dateiformaten, Batch-Verarbeitung | - Einfache Datei-Operationen mit `fs`<br>- Asynchrone Verarbeitung großer Dateien<br>- Stream-API für effiziente Verarbeitung |
| System-Monitoring | Überwachung von Systemressourcen, Log-Analyse | - Zugriff auf System-APIs via `os`<br>- Echtzeit-Datenverarbeitung<br>- Einfache Netzwerk-Kommunikation |
| Daten-Migration | Datenbank-Migrationen, Daten-Transformation | - Asynchrone Datenbank-Operationen<br>- Einfache JSON-Verarbeitung<br>- Gute Performance bei großen Datensätzen |
| CLI-Tools | Kommandozeilen-Tools und Utilities | - Einfache Argument-Parsing<br>- Cross-Platform Kompatibilität<br>- Einfache Installation via npm |
| Automatisierung | Automatische Backups, System-Wartung | - Zugriff auf System-Befehle<br>- Scheduling via `cron`-ähnliche Pakete<br>- Robuste Fehlerbehandlung |
| API-Tests | Automatisierte API-Tests und Monitoring | - Einfache HTTP-Requests<br>- Asynchrone Test-Ausführung<br>- Gute Integration mit Test-Frameworks |
| Daten-Scraping | Web-Scraping und Daten-Extraktion | - Einfache HTTP-Requests<br>- DOM-Parsing mit `cheerio`<br>- Asynchrone Verarbeitung |

## Nächste Schritte

Nachdem du die Grundlagen von NodeJS als Skriptsprache kennengelernt hast, kannst du mit dem [FileSystem](../fileSystem/README.md) Modul fortfahren, um mehr über Dateisystem-Operationen zu lernen. 