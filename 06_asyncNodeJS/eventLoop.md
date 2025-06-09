# Event Loop in NodeJS

In diesem Abschnitt lernst du die grundlegende Funktionsweise des Event Loops in NodeJS kennen.

## Lernziele

- Event Loop Konzept verstehen
- Phasen des Event Loops kennenlernen
- Blockierende vs. nicht-blockierende Operationen
- Performance-Optimierung durch Event Loop Verständnis

## Grundkonzepte

### Was ist der Event Loop?
- Herzstück der asynchronen Programmierung
- Ermöglicht nicht-blockierende I/O-Operationen
- Verwaltet Callback-Queue und Event-Queue
- Single-Threaded mit Event-basierter Architektur

### Event Loop Phasen
1. Timers (setTimeout, setInterval)
2. Pending Callbacks
3. Idle, Prepare
4. Poll
5. Check (setImmediate)
6. Close Callbacks

## Event Loop Funktionsweise

### Grundprinzip
```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

setImmediate(() => {
    console.log('Immediate');
});

console.log('Ende');
```

### Phasen-Beispiel
```javascript
// Phase 1: Timers
setTimeout(() => {
    console.log('Timer 1');
}, 0);

// Phase 2: Pending Callbacks
process.nextTick(() => {
    console.log('Next Tick');
});

// Phase 5: Check
setImmediate(() => {
    console.log('Immediate');
});
```

## Blockierende Operationen

### Problem
```javascript
// Blockierend
const data = fs.readFileSync('grosse-datei.txt');
console.log('Datei gelesen');

// Nicht-blockierend
fs.readFile('grosse-datei.txt', (err, data) => {
    console.log('Datei gelesen');
});
console.log('Weiterer Code');
```

### CPU-intensive Tasks
```javascript
// Blockiert den Event Loop
function blockierendeBerechnung() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }
    return sum;
}

// Besser: Task aufteilen
function nichtBlockierendeBerechnung() {
    let sum = 0;
    let i = 0;
    
    function berechneChunk() {
        for (let j = 0; j < 1000000; j++) {
            sum += i++;
        }
        if (i < 1000000000) {
            setImmediate(berechneChunk);
        }
    }
    
    berechneChunk();
}
```

## Event Loop Optimierung

### Microtasks vs. Macrotasks
```javascript
// Microtasks (Promise)
Promise.resolve().then(() => {
    console.log('Microtask 1');
});

// Macrotasks (setTimeout)
setTimeout(() => {
    console.log('Macrotask 1');
}, 0);
```

### Prioritäten
1. process.nextTick()
2. Promises
3. setImmediate()
4. setTimeout/setInterval

## Best Practices

### Event Loop Performance
- CPU-intensive Tasks aufteilen
- Blockierende Operationen vermeiden
- Unendliche Loops verhindern
- Memory Leaks vermeiden

### Code-Struktur
- Asynchrone Operationen bevorzugen
- Callbacks effizient nutzen
- Event-Listener sauber aufräumen
- Ressourcen rechtzeitig freigeben

### Debugging
- Event Loop Blockierung erkennen
- Performance-Probleme identifizieren
- Memory-Usage überwachen
- Profiling-Tools nutzen

## Event Loop Visualisierung

### Einfaches Beispiel
```
[Event Loop]
    │
    ├─► Timers
    │     └─► setTimeout/setInterval
    │
    ├─► Pending Callbacks
    │     └─► I/O Callbacks
    │
    ├─► Idle, Prepare
    │
    ├─► Poll
    │     └─► Neue I/O Events
    │
    ├─► Check
    │     └─► setImmediate
    │
    └─► Close Callbacks
```

## Nächste Schritte

Nachdem du den Event Loop kennengelernt hast, kannst du mit dem [FileSystem](../fileSystem/README.md) Modul fortfahren, um mehr über asynchrone Dateisystem-Operationen zu lernen. 