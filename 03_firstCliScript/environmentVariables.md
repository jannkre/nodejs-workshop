# Umgebungsvariablen

In diesem Abschnitt lernst du, wie du Umgebungsvariablen in deinen NodeJS-Skripten verwendest.

## Lernziele

- Verstehen des `process.env`-Objekts
- Setzen und Lesen von Umgebungsvariablen
- Best Practices für die Verwendung von Umgebungsvariablen

## Grundlagen

NodeJS stellt Umgebungsvariablen über das globale `process.env`-Objekt zur Verfügung:

```javascript
// Beispiel für den Zugriff auf Umgebungsvariablen
console.log(process.env.NODE_ENV);
console.log(process.env.PATH);
```

## Umgebungsvariablen setzen

### Im Terminal
```bash
# Linux/macOS
export NODE_ENV=development
node script.js

# Windows (CMD)
set NODE_ENV=development
node script.js

NODE_ENV=development node script.js

# Windows (PowerShell)
$env:NODE_ENV="development"
node script.js
```

### In der Skript-Datei
```javascript
process.env.NODE_ENV = 'development';
```

## Best Practices

- Verwende `.env`-Dateien für lokale Entwicklung
- Speichere sensitive Daten in Umgebungsvariablen
- Dokumentiere benötigte Umgebungsvariablen
- Validiere die Anwesenheit wichtiger Variablen

## Beispiel mit Validierung

```javascript
// Überprüfe wichtige Umgebungsvariablen
const requiredEnvVars = ['DATABASE_URL', 'API_KEY'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Fehlende Umgebungsvariable: ${envVar}`);
        process.exit(1);
    }
}
```

## Nächste Schritte

Nachdem du die Grundlagen der CLI-Skripte kennengelernt hast, kannst du mit dem [NodeJS Module](../nodeModules/README.md) Modul fortfahren. 