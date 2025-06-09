# Module System

In diesem Abschnitt lernst du die verschiedenen Möglichkeiten, Module in NodeJS zu importieren und zu exportieren.

## Lernziele

- Verstehen von CommonJS und ES Modules
- Unterschiede zwischen require und import
- Konfiguration von type: "module"
- Best Practices für Module

## ES Modules (import/export)

```javascript
// Exportieren
export const funktion1 = () => {};
export const funktion2 = () => {};

// Oder als Default
export default class MeineKlasse {}

// Importieren
import { funktion1, funktion2 } from './mein-modul.js';
import MeineKlasse from './mein-modul.js';
```

## Vergleich: CommonJS vs ES Modules

### CommonJS (Legacy)
```javascript
// Exportieren
module.exports = {
    funktion1: () => {},
    funktion2: () => {}
};

// Oder einzeln
exports.funktion1 = () => {};
exports.funktion2 = () => {};

// Importieren
const modul = require('./mein-modul');
```

## type: "module" in package.json

```json
{
  "name": "mein-projekt",
  "type": "module",
  "version": "1.0.0"
}
```

## Wichtige Unterschiede

### CommonJS
- Synchrones Laden
- Dynamische Imports
- Keine Dateiendung notwendig
- `__dirname` und `__filename` verfügbar

### ES Modules
- Asynchrones Laden
- Statische Imports
- `.js`-Endung erforderlich
- Kein `__dirname`/`__filename`

## Best Practices

- Konsistente Verwendung eines Modulsystems
- Klare Export-Struktur
- Vermeidung von zirkulären Abhängigkeiten
- Dokumentation der Module-Schnittstelle

## Nächste Schritte

Im nächsten Abschnitt lernst du, wie du [Eigene Module](customModules.md) erstellst und verwendest. 