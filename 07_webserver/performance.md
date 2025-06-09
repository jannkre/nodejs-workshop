# Performance & Asynchrone Callbacks

In diesem Abschnitt lernst du, wie asynchrone Callbacks und der Event Loop die Performance von NodeJS Webservern beeinflussen.

## Lernziele

- Event Loop in NodeJS verstehen
- Performance-Implikationen von asynchronen Callbacks
- Blockierende vs. nicht-blockierende Operationen
- Optimierung von Callback-Ketten

## Event Loop und Performance

### Grundprinzip des Event Loops
```javascript
import express from 'express';

const app = express();

// Blockierende Operation blockiert den Event Loop
app.get('/blocking', (req, res) => {
    // Diese Operation blockiert den Event Loop
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += i;
    }
    res.json({ result });
});

// Nicht-blockierende Operation nutzt den Event Loop
app.get('/non-blocking', (req, res) => {
    // Diese Operation wird asynchron ausgeführt
    setImmediate(() => {
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += i;
        }
        res.json({ result });
    });
});
```

### Callback-Ketten und Performance
```javascript
import express from 'express';
import { readFile } from 'fs/promises';

const app = express();

// Ineffiziente Callback-Kette
app.get('/inefficient', (req, res) => {
    readFile('data1.json', 'utf8')
        .then(data1 => {
            return readFile('data2.json', 'utf8')
                .then(data2 => {
                    return readFile('data3.json', 'utf8')
                        .then(data3 => {
                            res.json({
                                data1: JSON.parse(data1),
                                data2: JSON.parse(data2),
                                data3: JSON.parse(data3)
                            });
                        });
                });
        });
});

// Effiziente parallele Ausführung
app.get('/efficient', async (req, res) => {
    try {
        const [data1, data2, data3] = await Promise.all([
            readFile('data1.json', 'utf8'),
            readFile('data2.json', 'utf8'),
            readFile('data3.json', 'utf8')
        ]);
        
        res.json({
            data1: JSON.parse(data1),
            data2: JSON.parse(data2),
            data3: JSON.parse(data3)
        });
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Lesen der Daten' });
    }
});
```

## Performance-Implikationen

### Blockierende Operationen
- Blockieren den Event Loop
- Verzögern die Verarbeitung anderer Requests
- Reduzieren die Gesamtperformance
- Sollten vermieden werden

### Asynchrone Operationen
- Nutzen den Event Loop effizient
- Erlauben parallele Verarbeitung
- Verbessern die Skalierbarkeit
- Optimieren die Ressourcennutzung

## Best Practices

### Event Loop Optimierung
- Blockierende Operationen vermeiden
- CPU-intensive Tasks in Worker Threads auslagern
- Callback-Ketten optimieren
- Promise.all für parallele Operationen nutzen

### Asynchrone Programmierung
- Async/Await statt Callback-Hell
- Fehlerbehandlung in Promise-Ketten
- Ressourcen nach Verwendung freigeben
- Timeouts für asynchrone Operationen setzen

## Beispiel: Performance-optimierter Server

```javascript
import express from 'express';
import { Worker } from 'worker_threads';

const app = express();

// CPU-intensive Operation in Worker Thread
app.get('/compute', (req, res) => {
    const worker = new Worker('./compute-worker.js');
    
    worker.on('message', (result) => {
        res.json({ result });
    });
    
    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
    
    worker.postMessage({ task: 'compute' });
});

// Asynchrone Operationen parallel ausführen
app.get('/parallel', async (req, res) => {
    try {
        const [result1, result2] = await Promise.all([
            asyncOperation1(),
            asyncOperation2()
        ]);
        
        res.json({ result1, result2 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Nicht-blockierende Verarbeitung
app.get('/process', (req, res) => {
    setImmediate(() => {
        // Asynchrone Verarbeitung
        processData()
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err.message }));
    });
});

app.listen(3000, () => {
    console.log('Performance-optimierter Server läuft auf http://localhost:3000');
});
```

## Nächste Schritte

Nachdem du die Performance-Aspekte von asynchronen Callbacks und dem Event Loop kennengelernt hast, kannst du mit dem [HTTP Server](httpServer.md) Modul beginnen, um die Grundlagen der Webserver-Entwicklung zu lernen. 