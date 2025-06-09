# Grundlegende Dateisystem-Operationen

In diesem Abschnitt lernst du die grundlegenden Operationen für die Arbeit mit dem Dateisystem in NodeJS kennen.

## Lernziele

- Dateien lesen und schreiben
- Verzeichnisse verwalten
- Datei- und Verzeichnisinformationen abrufen
- Berechtigungen und Attribute verwalten

## Datei-Operationen

### Dateien lesen
```javascript
import { readFileSync, readFile } from 'fs';

// Synchron
try {
    const data = readFileSync('datei.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error('Fehler beim Lesen:', err);
}

// Asynchron
readFile('datei.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Fehler beim Lesen:', err);
        return;
    }
    console.log(data);
});
```

### Dateien schreiben
```javascript
import { writeFileSync, writeFile } from 'fs';

// Synchron
try {
    writeFileSync('datei.txt', 'Hallo Welt!', 'utf8');
    console.log('Datei geschrieben');
} catch (err) {
    console.error('Fehler beim Schreiben:', err);
}

// Asynchron
writeFile('datei.txt', 'Hallo Welt!', 'utf8', (err) => {
    if (err) {
        console.error('Fehler beim Schreiben:', err);
        return;
    }
    console.log('Datei geschrieben');
});
```

### Dateien anfügen
```javascript
import { appendFileSync, appendFile } from 'fs';

// Synchron
try {
    appendFileSync('datei.txt', '\nNeue Zeile', 'utf8');
} catch (err) {
    console.error('Fehler beim Anfügen:', err);
}

// Asynchron
appendFile('datei.txt', '\nNeue Zeile', 'utf8', (err) => {
    if (err) {
        console.error('Fehler beim Anfügen:', err);
    }
});
```

## Verzeichnis-Operationen

### Verzeichnisse erstellen
```javascript
import { mkdirSync, mkdir } from 'fs';

// Synchron
try {
    mkdirSync('neues-verzeichnis');
} catch (err) {
    console.error('Fehler beim Erstellen:', err);
}

// Asynchron
mkdir('neues-verzeichnis', (err) => {
    if (err) {
        console.error('Fehler beim Erstellen:', err);
    }
});
```

### Verzeichnisse lesen
```javascript
import { readdirSync, readdir } from 'fs';

// Synchron
try {
    const files = readdirSync('verzeichnis');
    console.log('Dateien:', files);
} catch (err) {
    console.error('Fehler beim Lesen:', err);
}

// Asynchron
readdir('verzeichnis', (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen:', err);
        return;
    }
    console.log('Dateien:', files);
});
```

### Verzeichnisse löschen
```javascript
import { rmdirSync, rmdir } from 'fs';

// Synchron
try {
    rmdirSync('verzeichnis');
} catch (err) {
    console.error('Fehler beim Löschen:', err);
}

// Asynchron
rmdir('verzeichnis', (err) => {
    if (err) {
        console.error('Fehler beim Löschen:', err);
    }
});
```

## Datei- und Verzeichnisinformationen

### Statistik abrufen
```javascript
import { statSync, stat } from 'fs';

// Synchron
try {
    const stats = statSync('datei.txt');
    console.log('Größe:', stats.size);
    console.log('Erstellt:', stats.birthtime);
    console.log('Modifiziert:', stats.mtime);
} catch (err) {
    console.error('Fehler beim Abrufen der Statistik:', err);
}

// Asynchron
stat('datei.txt', (err, stats) => {
    if (err) {
        console.error('Fehler beim Abrufen der Statistik:', err);
        return;
    }
    console.log('Größe:', stats.size);
    console.log('Erstellt:', stats.birthtime);
    console.log('Modifiziert:', stats.mtime);
});
```

## Berechtigungen und Attribute

### Berechtigungen ändern
```javascript
import { chmodSync, chmod } from 'fs';

// Synchron
try {
    chmodSync('datei.txt', '755');
} catch (err) {
    console.error('Fehler beim Ändern der Berechtigungen:', err);
}

// Asynchron
chmod('datei.txt', '755', (err) => {
    if (err) {
        console.error('Fehler beim Ändern der Berechtigungen:', err);
    }
});
```

### Besitzer ändern
```javascript
import { chownSync, chown } from 'fs';

// Synchron
try {
    chownSync('datei.txt', 1000, 1000);
} catch (err) {
    console.error('Fehler beim Ändern des Besitzers:', err);
}

// Asynchron
chown('datei.txt', 1000, 1000, (err) => {
    if (err) {
        console.error('Fehler beim Ändern des Besitzers:', err);
    }
});
```

## Best Practices

### Fehlerbehandlung
- Immer try-catch für synchrone Operationen
- Error-First Callbacks für asynchrone Operationen
- Aussagekräftige Fehlermeldungen
- Fehler protokollieren

### Performance
- Asynchrone Operationen bevorzugen
- Große Dateien in Chunks verarbeiten
- Unnötige Operationen vermeiden
- Ressourcen rechtzeitig freigeben

### Sicherheit
- Pfade validieren
- Berechtigungen prüfen
- Sensible Daten schützen
- Fehler nicht preisgeben

## Nächste Schritte

Nachdem du die grundlegenden Dateisystem-Operationen kennengelernt hast, kannst du mit dem [Buffer und Streaming](bufferAndStreaming.md) Modul fortfahren, um effizientere Methoden für die Arbeit mit Dateien zu lernen. 