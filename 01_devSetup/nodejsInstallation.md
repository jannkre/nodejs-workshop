# NodeJS Installation

In diesem Abschnitt lernst du, wie du NodeJS auf deinem System installierst und konfigurierst.

## Lernziele

- Verstehen der verschiedenen NodeJS-Versionen
- Installation von NodeJS auf deinem Betriebssystem
- Überprüfung der Installation
- Grundlegende Konfiguration

## Installation

### Windows
1. Besuche die offizielle NodeJS-Website: https://nodejs.org
2. Lade die LTS (Long Term Support) Version herunter
3. Führe den Installer aus und folge den Anweisungen

### macOS
1. Über den Homebrew Package Manager:
```bash
brew install node
```
2. Oder über die offizielle Website wie bei Windows

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Überprüfung der Installation

Öffne ein Terminal und führe folgende Befehle aus:
```bash
node --version
npm --version
```

## Nächste Schritte

Nach der Installation von NodeJS kannst du mit der [VS Code Einrichtung](vscodeSetup.md) fortfahren. 