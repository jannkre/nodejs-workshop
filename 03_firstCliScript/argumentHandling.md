# Argumente verarbeiten

In diesem Abschnitt lernst du, wie du Kommandozeilen-Argumente in deinen NodeJS-Skripten verarbeitest.

## Lernziele

- Verstehen der `process.argv`-Struktur
- Parsen von Kommandozeilen-Argumenten
- Erstellen von benutzerfreundlichen CLI-Tools

## Grundlagen

NodeJS stellt die Kommandozeilen-Argumente über das globale `process.argv`-Array zur Verfügung:

```javascript
// Beispiel: node script.js arg1 arg2
console.log(process.argv);
// Ausgabe: ['/usr/local/bin/node', '/pfad/zu/script.js', 'arg1', 'arg2']
```

## Praktisches Beispiel

```javascript
// script.js
const args = process.argv.slice(2); // Entfernt 'node' und den Skriptpfad

if (args.length === 0) {
    console.log('Bitte gib mindestens ein Argument an!');
    process.exit(1);
}

console.log('Deine Argumente:', args);
```

## Best Practices

- Validiere immer die Anzahl der Argumente
- Dokumentiere die erwarteten Argumente
- Verwende aussagekräftige Fehlermeldungen
- Implementiere eine Hilfe-Funktion

## Nächste Schritte

Im nächsten Abschnitt lernst du, wie du [Umgebungsvariablen](environmentVariables.md) in deinen Skripten verwendest. 