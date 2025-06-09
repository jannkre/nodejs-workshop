# Buffer und Streaming in NodeJS

In diesem Abschnitt lernst du die effiziente Arbeit mit Buffern und Streams in NodeJS kennen.

## Lernziele

- Buffer-Konzepte verstehen
- Readable und Writable Streams nutzen
- Transform Streams implementieren
- Best Practices für Streaming

## Buffer

### Buffer erstellen
```javascript
import { Buffer } from 'buffer';

// Buffer mit fester Größe
const buf1 = Buffer.alloc(10);

// Buffer mit Inhalt
const buf2 = Buffer.from('Hallo Welt');

// Buffer aus Array
const buf3 = Buffer.from([1, 2, 3, 4, 5]);
```

### Buffer Operationen
```javascript
import { Buffer } from 'buffer';

const buf = Buffer.from('Hallo Welt');

// Lesen
console.log(buf.toString()); // 'Hallo Welt'
console.log(buf.toString('hex')); // Hexadezimal

// Schreiben
buf.write('Neuer Text');
console.log(buf.toString());

// Kopieren
const buf2 = Buffer.alloc(10);
buf.copy(buf2);
```

## Readable Streams

### Datei lesen
```javascript
import { createReadStream } from 'fs';

const readStream = createReadStream('grosse-datei.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB Chunks
});

readStream.on('data', (chunk) => {
    console.log('Chunk gelesen:', chunk.length);
});

readStream.on('end', () => {
    console.log('Datei komplett gelesen');
});

readStream.on('error', (err) => {
    console.error('Fehler beim Lesen:', err);
});
```

### Stream Piping
```javascript
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('input.txt');
const writeStream = createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Daten erfolgreich geschrieben');
});
```

## Writable Streams

### Datei schreiben
```javascript
import { createWriteStream } from 'fs';

const writeStream = createWriteStream('output.txt', {
    encoding: 'utf8',
    flags: 'a' // Anhängen
});

writeStream.write('Erste Zeile\n');
writeStream.write('Zweite Zeile\n');

writeStream.end(() => {
    console.log('Schreiben abgeschlossen');
});
```

### Stream Events
```javascript
import { createWriteStream } from 'fs';

const writeStream = createWriteStream('output.txt');

writeStream.on('drain', () => {
    console.log('Buffer geleert');
});

writeStream.on('error', (err) => {
    console.error('Fehler beim Schreiben:', err);
});

writeStream.on('finish', () => {
    console.log('Stream geschlossen');
});
```

## Transform Streams

### Eigener Transform Stream
```javascript
import { Transform } from 'stream';

class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperChunk = chunk.toString().toUpperCase();
        this.push(upperChunk);
        callback();
    }
}

const upperCase = new UpperCaseTransform();
```

### Transform Stream verwenden
```javascript
import { createReadStream, createWriteStream } from 'fs';
import { UpperCaseTransform } from './transforms.js';

const readStream = createReadStream('input.txt');
const writeStream = createWriteStream('output.txt');
const upperCase = new UpperCaseTransform();

readStream
    .pipe(upperCase)
    .pipe(writeStream);
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

Nachdem du die Konzepte von Buffer und Streaming kennengelernt hast, kannst du mit dem [Filesystem Promises](fsPromises.md) Modul fortfahren, um die moderne Promise-basierte API für Dateisystem-Operationen zu lernen. 