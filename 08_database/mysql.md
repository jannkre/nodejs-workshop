# MySQL Integration in NodeJS

In diesem Abschnitt lernst du, wie man NodeJS-Anwendungen mit MySQL-Datenbanken verbindet und interagiert.

## Lernziele

- MySQL-Verbindung herstellen
- Connection Pooling implementieren
- CRUD-Operationen ausführen
- Transaktionen verwalten
- Fehlerbehandlung implementieren

## Grundlegende Verbindung

### Einfache Verbindung
```javascript
import mysql from 'mysql2/promise';

// Verbindungskonfiguration
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'meine_datenbank'
});

// Einfache Abfrage
try {
    const [rows] = await connection.execute('SELECT * FROM benutzer');
    console.log(rows);
} catch (err) {
    console.error('Fehler bei der Abfrage:', err);
} finally {
    await connection.end();
}
```

## Connection Pooling

### Pool erstellen
```javascript
import mysql from 'mysql2/promise';

// Pool-Konfiguration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'meine_datenbank',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Pool verwenden
async function getBenutzer(id) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM benutzer WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (err) {
        console.error('Fehler beim Abrufen des Benutzers:', err);
        throw err;
    }
}
```

## CRUD-Operationen

### Create (INSERT)
```javascript
async function createBenutzer(benutzer) {
    try {
        const [result] = await pool.execute(
            'INSERT INTO benutzer (name, email) VALUES (?, ?)',
            [benutzer.name, benutzer.email]
        );
        return result.insertId;
    } catch (err) {
        console.error('Fehler beim Erstellen des Benutzers:', err);
        throw err;
    }
}
```

### Read (SELECT)
```javascript
async function getAlleBenutzer() {
    try {
        const [rows] = await pool.execute('SELECT * FROM benutzer');
        return rows;
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzer:', err);
        throw err;
    }
}

async function getBenutzerMitFilter(filter) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM benutzer WHERE name LIKE ?',
            [`%${filter}%`]
        );
        return rows;
    } catch (err) {
        console.error('Fehler bei der Filterabfrage:', err);
        throw err;
    }
}
```

### Update
```javascript
async function updateBenutzer(id, benutzer) {
    try {
        const [result] = await pool.execute(
            'UPDATE benutzer SET name = ?, email = ? WHERE id = ?',
            [benutzer.name, benutzer.email, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Benutzers:', err);
        throw err;
    }
}
```

### Delete
```javascript
async function deleteBenutzer(id) {
    try {
        const [result] = await pool.execute(
            'DELETE FROM benutzer WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Fehler beim Löschen des Benutzers:', err);
        throw err;
    }
}
```

## Transaktionen

### Transaktion mit mehreren Operationen
```javascript
async function transferGuthaben(vonId, nachId, betrag) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // Guthaben abziehen
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben - ? WHERE id = ?',
            [betrag, vonId]
        );
        
        // Guthaben hinzufügen
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben + ? WHERE id = ?',
            [betrag, nachId]
        );
        
        await connection.commit();
        return true;
    } catch (err) {
        await connection.rollback();
        console.error('Fehler bei der Transaktion:', err);
        throw err;
    } finally {
        connection.release();
    }
}
```

## Best Practices

### Verbindungsmanagement
- Connection Pooling verwenden
- Verbindungen nach Gebrauch freigeben
- Timeouts konfigurieren
- Fehlerbehandlung implementieren

### Performance
- Prepared Statements nutzen
- Indizes verwenden
- Große Abfragen vermeiden
- Verbindungslimit anpassen

### Sicherheit
- Prepared Statements für SQL-Injection-Schutz
- Verbindungsdaten sicher speichern
- Benutzerrechte einschränken
- Fehler nicht nach außen geben

## Beispiel: Benutzerverwaltung

```javascript
import mysql from 'mysql2/promise';

// Pool erstellen
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'benutzer_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Benutzer-Klasse
class BenutzerManager {
    async createBenutzer(benutzer) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO benutzer (name, email, passwort) VALUES (?, ?, ?)',
                [benutzer.name, benutzer.email, benutzer.passwort]
            );
            return result.insertId;
        } catch (err) {
            console.error('Fehler beim Erstellen:', err);
            throw err;
        }
    }
    
    async getBenutzer(id) {
        try {
            const [rows] = await pool.execute(
                'SELECT id, name, email FROM benutzer WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (err) {
            console.error('Fehler beim Abrufen:', err);
            throw err;
        }
    }
    
    async updateBenutzer(id, benutzer) {
        try {
            const [result] = await pool.execute(
                'UPDATE benutzer SET name = ?, email = ? WHERE id = ?',
                [benutzer.name, benutzer.email, id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Fehler beim Aktualisieren:', err);
            throw err;
        }
    }
    
    async deleteBenutzer(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM benutzer WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Fehler beim Löschen:', err);
            throw err;
        }
    }
}

// Verwendung
const benutzerManager = new BenutzerManager();

// Beispiel: Benutzer erstellen
try {
    const benutzerId = await benutzerManager.createBenutzer({
        name: 'Max Mustermann',
        email: 'max@example.com',
        passwort: 'geheim'
    });
    console.log('Benutzer erstellt mit ID:', benutzerId);
} catch (err) {
    console.error('Fehler:', err);
}
```

## Nächste Schritte

Nachdem du die MySQL-Integration kennengelernt hast, kannst du mit dem [MongoDB Integration](mongodb.md) Modul fortfahren, um die Arbeit mit NoSQL-Datenbanken zu lernen. 