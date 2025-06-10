# Filesystem Promises API

In diesem Abschnitt lernst du die moderne Promise-basierte API für Dateisystem-Operationen in NodeJS kennen.

## Lernziele

- Promise-basierte Dateisystem-Operationen verstehen
- Async/Await mit Dateisystem-Operationen nutzen
- Fehlerbehandlung mit Promises
- Best Practices für die Promise-API

## Grundlagen

### Modul importieren
```javascript
import { promises as fs } from 'fs';
// oder spezifische Funktionen importieren
import { readFile, writeFile } from 'fs/promises';
```

## Datei-Operationen

### Dateien lesen
```javascript
import { readFile } from 'fs/promises';

// Mit async/await
async function readFileContent() {
    try {
        const content = await readFile('datei.txt', 'utf8');
        console.log(content);
    } catch (err) {
        console.error('Fehler beim Lesen:', err);
    }
}

// Mit Promise-Kette
readFile('datei.txt', 'utf8')
    .then(content => console.log(content))
    .catch(err => console.error('Fehler beim Lesen:', err));
```

### Dateien schreiben
```javascript
import { writeFile } from 'fs/promises';

async function writeFileContent() {
    try {
        await writeFile('datei.txt', 'Hallo Welt!', 'utf8');
        console.log('Datei geschrieben');
    } catch (err) {
        console.error('Fehler beim Schreiben:', err);
    }
}
```

### Dateien anfügen
```javascript
import { appendFile } from 'fs/promises';

async function appendContent() {
    try {
        await appendFile('datei.txt', '\nNeue Zeile', 'utf8');
        console.log('Inhalt angefügt');
    } catch (err) {
        console.error('Fehler beim Anfügen:', err);
    }
}
```

## Verzeichnis-Operationen

### Verzeichnisse erstellen
```javascript
import { mkdir } from 'fs/promises';

async function createDirectory() {
    try {
        await mkdir('neues-verzeichnis', { recursive: true });
        console.log('Verzeichnis erstellt');
    } catch (err) {
        console.error('Fehler beim Erstellen:', err);
    }
}
```

### Verzeichnisse lesen
```javascript
import { readdir } from 'fs/promises';

async function listDirectory() {
    try {
        const files = await readdir('verzeichnis');
        console.log('Dateien:', files);
    } catch (err) {
        console.error('Fehler beim Lesen:', err);
    }
}
```

### Verzeichnisse löschen
```javascript
import { rmdir } from 'fs/promises';

async function removeDirectory() {
    try {
        await rmdir('verzeichnis', { recursive: true });
        console.log('Verzeichnis gelöscht');
    } catch (err) {
        console.error('Fehler beim Löschen:', err);
    }
}
```

## Datei- und Verzeichnisinformationen

### Statistik abrufen
```javascript
import { stat } from 'fs/promises';

async function getFileStats() {
    try {
        const stats = await stat('datei.txt');
        console.log('Größe:', stats.size);
        console.log('Erstellt:', stats.birthtime);
        console.log('Modifiziert:', stats.mtime);
    } catch (err) {
        console.error('Fehler beim Abrufen der Statistik:', err);
    }
}
```

## Parallele Operationen

### Mehrere Dateien lesen
```javascript
import { readFile } from 'fs/promises';

async function readMultipleFiles() {
    try {
        const [file1, file2] = await Promise.all([
            readFile('datei1.txt', 'utf8'),
            readFile('datei2.txt', 'utf8')
        ]);
        console.log('Datei 1:', file1);
        console.log('Datei 2:', file2);
    } catch (err) {
        console.error('Fehler beim Lesen:', err);
    }
}
```

## Best Practices

### Fehlerbehandlung
- Try-Catch für async/await
- Promise-Ketten für komplexe Operationen
- Fehler propagieren
- Aussagekräftige Fehlermeldungen

### Performance
- Parallele Operationen nutzen
- Große Dateien in Chunks verarbeiten
- Unnötige Operationen vermeiden
- Ressourcen rechtzeitig freigeben

### Code-Organisation
- Async-Funktionen modular aufbauen
- Promise-Ketten übersichtlich halten
- Fehlerbehandlung zentralisieren
- Dokumentation der API

## Beispiele

### Datei-Kopie
```javascript
import { readFile, writeFile } from 'fs/promises';

async function copyFile(source, target) {
    try {
        const content = await readFile(source, 'utf8');
        await writeFile(target, content, 'utf8');
        console.log('Datei kopiert');
    } catch (err) {
        console.error('Fehler beim Kopieren:', err);
    }
}
```

### Verzeichnis-Struktur
```javascript
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

async function getDirectoryStructure(dir) {
    try {
        const items = await readdir(dir);
        const structure = await Promise.all(
            items.map(async item => {
                const path = join(dir, item);
                const stats = await stat(path);
                return {
                    name: item,
                    isDirectory: stats.isDirectory(),
                    size: stats.size
                };
            })
        );
        return structure;
    } catch (err) {
        console.error('Fehler beim Lesen der Struktur:', err);
    }
}
```