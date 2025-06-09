# EJS Templating

In diesem Modul lernst du, wie man mit der EJS (Embedded JavaScript) Templating Engine dynamische Webseiten in Express.js erstellt.

## Lernziele

- EJS-Templates erstellen und strukturieren
- Layouts und Partials verwenden
- Dynamische Daten einbinden
- Template-Helper nutzen
- Best Practices für Template-Organisation

## Setup und Konfiguration

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// EJS als View Engine setzen
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

## Template-Basics

### Syntax

```ejs
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p><%= message %></p>
    
    <% if (user) { %>
        <p>Willkommen, <%= user.name %>!</p>
    <% } else { %>
        <p>Bitte <a href="/login">anmelden</a></p>
    <% } %>
    
    <ul>
    <% items.forEach(function(item) { %>
        <li><%= item.name %></li>
    <% }); %>
    </ul>
</body>
</html>
```

### Rendering

```javascript
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Meine EJS App',
        message: 'Willkommen!',
        user: { name: 'Max' },
        items: [
            { name: 'Item 1' },
            { name: 'Item 2' }
        ]
    });
});
```

## Layouts und Partials

### Layout

```ejs
<!-- views/layouts/main.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <%- include('../partials/head') %>
</head>
<body>
    <%- include('../partials/header') %>
    
    <main>
        <%- body %>
    </main>
    
    <%- include('../partials/footer') %>
</body>
</html>
```

### Partials

```ejs
<!-- views/partials/head.ejs -->
<meta charset="UTF-8">
<link rel="stylesheet" href="/css/style.css">

<!-- views/partials/header.ejs -->
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>

<!-- views/partials/footer.ejs -->
<footer>
    <p>&copy; 2024 Meine App</p>
</footer>
```

## Daten und Logik

### Daten übergeben

```javascript
// Globale Daten
app.locals.appName = 'Meine App';

// Route-spezifische Daten
app.get('/profile', (req, res) => {
    res.render('profile', {
        user: {
            name: 'Max',
            email: 'max@example.com'
        }
    });
});
```

### Bedingte Anzeige

```ejs
<% if (user.isAdmin) { %>
    <div class="admin-panel">
        <h2>Admin-Bereich</h2>
        <!-- Admin-Funktionen -->
    </div>
<% } %>
```

### Schleifen

```ejs
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <% users.forEach(function(user) { %>
            <tr>
                <td><%= user.name %></td>
                <td><%= user.email %></td>
            </tr>
        <% }); %>
    </tbody>
</table>
```

## Template-Helper

### Eigene Helper

```javascript
// Helper registrieren
app.locals.formatDate = function(date) {
    return new Date(date).toLocaleDateString();
};

app.locals.uppercase = function(str) {
    return str.toUpperCase();
};
```

### Helper verwenden

```ejs
<p>Erstellt am: <%= formatDate(post.createdAt) %></p>
<h2><%= uppercase(post.title) %></h2>
```

## Best Practices

1. **Template-Organisation**
   - Klare Verzeichnisstruktur
   - Wiederverwendbare Komponenten
   - Konsistente Namensgebung

2. **Performance**
   - Caching aktivieren
   - Partials optimieren
   - Minimale Logik in Templates

3. **Sicherheit**
   - XSS-Schutz
   - Input-Validierung
   - Escaping von Daten

## Nächste Schritte

Nach Abschluss dieses Moduls kannst du mit dem [MVC Pattern](mvc.md) Modul fortfahren. 