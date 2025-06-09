# Asynchrones Programmieren in NodeJS

In diesem Modul lernst du die Grundlagen und fortgeschrittenen Konzepte des asynchronen Programmierens in NodeJS kennen. Asynchrones Programmieren ist ein zentrales Konzept in NodeJS, das es ermöglicht, effizient mit I/O-Operationen und zeitaufwändigen Tasks umzugehen.

## Warum asynchrones Programmieren?

NodeJS ist single-threaded, was bedeutet, dass nur ein Prozess zur gleichen Zeit ausgeführt werden kann. Um dennoch effizient zu arbeiten, nutzt NodeJS asynchrone Programmierung, um:

- I/O-Operationen nicht zu blockieren
- Mehrere Tasks parallel zu verarbeiten
- Ressourcen effizient zu nutzen
- Skalierbare Anwendungen zu erstellen

## Inhalte

1. [Synchron vs. Asynchron](synchronousVsAsynchronous.md)
   - Grundlegende Konzepte
   - Unterschiede und Anwendungsfälle
   - Blockierende vs. nicht-blockierende Operationen

2. [Callbacks](callbacks.md)
   - Traditionelle asynchrone Programmierung
   - Callback-Pattern
   - Callback-Hell und Lösungsansätze

3. [Promises](promises.md)
   - Moderne asynchrone Programmierung
   - Promise-Ketten
   - Fehlerbehandlung
   - Promise.all und Promise.race

4. [Async/Await](asyncAwait.md)
   - Syntaktischer Zucker für Promises
   - Asynchrone Funktionen
   - Try-Catch mit async/await
   - Best Practices

5. [Event Loop](eventLoop.md)
   - Funktionsweise des Event Loops
   - Phasen des Event Loops
   - Microtasks und Macrotasks
   - Performance-Optimierung

## Lernziele

- Verstehen der Grundprinzipien asynchroner Programmierung
- Beherrschen verschiedener asynchroner Patterns
- Effiziente Fehlerbehandlung in asynchronem Code
- Optimierung der Performance durch Verständnis des Event Loops

## Best Practices

- Vermeiden von Callback-Hell
- Korrekte Fehlerbehandlung
- Vermeiden von Blocking-Operationen
- Effiziente Nutzung des Event Loops

## Nächste Schritte

Nach dem Abschluss dieses Moduls wirst du in der Lage sein, effiziente und skalierbare NodeJS-Anwendungen zu entwickeln. Du kannst dann mit dem [FileSystem](../05_fileSystem/README.md) Modul fortfahren, um die praktische Anwendung dieser Konzepte zu üben. 