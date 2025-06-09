# Debugger & Haltepunkte in NodeJS

## Einführung

Der NodeJS-Debugger ist ein mächtiges Werkzeug zur Fehlersuche und Code-Analyse. In diesem Modul lernst du, wie du den Debugger effektiv einsetzen kannst.

## Debugger starten

### 1. Über die Kommandozeile

```bash
# Debug-Modus starten
node --inspect app.js

# Debug-Modus mit Haltepunkt am Start
node --inspect-brk app.js
```

### 2. In VS Code

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

```javascript
// Nur wenn total > 1000
if (total > 1000) {  // Bedingter Haltepunkt
    console.log('Großer Betrag!');
}
```

## Debugging-Befehle

### 1. Grundlegende Befehle

```javascript
// Debugger-Konsole
debug> help  // Hilfe anzeigen
debug> cont  // Ausführung fortsetzen
debug> next  // Nächste Zeile
debug> step  // In Funktion einsteigen
debug> out   // Aus Funktion aussteigen
```

### 2. Variablen inspizieren

```javascript
debug> watch('variableName')  // Variable beobachten
debug> unwatch('variableName')  // Beobachtung beenden
debug> exec variableName  // Wert anzeigen
```

## Debugging-Strategien

### 1. Systematisches Vorgehen

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

- **Watch**: Variablen überwachen
- **Call Stack**: Aufrufstapel analysieren
- **Breakpoints**: Haltepunkte verwalten
- **Variables**: Variablenwerte inspizieren

## Übung

Debugge den folgenden Code und finde den Fehler:

```javascript
function processUserData(user) {
    let result = {};
    
    // Fehlerhafte Logik
    result.name = user.name;
    result.age = user.age;
    result.address = user.address.street;  // Möglicher Fehler
    
    return result;
}

// Test-Daten
const user = {
    name: "Max",
    age: 25
    // address fehlt
};

// Ausführung
const processed = processUserData(user);
console.log(processed);
```

Lösung:

```javascript
function processUserData(user) {
    let result = {};
    
    // Sichere Verarbeitung
    result.name = user.name;
    result.age = user.age;
    
    // Null-Check für address
    if (user.address) {
        result.address = user.address.street;
    } else {
        result.address = 'Keine Adresse verfügbar';
    }
    
    return result;
}
```

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