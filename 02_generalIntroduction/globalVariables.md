# Globale NodeJS-Variablen

In diesem Abschnitt lernst du die wichtigsten globalen Variablen in NodeJS kennen und verstehst deren Verwendungszweck.

## Lernziele

- Die wichtigsten globalen NodeJS-Variablen kennen
- Verstehen, wann und wie diese Variablen verwendet werden
- Best Practices für den Umgang mit globalen Variablen

## Wichtige globale Variablen

### `process`
Das `process`-Objekt ist eine der wichtigsten globalen Variablen in NodeJS. Es bietet Informationen über und Kontrolle über den aktuellen NodeJS-Prozess.

```javascript
// Prozess-Informationen
console.log(process.version);        // NodeJS-Version
console.log(process.platform);       // Betriebssystem
console.log(process.arch);          // CPU-Architektur
console.log(process.pid);           // Prozess-ID

// Umgebungsvariablen
console.log(process.env.NODE_ENV);   // Umgebungsvariable

// Kommandozeilen-Argumente
console.log(process.argv);          // Array mit Kommandozeilen-Argumenten

// Prozess-Kontrolle
process.exit(0);                    // Beendet den Prozess
```

### `__dirname` und `__filename`
Diese Variablen enthalten den absoluten Pfad des aktuellen Verzeichnisses bzw. der aktuellen Datei.

```javascript
console.log(__dirname);  // Pfad zum aktuellen Verzeichnis
console.log(__filename); // Pfad zur aktuellen Datei
```

### `global`
Das `global`-Objekt ist der globale Namespace in NodeJS (ähnlich wie `window` im Browser).

```javascript
// Globale Variable definieren
global.meineVariable = 'Wert';

// Von überall zugreifbar
console.log(meineVariable);
```

### `Buffer`
Die `Buffer`-Klasse ist global verfügbar und wird für die Arbeit mit binären Daten verwendet.

```javascript
// Buffer erstellen
const buf = Buffer.from('Hallo');
console.log(buf.toString());
```

### `console`
Das `console`-Objekt bietet verschiedene Methoden für die Ausgabe und das Logging.

```javascript
console.log('Info');      // Standard-Ausgabe
console.error('Fehler');  // Fehler-Ausgabe
console.warn('Warnung');  // Warnung
console.time('Timer');    // Performance-Messung
console.timeEnd('Timer');
```

## Best Practices

### Dos
- Verwende `process.env` für Konfigurationen
- Nutze `__dirname` für Dateipfade
- Setze `NODE_ENV` für Umgebungsunterscheidung
- Verwende `console` für Debugging

### Don'ts
- Vermeide globale Variablen (`global`)
- Überschreibe keine globalen Objekte
- Nutze nicht zu viele `console.log`s in Produktion
- Speichere keine sensiblen Daten in `process.env`

## Häufige Anwendungsfälle

### Umgebungsvariablen
```javascript
const isDevelopment = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;
```

### Dateipfade
```javascript
const path = require('path');
const configPath = path.join(__dirname, 'config.json');
```

### Prozess-Kontrolle
```javascript
process.on('SIGTERM', () => {
    console.log('Beende Prozess...');
    // Aufräumarbeiten
    process.exit(0);
});
```

### Error Handling
```javascript
process.on('uncaughtException', (error) => {
    console.error('Unbehandelter Fehler:', error);
    process.exit(1);
});
```

## Nächste Schritte

Nachdem du die globalen Variablen kennengelernt hast, kannst du mit dem [Events](../events/README.md) Modul fortfahren, um mehr über die Event-basierte Architektur zu lernen. 