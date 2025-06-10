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

Die einfachste Form der MySQL-Verbindung in Node.js verwendet eine einzelne Verbindung. Hier sehen wir, wie man eine Verbindung herstellt und eine einfache Abfrage ausführt:

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

Connection Pooling ist eine effiziente Methode zur Verwaltung mehrerer Datenbankverbindungen. Der folgende Code zeigt, wie man einen Connection Pool erstellt und konfiguriert:

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

Das Einfügen neuer Datensätze in die Datenbank ist eine grundlegende Operation. Hier sehen wir, wie man einen neuen Benutzer in die Datenbank einfügt:

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

Das Abrufen von Daten aus der Datenbank kann auf verschiedene Arten erfolgen. Hier sind Beispiele für einfache und gefilterte Abfragen:

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

Das Aktualisieren bestehender Datensätze erfordert eine sorgfältige Fehlerbehandlung. Hier sehen wir, wie man Benutzerdaten sicher aktualisiert:

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

Das Löschen von Datensätzen sollte mit Vorsicht durchgeführt werden. Hier ist ein Beispiel für sicheres Löschen mit Fehlerbehandlung:

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

### Was sind Transaktionen?

Transaktionen sind eine Möglichkeit, mehrere Datenbankoperationen als eine einzige, unteilbare Einheit zu behandeln. Sie folgen dem ACID-Prinzip:

- **Atomicity (Atomarität)**: Entweder werden alle Operationen erfolgreich ausgeführt oder keine.
- **Consistency (Konsistenz)**: Die Datenbank bleibt nach der Transaktion in einem konsistenten Zustand.
- **Isolation (Isolation)**: Gleichzeitige Transaktionen beeinflussen sich nicht gegenseitig.
- **Durability (Dauerhaftigkeit)**: Nach erfolgreicher Transaktion sind die Änderungen permanent.

### Die beginTransaction Methode

Die `beginTransaction()` Methode startet eine neue Transaktion. Sie markiert den Beginn einer Reihe von Datenbankoperationen, die als Einheit behandelt werden sollen:

```javascript
// Beispiel einer Transaktion
async function beispielTransaktion() {
    const connection = await pool.getConnection();
    
    try {
        // Transaktion starten
        await connection.beginTransaction();
        
        // Erste Operation
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben - 100 WHERE id = 1'
        );
        
        // Zweite Operation
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben + 100 WHERE id = 2'
        );
        
        // Transaktion bestätigen
        await connection.commit();
        
    } catch (error) {
        // Bei Fehler: Transaktion rückgängig machen
        await connection.rollback();
        throw error;
    } finally {
        // Verbindung freigeben
        connection.release();
    }
}
```

### Wichtige Transaktionsmethoden

1. **beginTransaction()**
   - Startet eine neue Transaktion
   - Sperrt die betroffenen Tabellen
   - Erstellt einen Sicherungspunkt

2. **commit()**
   - Bestätigt alle Änderungen
   - Macht sie permanent
   - Gibt die Sperren frei

3. **rollback()**
   - Macht alle Änderungen rückgängig
   - Stellt den vorherigen Zustand wieder her
   - Gibt die Sperren frei

### Praktisches Beispiel: Kontotransfer

```javascript
async function sichererKontotransfer(vonKonto, nachKonto, betrag) {
    const connection = await pool.getConnection();
    
    try {
        // Transaktion starten
        await connection.beginTransaction();
        
        // Kontostand prüfen
        const [konten] = await connection.execute(
            'SELECT guthaben FROM konten WHERE id = ? FOR UPDATE',
            [vonKonto]
        );
        
        if (konten[0].guthaben < betrag) {
            throw new Error('Unzureichender Kontostand');
        }
        
        // Geld abziehen
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben - ? WHERE id = ?',
            [betrag, vonKonto]
        );
        
        // Geld hinzufügen
        await connection.execute(
            'UPDATE konten SET guthaben = guthaben + ? WHERE id = ?',
            [betrag, nachKonto]
        );
        
        // Transaktion bestätigen
        await connection.commit();
        return true;
        
    } catch (error) {
        // Bei Fehler: Transaktion rückgängig machen
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
```

### Best Practices für Transaktionen

1. **Transaktionsdauer**
   - Transaktionen so kurz wie möglich halten
   - Nur notwendige Operationen einschließen
   - Lange Wartezeiten vermeiden

2. **Fehlerbehandlung**
   - Immer try-catch verwenden
   - Rollback bei Fehlern durchführen
   - Verbindungen immer freigeben

3. **Sperren**
   - Nur notwendige Daten sperren
   - Sperren so kurz wie möglich halten
   - Deadlocks vermeiden

4. **Isolation Level**
   - Passendes Isolation Level wählen
   - READ COMMITTED für die meisten Fälle
   - SERIALIZABLE nur wenn nötig

## Best Practices

### Verbindungsmanagement

Effizientes Verbindungsmanagement ist entscheidend für die Performance und Stabilität der Anwendung:

- Connection Pooling verwenden
- Verbindungen nach Gebrauch freigeben
- Timeouts konfigurieren
- Fehlerbehandlung implementieren

### Performance

Die Performance der Datenbankanbindung kann durch verschiedene Maßnahmen optimiert werden:

- Prepared Statements nutzen
- Indizes verwenden
- Große Abfragen vermeiden
- Verbindungslimit anpassen

### Sicherheit

Sicherheit ist ein kritischer Aspekt bei der Datenbankanbindung. Hier sind die wichtigsten Sicherheitsaspekte:

- Prepared Statements für SQL-Injection-Schutz
- Verbindungsdaten sicher speichern
- Benutzerrechte einschränken
- Fehler nicht nach außen geben

## Beispiel: Benutzerverwaltung

Hier sehen wir ein vollständiges Beispiel einer Benutzerverwaltung, die alle CRUD-Operationen und Best Practices implementiert:

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