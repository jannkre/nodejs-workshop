# Grundlegende Dateisystem-Operationen

In diesem Abschnitt lernst du die grundlegenden Operationen für die Arbeit mit dem Dateisystem in NodeJS kennen.

## Lernziele

- Dateien lesen und schreiben
- Verzeichnisse verwalten
- Datei- und Verzeichnisinformationen abrufen
- Berechtigungen und Attribute verwalten

## Synchron vs. Asynchron

NodeJS bietet für die meisten Dateisystem-Operationen zwei Varianten:
- **Synchron**: Blockiert den Event Loop (mit "Sync" Suffix)
- **Asynchron**: Nicht-blockierend (ohne "Sync" Suffix)

### Wichtige Unterschiede

| Synchron | Asynchron |
|----------|-----------|
| Blockiert den Event Loop | Läuft im Hintergrund |
| Direkte Rückgabe des Ergebnisses | Callback oder Promise |
| Fehler werden als Exceptions geworfen | Fehler im Callback |
| Einfacher zu lesen | Besser für Performance |

## Datei-Operationen

### Dateien lesen
Die `readFile`-Funktion ermöglicht das Lesen von Dateien. Die synchrone Version blockiert den Event Loop, während die asynchrone Version im Hintergrund läuft. Beide Varianten unterstützen verschiedene Encodings (z.B. 'utf8' für Text).

```javascript
import { readFileSync, readFile } from 'fs';

// Synchron - blockiert den Event Loop
try {
    const data = readFileSync('datei.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error('Fehler beim Lesen:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
readFile('datei.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Fehler beim Lesen:', err);
        return;
    }
    console.log(data);
});

// Variante 2: Promise (empfohlen)
const data = await readFile('datei.txt', 'utf8');
console.log(data);
```

### Dateien schreiben
Mit `writeFile` können wir neue Dateien erstellen oder bestehende überschreiben. Die Funktion erwartet den Dateinamen, den Inhalt und optional das Encoding. Die synchrone Version ist einfacher zu verwenden, blockiert aber den Event Loop.

```javascript
import { writeFileSync, writeFile } from 'fs';

// Synchron - blockiert den Event Loop
try {
    writeFileSync('datei.txt', 'Hallo Welt!', 'utf8');
    console.log('Datei geschrieben');
} catch (err) {
    console.error('Fehler beim Schreiben:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
writeFile('datei.txt', 'Hallo Welt!', 'utf8', (err) => {
    if (err) {
        console.error('Fehler beim Schreiben:', err);
        return;
    }
    console.log('Datei geschrieben');
});

// Variante 2: Promise (empfohlen)
await writeFile('datei.txt', 'Hallo Welt!', 'utf8');
console.log('Datei geschrieben');
```

### Dateien anfügen
`appendFile` fügt neuen Inhalt an das Ende einer bestehenden Datei an. Dies ist nützlich für Log-Dateien oder wenn wir Daten schrittweise sammeln möchten. Die Funktion behält den bestehenden Inhalt bei und fügt nur neue Daten hinzu.

```javascript
import { appendFileSync, appendFile } from 'fs';

// Synchron - blockiert den Event Loop
try {
    appendFileSync('datei.txt', '\nNeue Zeile', 'utf8');
    console.log('Text angefügt');
} catch (err) {
    console.error('Fehler beim Anfügen:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
appendFile('datei.txt', '\nNeue Zeile', 'utf8', (err) => {
    if (err) {
        console.error('Fehler beim Anfügen:', err);
        return;
    }
    console.log('Text angefügt');
});

// Variante 2: Promise (empfohlen)
await appendFile('datei.txt', '\nNeue Zeile', 'utf8');
console.log('Text angefügt');
```

## Verzeichnis-Operationen

### Verzeichnisse erstellen
Mit `mkdir` können wir neue Verzeichnisse anlegen. Die Funktion erstellt ein einzelnes Verzeichnis und wirft einen Fehler, wenn das übergeordnete Verzeichnis nicht existiert. Für verschachtelte Verzeichnisse gibt es `mkdirSync` mit der Option `{ recursive: true }`.

```javascript
import { mkdirSync, mkdir } from 'fs';

// Synchron - blockiert den Event Loop
try {
    mkdirSync('neues-verzeichnis');
    console.log('Verzeichnis erstellt');
} catch (err) {
    console.error('Fehler beim Erstellen:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
mkdir('neues-verzeichnis', (err) => {
    if (err) {
        console.error('Fehler beim Erstellen:', err);
        return;
    }
    console.log('Verzeichnis erstellt');
});

// Variante 2: Promise (empfohlen)
await mkdir('neues-verzeichnis');
console.log('Verzeichnis erstellt');
```

### Verzeichnisse lesen
`readdir` listet den Inhalt eines Verzeichnisses auf. Die Funktion gibt ein Array mit Datei- und Verzeichnisnamen zurück. Mit zusätzlichen Optionen können wir auch versteckte Dateien oder Dateiinformationen abrufen.

```javascript
import { readdirSync, readdir } from 'fs';

// Synchron - blockiert den Event Loop
try {
    const files = readdirSync('verzeichnis');
    console.log('Dateien:', files);
} catch (err) {
    console.error('Fehler beim Lesen:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
readdir('verzeichnis', (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen:', err);
        return;
    }
    console.log('Dateien:', files);
});

// Variante 2: Promise (empfohlen)
const files = await readdir('verzeichnis');
console.log('Dateien:', files);
```

### Verzeichnisse löschen
`rmdir` entfernt ein leeres Verzeichnis. Wichtig: Das Verzeichnis muss leer sein, sonst wird ein Fehler geworfen. Für das Löschen von Verzeichnissen mit Inhalt gibt es separate Funktionen wie `rm` oder `rm -rf`.

```javascript
import { rmdirSync, rmdir } from 'fs';

// Synchron - blockiert den Event Loop
try {
    rmdirSync('verzeichnis');
    console.log('Verzeichnis gelöscht');
} catch (err) {
    console.error('Fehler beim Löschen:', err);
}

// Asynchron - nicht-blockierend
// Variante 1: Callback
rmdir('verzeichnis', (err) => {
    if (err) {
        console.error('Fehler beim Löschen:', err);
        return;
    }
    console.log('Verzeichnis gelöscht');
});

// Variante 2: Promise (empfohlen)
await rmdir('verzeichnis');
console.log('Verzeichnis gelöscht');
```

## Datei- und Verzeichnisinformationen

### Statistik abrufen
`stat` liefert detaillierte Informationen über eine Datei oder ein Verzeichnis. Dazu gehören Größe, Erstellungszeit, letzte Änderung und Berechtigungen. Diese Informationen sind nützlich für Dateioperationen und Überprüfungen.

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
Mit `chmod` können wir die Zugriffsrechte einer Datei oder eines Verzeichnisses ändern. Die Berechtigungen werden als Oktalzahl angegeben (z.B. '755' für rwxr-xr-x). Dies ist besonders wichtig für die Sicherheit von Anwendungen.

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
`chown` ermöglicht das Ändern des Besitzers und der Gruppe einer Datei oder eines Verzeichnisses. Dies erfordert in der Regel Root-Rechte und ist wichtig für die Systemadministration.

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

### Wann synchron, wann asynchron?
- **Synchron**: 
  - Nur für kleine Dateien
  - In CLI-Tools
  - Bei Start-up Operationen
  - Wenn die Reihenfolge wichtig ist

- **Asynchron**:
  - Für Web-Server
  - Bei großen Dateien
  - Für parallele Operationen
  - In Performance-kritischen Anwendungen

### Fehlerbehandlung
- Immer try-catch für synchrone Operationen
- Error-First Callbacks oder try-catch mit async/await für asynchrone Operationen
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