# npm & package.json

In diesem Abschnitt lernst du, wie du npm (Node Package Manager) und package.json für deine Projekte nutzt.

## Lernziele

- Verstehen von npm und seiner Funktionsweise
- Erstellen und Verwalten einer package.json
- Installieren und Verwalten von Abhängigkeiten
- Verstehen von Versionierung und SemVer

## npm Grundlagen

npm ist der Standard-Paketmanager für NodeJS. Er ermöglicht:
- Installation von Paketen
- Verwaltung von Projektabhängigkeiten
- Veröffentlichung eigener Pakete
- Skript-Ausführung

## package.json erstellen

```bash
# Interaktive Erstellung
npm init

# Schnelle Erstellung mit Standardwerten
npm init -y
```

## Beispiel package.json

```json
{
  "name": "mein-projekt",
  "version": "1.0.0",
  "description": "Eine Beispielanwendung",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "nodemon": "^2.0.12"
  }
}
```

## Wichtige npm-Befehle

```bash
# Pakete installieren
npm install express
npm install --save-dev nodemon

# Globale Installation
npm install -g typescript

# Skripte ausführen
npm run start
npm run test

# Pakete aktualisieren
npm update
```

## Best Practices

- Verwende exakte Versionen für Produktionsabhängigkeiten
- Halte devDependencies aktuell
- Dokumentiere Skripte
- Nutze .npmignore für große Projekte

## Nächste Schritte

Im nächsten Abschnitt lernst du mehr über das [Module System](moduleSystem.md) in NodeJS. 