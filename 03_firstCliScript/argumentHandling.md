# Argumente verarbeiten

In diesem Abschnitt lernst du, wie du Kommandozeilen-Argumente in deinen NodeJS-Skripten verarbeitest.

## Lernziele

- Verstehen der `process.argv`-Struktur
- Parsen von Kommandozeilen-Argumenten
- Erstellen von benutzerfreundlichen CLI-Tools

## Grundlagen

NodeJS stellt die Kommandozeilen-Argumente über das globale `process.argv`-Array zur Verfügung. Hier siehst du ein einfaches Beispiel, wie die Argumente strukturiert sind:

```javascript
// Beispiel: node script.js arg1 arg2
console.log(process.argv);
// Ausgabe: ['/usr/local/bin/node', '/pfad/zu/script.js', 'arg1', 'arg2']
```

## Praktisches Beispiel

Hier ist ein einfaches Skript, das die übergebenen Argumente verarbeitet und validiert:

```javascript
// script.js
const args = process.argv.slice(2); // Entfernt 'node' und den Skriptpfad

if (args.length === 0) {
    console.log('Bitte gib mindestens ein Argument an!');
    process.exit(1);
}

console.log('Deine Argumente:', args);
```

## Erweitertes Beispiel: Benannte Argumente und Flags

Hier ist ein komplexeres Beispiel, das verschiedene Arten von Argumenten verarbeitet, einschließlich benannter Argumente und Flags:

```javascript
// cli-tool.js
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        name: '',
        age: 0,
        verbose: false,
        help: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        // Hilfe-Flag
        if (arg === '--help' || arg === '-h') {
            options.help = true;
            continue;
        }

        // Verbose-Flag
        if (arg === '--verbose' || arg === '-v') {
            options.verbose = true;
            continue;
        }

        // Benannte Argumente
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            if (key && value) {
                options[key] = value;
            }
            continue;
        }

        // Kurzform-Argumente
        if (arg.startsWith('-')) {
            const key = arg.slice(1);
            const value = args[i + 1];
            if (value && !value.startsWith('-')) {
                options[key] = value;
                i++; // Überspringe den nächsten Wert
            }
            continue;
        }
    }

    return options;
}

function showHelp() {
    console.log(`
Verwendung: node cli-tool.js [Optionen]

Optionen:
  -h, --help           Zeigt diese Hilfe an
  -v, --verbose        Aktiviert ausführliche Ausgabe
  --name=<name>        Setzt den Namen
  -a, --age=<alter>    Setzt das Alter
    `);
}

// Hauptprogramm
const options = parseArgs();

if (options.help) {
    showHelp();
    process.exit(0);
}

if (options.verbose) {
    console.log('Ausführlicher Modus aktiviert');
}

if (options.name) {
    console.log(`Hallo, ${options.name}!`);
}

if (options.age) {
    console.log(`Du bist ${options.age} Jahre alt.`);
}

// Beispielaufruf:
// node cli-tool.js --name=Max --age=25 -v
// node cli-tool.js -h
```

## Best Practices

- Validiere immer die Anzahl der Argumente
- Dokumentiere die erwarteten Argumente
- Verwende aussagekräftige Fehlermeldungen
- Implementiere eine Hilfe-Funktion

## Nächste Schritte

Im nächsten Abschnitt lernst du, wie du [Umgebungsvariablen](environmentVariables.md) in deinen Skripten verwendest. 