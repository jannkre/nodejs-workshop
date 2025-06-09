# FileSystem in NodeJS

In diesem Modul lernst du die verschiedenen Möglichkeiten kennen, wie du in NodeJS mit dem Dateisystem interagieren kannst.

## Lernziele

- Grundlegende Dateisystem-Operationen verstehen
- Unterschiedliche Dateisystem-APIs kennenlernen
- Buffer und Streaming-Konzepte verstehen
- Best Practices für Dateisystem-Operationen

## Inhaltsverzeichnis

1. [Grundlegende Operationen](basicOperations.md)
   - Dateien lesen und schreiben
   - Verzeichnisse erstellen und löschen
   - Datei- und Verzeichnisinformationen
   - Berechtigungen und Attribute

2. [Buffer und Streaming](bufferAndStreaming.md)
   - Buffer-Konzepte
   - Readable Streams
   - Writable Streams
   - Transform Streams
   - Best Practices für Streaming

3. [Filesystem Promises](fsPromises.md)
   - Promise-basierte API
   - Async/Await mit fs.promises
   - Fehlerbehandlung
   - Performance-Vorteile

## Wichtige Konzepte

### Synchron vs. Asynchron
- Blockierende Operationen (Sync)
- Nicht-blockierende Operationen (Async)
- Performance-Überlegungen
- Anwendungsfälle

### Dateisystem-APIs
- fs (Callback-basiert)
- fs.promises (Promise-basiert)
- fs/promises (ES Modules)
- Best Practices für API-Auswahl

### Sicherheit
- Dateiberechtigungen
- Pfad-Validierung
- Fehlerbehandlung
- Ressourcen-Management

## Best Practices

### Performance
- Streaming für große Dateien
- Asynchrone Operationen
- Buffer-Größen optimieren
- Memory-Management

### Fehlerbehandlung
- Try-Catch Blöcke
- Error-First Callbacks
- Promise Error Handling
- Logging und Monitoring

### Code-Organisation
- Modulare Struktur
- Klare Fehlerbehandlung
- Dokumentation
- Testing

## Nächste Schritte

Beginne mit dem [Grundlegende Operationen](basicOperations.md) Modul, um die Basis-Funktionalitäten des Dateisystems kennenzulernen. 