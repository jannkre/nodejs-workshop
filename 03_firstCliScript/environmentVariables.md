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

## Häufig verwendete Umgebungsvariablen

| Variable | Beschreibung | Beispielwert | Verwendung |
|----------|--------------|--------------|------------|
| `NODE_ENV` | Laufzeitumgebung | `development`<br>`production`<br>`test` | Unterscheidung zwischen Entwicklungs- und Produktionsumgebung |
| `PORT` | Server-Port | `3000`<br>`8080` | Port-Konfiguration für Web-Server |
| `DATABASE_URL` | Datenbankverbindung | `postgresql://user:pass@localhost:5432/db` | Verbindungsstring für Datenbanken |
| `API_KEY` | API-Schlüssel | `sk_live_...` | Authentifizierung bei externen APIs |
| `JWT_SECRET` | JWT Signaturschlüssel | `your-secret-key` | Token-Generierung und -Validierung |
| `REDIS_URL` | Redis Verbindung | `redis://localhost:6379` | Cache-Server Verbindung |
| `AWS_ACCESS_KEY_ID` | AWS Credentials | `AKIA...` | Cloud-Service Authentifizierung |
| `LOG_LEVEL` | Logging-Level | `debug`<br>`info`<br>`error` | Steuerung der Log-Ausgabe |
| `CORS_ORIGIN` | CORS Einstellungen | `http://localhost:3000` | Cross-Origin Resource Sharing |
| `SMTP_HOST` | Mail-Server | `smtp.gmail.com` | E-Mail-Versand Konfiguration |

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