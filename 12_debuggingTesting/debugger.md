# Debugger & Haltepunkte in NodeJS

## Einführung

Der NodeJS-Debugger ist ein mächtiges Werkzeug zur Fehlersuche und Code-Analyse. In diesem Modul lernst du, wie du den Debugger effektiv einsetzen kannst.

## Debugger starten

### 1. Über die Kommandozeile

Der Debugger kann direkt über die Kommandozeile gestartet werden. Die Option `--inspect` aktiviert den Debug-Modus, während `--inspect-brk` zusätzlich einen Haltepunkt am Programmstart setzt:

```bash
# Debug-Modus starten
node --inspect app.js

# Debug-Modus mit Haltepunkt am Start
node --inspect-brk app.js
```

### 2. In VS Code

VS Code bietet eine benutzerfreundliche Debugging-Oberfläche. Die Konfiguration erfolgt über eine JSON-Datei, die die Debug-Einstellungen definiert:

1. Öffne die Debug-Ansicht (Ctrl+Shift+D)
2. Erstelle eine neue Debug-Konfiguration:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Program",
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```

## Haltepunkte setzen

### 1. Code-Haltepunkte

Code-Haltepunkte werden direkt im Quellcode gesetzt und ermöglichen es, die Ausführung an bestimmten Stellen zu pausieren. Im folgenden Beispiel werden drei strategische Haltepunkte gesetzt, um die Berechnung eines Gesamtbetrags zu überwachen:

```javascript
// Beispiel-Code mit Haltepunkten
function calculateTotal(items) {
    let total = 0;  // Haltepunkt 1
    
    for (const item of items) {
        total += item.price;  // Haltepunkt 2
    }
    
    return total;  // Haltepunkt 3
}
```

### 2. Bedingte Haltepunkte

Bedingte Haltepunkte werden nur ausgelöst, wenn eine bestimmte Bedingung erfüllt ist. Dies ist besonders nützlich, um spezifische Fälle zu untersuchen:

```javascript
// Nur wenn total > 1000
if (total > 1000) {  // Bedingter Haltepunkt
    console.log('Großer Betrag!');
}
```

## Debugging-Befehle

### 1. Grundlegende Befehle

Die Debugger-Konsole bietet verschiedene Befehle zur Steuerung der Programmausführung. Diese Befehle helfen bei der schrittweisen Analyse des Codes:

```javascript
// Debugger-Konsole
debug> help  // Hilfe anzeigen
debug> cont  // Ausführung fortsetzen
debug> next  // Nächste Zeile
debug> step  // In Funktion einsteigen
debug> out   // Aus Funktion aussteigen
```

### 2. Variablen inspizieren

Die Überwachung von Variablen ist ein zentrales Feature des Debuggers. Mit diesen Befehlen können Sie den Wert und die Änderungen von Variablen während der Ausführung verfolgen:

```javascript
debug> watch('variableName')  // Variable beobachten
debug> unwatch('variableName')  // Beobachtung beenden
debug> exec variableName  // Wert anzeigen
```

## Debugging-Strategien

### 1. Systematisches Vorgehen

Ein strukturierter Ansatz ist entscheidend für effektives Debugging. Die folgenden Schritte helfen, Probleme systematisch zu identifizieren und zu beheben:

1. **Reproduktion**
   - Fehler konsistent reproduzieren
   - Minimale Testumgebung erstellen

2. **Isolation**
   - Problembereich eingrenzen
   - Unabhängige Komponenten testen

3. **Analyse**
   - Variablenwerte überprüfen
   - Ausführungspfad nachvollziehen

### 2. Debugging-Techniken

Verschiedene Techniken können kombiniert werden, um Probleme effektiv zu lokalisieren. Hier sind drei gängige Ansätze mit Beispielen:

```javascript
// 1. Console.log Strategie
console.log('Variable:', variable);
console.log('Objekt:', JSON.stringify(object, null, 2));

// 2. Debugger-Statement
debugger;  // Programmatischer Haltepunkt

// 3. Try-Catch mit detailliertem Logging
try {
    // Code
} catch (error) {
    console.error('Fehler:', {
        message: error.message,
        stack: error.stack,
        context: { /* relevante Variablen */ }
    });
}
```

### 3. Debugger-Statement im Code

Das `debugger`-Statement bietet eine programmatische Möglichkeit, Haltepunkte zu setzen. Es ist besonders nützlich für bedingtes Debugging:

```javascript
function calculateTotal(items) {
    let total = 0;
    
    for (const item of items) {
        total += item.price;
        
        // Debugger stoppt hier, wenn der Debugger aktiv ist
        debugger;
        
        console.log(`Aktueller Gesamtbetrag: ${total}`);
    }
    
    return total;
}
```

## VS Code Debugging

### 1. Launch-Konfigurationen

VS Code ermöglicht verschiedene Debugging-Konfigurationen. Diese JSON-Konfiguration definiert zwei gängige Szenarien: das Debuggen der aktuellen Datei und das Anhängen an einen laufenden Prozess:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Current File",
            "program": "${file}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "port": 9229
        }
    ]
}
```

### 2. Debugging-Features

VS Code bietet eine umfangreiche Palette an Debugging-Features. Diese Tools helfen bei der detaillierten Analyse des Programmablaufs:

- **Watch**: Variablen überwachen
- **Call Stack**: Aufrufstapel analysieren
- **Breakpoints**: Haltepunkte verwalten
- **Variables**: Variablenwerte inspizieren

## Best Practices

1. **Vorbereitung**
   - Debugging-Umgebung einrichten
   - Relevante Haltepunkte setzen
   - Testdaten vorbereiten

2. **Dokumentation**
   - Debugging-Schritte dokumentieren
   - Lösungen festhalten
   - Wiederverwendbare Debugging-Konfigurationen erstellen

3. **Wartung**
   - Debugging-Code entfernen
   - Produktions-Code bereinigen
   - Debugging-Konfigurationen aktualisieren 