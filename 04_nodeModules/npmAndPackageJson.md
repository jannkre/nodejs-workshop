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



## Ausführliches package.json Beispiel

Hier ist ein umfangreicheres Beispiel einer package.json mit detaillierten Erklärungen zu jedem Feld.
Eine derart umfangreiche package.json findet man typischerweise in Enterprise-Projekten oder größeren Open-Source-Projekten, die professionelle Entwicklungspraktiken implementieren. Sie enthält alle notwendigen Konfigurationen für TypeScript, Testing, Linting, Formatierung und Sicherheitsmaßnahmen. Diese Struktur ist besonders nützlich für Teams, die Wert auf Code-Qualität, automatisierte Tests und konsistente Entwicklungsumgebungen legen.


```json
{
  // Grundlegende Projektinformationen
  "name": "mein-enterprise-projekt",        // Name des Projekts (muss npm-konform sein)
  "version": "1.0.0",                       // SemVer Versionierung (major.minor.patch)
  "description": "Eine Enterprise-Anwendung mit Express und TypeScript",
  "author": "Max Mustermann <max@example.com>",
  "license": "MIT",                         // Lizenz für das Projekt
  "private": true,                          // Verhindert versehentliche Veröffentlichung

  // Hauptdatei und Einstiegspunkte
  "main": "dist/index.js",                  // Hauptdatei für require()
  "types": "dist/index.d.ts",              // TypeScript Definitionen
  "bin": {                                  // CLI-Befehle
    "mein-tool": "./dist/cli.js"
  },

  // Skripte für verschiedene Aufgaben
  "scripts": {
    "start": "node dist/index.js",          // Produktionsstart
    "dev": "nodemon src/index.ts",          // Entwicklung mit Auto-Reload
    "build": "tsc",                         // TypeScript Kompilierung
    "test": "jest",                         // Unit Tests
    "test:watch": "jest --watch",           // Tests im Watch-Modus
    "lint": "eslint src/**/*.ts",           // Code-Qualität prüfen
    "format": "prettier --write src/**/*.ts", // Code formatieren
    "prepare": "husky install",             // Git Hooks installieren
    "precommit": "npm run lint && npm run test" // Pre-commit Checks
  },

  // Produktionsabhängigkeiten
  "dependencies": {
    "express": "^4.17.1",                   // Web Framework
    "mongoose": "^6.0.0",                   // MongoDB ODM
    "dotenv": "^10.0.0",                    // Umgebungsvariablen
    "winston": "^3.3.3",                    // Logging
    "jsonwebtoken": "^8.5.1",               // JWT Authentifizierung
    "bcryptjs": "^2.4.3",                   // Passwort-Hashing
    "cors": "^2.8.5",                       // CORS Middleware
    "helmet": "^4.6.0"                      // Security Headers
  },

  // Entwicklungsabhängigkeiten
  "devDependencies": {
    "typescript": "^4.5.0",                 // TypeScript Compiler
    "@types/node": "^16.11.0",              // Node.js TypeScript Definitionen
    "@types/express": "^4.17.13",           // Express TypeScript Definitionen
    "jest": "^27.0.6",                      // Testing Framework
    "ts-jest": "^27.0.5",                   // TypeScript für Jest
    "nodemon": "^2.0.12",                   // Auto-Reload für Entwicklung
    "eslint": "^8.0.0",                     // Linting
    "prettier": "^2.5.0",                   // Code Formatierung
    "husky": "^7.0.0",                      // Git Hooks
    "lint-staged": "^12.0.0"                // Linting für staged files
  },

  // Engines und Plattform-Anforderungen
  "engines": {
    "node": ">=14.0.0",                     // Minimale Node.js Version
    "npm": ">=7.0.0"                        // Minimale npm Version
  },

  // Repository und Bugs
  "repository": {
    "type": "git",
    "url": "git+https://github.com/user/project.git"
  },
  "bugs": {
    "url": "https://github.com/user/project/issues"
  },

  // Keywords für npm-Suche
  "keywords": [
    "express",
    "typescript",
    "api",
    "rest"
  ],

  // Konfiguration für verschiedene Tools
  "eslintConfig": {
    "extends": "eslint:recommended",
    "env": {
      "node": true,
      "es6": true
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}
```



## Best Practices

- Verwende exakte Versionen für Produktionsabhängigkeiten
- Halte devDependencies aktuell
- Dokumentiere Skripte
- Nutze .npmignore für große Projekte