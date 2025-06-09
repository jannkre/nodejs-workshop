# Streams in NodeJS

In diesem Abschnitt lernst du die Verarbeitung von Datenströmen in NodeJS kennen.

## Warum Streams?

Streams sind ein grundlegendes Konzept in NodeJS, das es ermöglicht, Daten effizient zu verarbeiten. Sie sind besonders nützlich, wenn:

- Große Dateien verarbeitet werden müssen, ohne den gesamten Inhalt in den Speicher zu laden
- Daten in Echtzeit verarbeitet werden sollen (z.B. Video-Streaming, Log-Verarbeitung)
- Daten transformiert werden müssen, während sie verarbeitet werden
- Ressourcen wie Arbeitsspeicher und CPU effizient genutzt werden sollen

Beispiel: Statt eine 1GB große Datei komplett in den Speicher zu laden, können wir sie in kleinen Chunks (z.B. 64KB) verarbeiten. Dies reduziert den Speicherverbrauch erheblich und verbessert die Performance.

## Lernziele

- Stream-Typen verstehen und nutzen
- Daten effizient verarbeiten
- Eigene Streams implementieren
- Best Practices für Streaming

## Stream-Typen

### Readable Streams
```javascript
import { createReadStream } from 'fs';

const readStream = createReadStream('datei.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB Chunks
});

readStream.on('data', (chunk) => {
    console.log('Chunk gelesen:', chunk.length);
});

readStream.on('end', () => {
    console.log('Stream beendet');
});

readStream.on('error', (err) => {
    console.error('Fehler:', err);
});
```

### Writable Streams
```javascript
import { createWriteStream } from 'fs';

const writeStream = createWriteStream('ausgabe.txt', {
    encoding: 'utf8',
    flags: 'a'
});

writeStream.write('Erste Zeile\n');
writeStream.write('Zweite Zeile\n');

writeStream.end(() => {
    console.log('Schreiben abgeschlossen');
});
```

### Duplex Streams
```javascript
import { Duplex } from 'stream';

class EchoStream extends Duplex {
    constructor() {
        super();
        this.data = [];
    }

    _write(chunk, encoding, callback) {
        this.data.push(chunk);
        callback();
    }

    _read(size) {
        if (this.data.length > 0) {
            this.push(this.data.shift());
        } else {
            this.push(null);
        }
    }
}

// Verwendung
const echo = new EchoStream();
echo.write('Hallo');
echo.on('data', (chunk) => {
    console.log('Echo:', chunk.toString());
});
```

### Transform Streams
```javascript
import { Transform } from 'stream';

class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}

// Verwendung
const upperCase = new UpperCaseTransform();
upperCase.write('hallo welt');
upperCase.on('data', (chunk) => {
    console.log(chunk.toString()); // "HALLO WELT"
});
```

## Stream Piping

### Basis Piping
```javascript
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('input.txt');
const writeStream = createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Daten erfolgreich geschrieben');
});
```

### Chained Piping
```javascript
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

class CompressTransform extends Transform {
    _transform(chunk, encoding, callback) {
        // Komprimierungslogik hier
        this.push(chunk);
        callback();
    }
}

const readStream = createReadStream('input.txt');
const writeStream = createWriteStream('output.txt');
const compress = new CompressTransform();

readStream
    .pipe(compress)
    .pipe(writeStream);
```

## Backpressure

### Backpressure Handling
```javascript
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('grosse-datei.txt');
const writeStream = createWriteStream('ausgabe.txt');

readStream.on('data', (chunk) => {
    const canContinue = writeStream.write(chunk);
    
    if (!canContinue) {
        readStream.pause();
    }
});

writeStream.on('drain', () => {
    readStream.resume();
});
```

## Best Practices

### Performance
- Angemessene Chunk-Größen wählen
- Backpressure berücksichtigen
- Memory Leaks vermeiden
- Streams korrekt schließen

### Fehlerbehandlung
- Error-Events abfangen
- Try-Catch für synchrone Operationen
- Fehler propagieren
- Ressourcen aufräumen

### Code-Organisation
- Streams modular aufbauen
- Wiederverwendbare Transform Streams
- Klare Event-Handler
- Dokumentation der Stream-API

## Beispiele

### Datei-Konvertierung
```javascript
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

class JSONToCSVTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk, encoding, callback) {
        const csv = this.convertToCSV(chunk);
        this.push(csv);
        callback();
    }

    convertToCSV(obj) {
        return Object.values(obj).join(',') + '\n';
    }
}

const readStream = createReadStream('input.json');
const writeStream = createWriteStream('output.csv');
const transform = new JSONToCSVTransform();

readStream
    .pipe(transform)
    .pipe(writeStream);
```

### Logging Stream
```javascript
import { Transform } from 'stream';

class LoggingTransform extends Transform {
    _transform(chunk, encoding, callback) {
        console.log(`Verarbeite Chunk: ${chunk.length} Bytes`);
        this.push(chunk);
        callback();
    }
}

const logging = new LoggingTransform();
```

## Nächste Schritte

Nachdem du die Verarbeitung von Datenströmen in NodeJS kennengelernt hast, kannst du mit dem [HTTP](http.md) Modul fortfahren, um die Erstellung von Web-Servern zu lernen. 