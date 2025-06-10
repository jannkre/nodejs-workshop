# NodeJS, npm und nodemon

In diesem Abschnitt lernst du die grundlegenden Werkzeuge und Paketmanager kennen, die für die NodeJS-Entwicklung essentiell sind.

## Lernziele

- npm als Paketmanager nutzen
- nodemon für die Entwicklung einsetzen
- Best Practices für die Projektstruktur kennenlernen

## npm (Node Package Manager)

### Grundlagen
- Paketverwaltung
- package.json
- node_modules
- Semantische Versionierung

### Wichtige npm-Befehle
```bash
# Projekt initialisieren
npm init
npm init -y

# Pakete installieren
npm install paket-name
npm i paket-name --save
npm i paket-name --save-dev

# Globale Installation
npm install -g paket-name

# Skripte ausführen
npm run skript-name
```

### package.json Struktur
```json
{
  "name": "projekt-name",
  "version": "1.0.0",
  "description": "Projektbeschreibung",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

## nodemon

### Was ist nodemon?
- Automatischer Neustart bei Dateiänderungen
- Entwicklungsumgebung vs. Produktion
- Konfigurationsmöglichkeiten

### Installation und Nutzung
```bash
# Installation
npm install nodemon --save-dev

# Direkte Nutzung
npx nodemon index.js

# Über npm-Skript
npm run dev
```

### nodemon.json Konfiguration
```json
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["node_modules", "dist"],
  "exec": "node ./src/index.js"
}
```

## Best Practices

### Projektstruktur
```
projekt/
├── src/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── models/
├── tests/
├── node_modules/
├── package.json
├── package-lock.json
└── .gitignore
```

### .gitignore
```
node_modules/
.env
.DS_Store
dist/
coverage/
```

### Sicherheit
- Regelmäßige Updates
- Sicherheitsaudits
- Abhängigkeiten prüfen
```bash
npm audit
npm audit fix
```

## Nächste Schritte

Nachdem du die grundlegenden Werkzeuge kennengelernt hast, kannst du mit dem [Events](../events/README.md) Modul fortfahren, um mehr über die Event-basierte Architektur zu lernen. 