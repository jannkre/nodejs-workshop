# Connection Pooling in NodeJS

In diesem Abschnitt lernst du die Details über Connection Pooling in NodeJS und wie es mit Worker Threads interagiert.

## Lernziele

- Connection Pooling Konzept verstehen
- Pool-Konfiguration optimieren
- Pool-Verhalten mit Worker Threads
- Performance-Aspekte
- Fehlerbehandlung

## Grundkonzept

Connection Pooling ist ein Mechanismus zur Verwaltung und Wiederverwendung von Datenbankverbindungen. Statt für jede Anfrage eine neue Verbindung zu erstellen, werden Verbindungen in einem Pool vorgehalten und wiederverwendet.

### Vorteile
- Reduzierte Verbindungsaufbauzeit
- Bessere Ressourcennutzung
- Kontrollierte Anzahl von Verbindungen
- Automatische Verbindungswiederherstellung

## Pool-Konfiguration

### Basis-Konfiguration
```javascript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'meine_datenbank',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
```

### Wichtige Parameter
- `connectionLimit`: Maximale Anzahl gleichzeitiger Verbindungen
- `queueLimit`: Maximale Anzahl wartender Anfragen
- `waitForConnections`: Ob auf freie Verbindungen gewartet werden soll
- `enableKeepAlive`: Verbindungen aktiv halten
- `keepAliveInitialDelay`: Verzögerung vor dem ersten Keep-Alive

## Pool-Verhalten

### Verbindungslebenszyklus
```javascript
async function beispielOperation() {
    let connection;
    try {
        // Verbindung aus dem Pool holen
        connection = await pool.getConnection();
        
        // Operation ausführen
        const [rows] = await connection.execute('SELECT * FROM benutzer');
        return rows;
    } catch (err) {
        console.error('Fehler:', err);
        throw err;
    } finally {
        // Verbindung zurück in den Pool geben
        if (connection) {
            connection.release();
        }
    }
}
```

### Verbindungsstatus
```javascript
// Pool-Status überwachen
pool.on('connection', (connection) => {
    console.log('Neue Verbindung erstellt');
});

pool.on('acquire', (connection) => {
    console.log('Verbindung aus dem Pool geholt');
});

pool.on('release', (connection) => {
    console.log('Verbindung zurück in den Pool');
});

pool.on('enqueue', () => {
    console.log('Warte auf verfügbare Verbindung');
});
```

## Worker Threads und Connection Pools

### Pool-Sharing zwischen Threads
```javascript
import { Worker, isMainThread, parentPort } from 'worker_threads';
import mysql from 'mysql2/promise';

if (isMainThread) {
    // Hauptthread: Pool erstellen
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'meine_datenbank',
        connectionLimit: 10
    });
    
    // Worker erstellen und Pool übergeben
    const worker = new Worker('./worker.js', {
        workerData: { poolConfig: pool.config }
    });
    
    worker.on('message', (result) => {
        console.log('Ergebnis vom Worker:', result);
    });
} else {
    // Worker Thread: Eigene Pool-Instanz erstellen
    const pool = mysql.createPool(parentPort.workerData.poolConfig);
    
    // Datenbankoperationen im Worker
    async function workerOperation() {
        try {
            const [rows] = await pool.execute('SELECT * FROM benutzer');
            parentPort.postMessage(rows);
        } catch (err) {
            parentPort.postMessage({ error: err.message });
        }
    }
    
    workerOperation();
}
```

### Wichtige Aspekte bei Worker Threads

1. **Separate Pool-Instanzen**
   - Jeder Worker Thread benötigt seine eigene Pool-Instanz
   - Pools werden nicht zwischen Threads geteilt
   - Konfiguration kann kopiert werden

2. **Ressourcen-Management**
   - Verbindungen werden pro Thread verwaltet
   - Gesamtlimit muss über alle Threads berücksichtigt werden
   - Verbindungen müssen in jedem Thread korrekt freigegeben werden

3. **Fehlerbehandlung**
   - Fehler in einem Thread beeinflussen andere Threads nicht
   - Jeder Thread muss eigene Fehlerbehandlung implementieren
   - Verbindungsfehler müssen pro Thread behandelt werden

## Performance-Optimierung

### Pool-Größe
```javascript
// Optimale Pool-Größe berechnen
const poolSize = Math.min(
    // CPU-Kerne * 2 für I/O-intensive Operationen
    require('os').cpus().length * 2,
    // Maximale Verbindungen der Datenbank
    100
);

const pool = mysql.createPool({
    // ... andere Konfigurationen ...
    connectionLimit: poolSize
});
```

### Verbindungsüberwachung
```javascript
// Pool-Statistiken sammeln
setInterval(() => {
    const stats = {
        active: pool.pool._allConnections.length,
        idle: pool.pool._freeConnections.length,
        queued: pool.pool._connectionQueue.length
    };
    console.log('Pool-Statistiken:', stats);
}, 5000);
```

## Best Practices

### Verbindungsmanagement
- Verbindungen immer mit `try/finally` freigeben
- Timeouts für Verbindungen setzen
- Keep-Alive für lange Verbindungen aktivieren
- Verbindungslimits pro Thread berücksichtigen

### Fehlerbehandlung
- Verbindungsfehler abfangen
- Automatische Wiederherstellung konfigurieren
- Fehler-Logging implementieren
- Retry-Mechanismen für kritische Operationen

### Performance
- Pool-Größe an Workload anpassen
- Verbindungs-Timeout konfigurieren
- Queue-Limit setzen
- Verbindungsstatistiken überwachen

## Beispiel: Skalierbare Anwendung

```javascript
import { Worker } from 'worker_threads';
import mysql from 'mysql2/promise';
import os from 'os';

class SkalierbareAnwendung {
    constructor() {
        this.workerCount = os.cpus().length;
        this.poolConfig = {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'meine_datenbank',
            connectionLimit: Math.floor(100 / this.workerCount), // Verbindungen pro Worker
            waitForConnections: true,
            queueLimit: 0
        };
    }
    
    async start() {
        // Worker erstellen
        for (let i = 0; i < this.workerCount; i++) {
            const worker = new Worker('./worker.js', {
                workerData: { 
                    poolConfig: this.poolConfig,
                    workerId: i
                }
            });
            
            worker.on('message', (result) => {
                console.log(`Worker ${i} Ergebnis:`, result);
            });
            
            worker.on('error', (err) => {
                console.error(`Worker ${i} Fehler:`, err);
            });
        }
    }
}

// Worker-Code (worker.js)
import { parentPort, workerData } from 'worker_threads';
import mysql from 'mysql2/promise';

async function workerMain() {
    const pool = mysql.createPool(workerData.poolConfig);
    
    try {
        // Datenbankoperationen
        const [rows] = await pool.execute('SELECT * FROM benutzer');
        parentPort.postMessage(rows);
    } catch (err) {
        parentPort.postMessage({ error: err.message });
    } finally {
        await pool.end();
    }
}

workerMain();
```

## Nächste Schritte

Nachdem du die Details des Connection Poolings kennengelernt hast, kannst du mit dem [MySQL Integration](mysql.md) Modul fortfahren, um die grundlegende Datenbankintegration zu lernen. 