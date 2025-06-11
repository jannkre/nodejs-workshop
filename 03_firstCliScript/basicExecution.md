# Basic Skript-Ausführung

In diesem Abschnitt lernst du die grundlegenden Schritte zum Erstellen und Ausführen von NodeJS-Skripten im Terminal.

## Ein einfaches Skript erstellen

1. Erstelle eine neue Datei mit der Endung `.js`:
```bash
touch hello.js
```

2. Füge Code in die Datei ein:
```javascript
console.log("Hallo Welt!");
```

## Skript ausführen

Es gibt mehrere Möglichkeiten, ein NodeJS-Skript auszuführen:

### 1. Direkte Ausführung
```bash
node hello.js
```

### 2. Mit Node REPL
```bash
node
> .load hello.js
```

### 3. Als ausführbare Datei (Unix/Linux/macOS)
```bash
# 1. Shebang hinzufügen
echo '#!/usr/bin/env node' > hello.js

# 2. Ausführungsrechte setzen
chmod +x hello.js

# 3. Ausführen
./hello.js
```

## Best Practices

1. **Dateinamen**
   - Verwende aussagekräftige Namen
   - Endung `.js` für JavaScript-Dateien
   - Keine Leerzeichen im Dateinamen

2. **Ausführung**
   - Immer `node` vor dem Dateinamen
   - Pfad angeben, wenn nicht im aktuellen Verzeichnis
   - Fehlerausgabe beachten

3. **Debugging**
   - `console.log()` für einfaches Debugging
   - Node Inspector für komplexere Fälle
   - Fehlermeldungen lesen und verstehen


```javascript
// greeting.js
console.log("Hallo, ich bin [Dein Name]!");
console.error("Dies ist eine Fehlermeldung");
console.warn("Dies ist eine Warnung");
```

## Nächste Schritte

Nachdem du die grundlegende Skript-Ausführung beherrschst, kannst du mit der [Verarbeitung von Argumenten](argumentHandling.md) fortfahren. 