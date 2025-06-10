# JavaScript vs NodeJS

In diesem Abschnitt lernst du die grundlegenden Unterschiede zwischen JavaScript und NodeJS kennen.

## Lernziele

- Verstehen der historischen Entwicklung
- Unterscheidung zwischen Browser-JavaScript und NodeJS
- Gemeinsamkeiten und Unterschiede
- Einsatzgebiete beider Technologien

## Was ist JavaScript?

JavaScript ist eine Programmiersprache, die ursprünglich für Webbrowser entwickelt wurde. Sie ermöglicht:
- Interaktive Webseiten
- DOM-Manipulation
- Event-Handling im Browser
- AJAX-Anfragen

## Was ist NodeJS?

NodeJS ist eine Laufzeitumgebung für JavaScript außerhalb des Browsers. Sie bietet:
- Zugriff auf das Dateisystem
- Netzwerk-Funktionalitäten
- Prozess-Management
- Modul-System (CommonJS)

## Hauptunterschiede

### Ausführungsumgebung
- JavaScript: Läuft im Browser
- NodeJS: Läuft auf dem Server/Desktop

### Globale Objekte
- JavaScript: `window`, `document`
- NodeJS: `global`, `process`

### Module
- JavaScript: ES6 Modules
- NodeJS: CommonJS und ES6 Modules

## Vergleichstabelle

| Aspekt | JavaScript (Browser) | NodeJS |
|--------|---------------------|---------|
| Ausführungsumgebung | Browser | Server/Desktop |
| Globale Objekte | `window`, `document` | `global`, `process` |
| Dateisystem-Zugriff | Nein | Ja (`fs` Modul) |
| Netzwerk | HTTP/HTTPS, WebSocket | Alle Protokolle (TCP, UDP, HTTP, WebSocket, etc.) |
| Module | ES6 Modules | CommonJS + ES6 Modules |
| DOM-Zugriff | Ja | Nein |
| Package Manager | Keiner | npm/yarn |
| Debugging | Browser DevTools | Node Inspector |
| Performance | Browser-optimiert | Server-optimiert |
| Sicherheit | Sandboxed | System-Zugriff |
| Einsatzgebiet | Frontend | Backend/CLI |

## Gemeinsamkeiten

- Gleiche Sprachsyntax
- Gleiche Datentypen
- Gleiche Kontrollstrukturen
- Asynchrone Programmierung

## Nächste Schritte

Im nächsten Abschnitt lernst du, wie du [NodeJS als Skriptsprache](nodejsAsScript.md) nutzen kannst. 