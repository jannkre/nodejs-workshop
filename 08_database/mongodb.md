# MongoDB Integration in NodeJS

In diesem Abschnitt lernst du, wie man NodeJS-Anwendungen mit MongoDB verbindet und interagiert.

## Lernziele

- MongoDB-Verbindung herstellen
- CRUD-Operationen ausführen
- Aggregationen durchführen
- Indizes erstellen
- Fehlerbehandlung implementieren

## Grundlegende Verbindung

### Verbindung herstellen
```javascript
import { MongoClient } from 'mongodb';

// Verbindungs-URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Verbindung herstellen
async function connect() {
    try {
        await client.connect();
        console.log('Verbunden mit MongoDB');
        return client.db('meine_datenbank');
    } catch (err) {
        console.error('Verbindungsfehler:', err);
        throw err;
    }
}

// Verbindung schließen
async function close() {
    try {
        await client.close();
        console.log('Verbindung geschlossen');
    } catch (err) {
        console.error('Fehler beim Schließen:', err);
        throw err;
    }
}
```

## CRUD-Operationen

### Create (Insert)
```javascript
async function createBenutzer(benutzer) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').insertOne(benutzer);
        return result.insertedId;
    } catch (err) {
        console.error('Fehler beim Erstellen:', err);
        throw err;
    } finally {
        await close();
    }
}

// Mehrere Dokumente einfügen
async function createVieleBenutzer(benutzer) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').insertMany(benutzer);
        return result.insertedIds;
    } catch (err) {
        console.error('Fehler beim Erstellen:', err);
        throw err;
    } finally {
        await close();
    }
}
```

### Read (Find)
```javascript
async function getBenutzer(filter = {}) {
    const db = await connect();
    try {
        return await db.collection('benutzer').find(filter).toArray();
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    } finally {
        await close();
    }
}

// Mit Projektion
async function getBenutzerMitProjektion() {
    const db = await connect();
    try {
        return await db.collection('benutzer')
            .find({})
            .project({ name: 1, email: 1, _id: 0 })
            .toArray();
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    } finally {
        await close();
    }
}

// Mit Sortierung und Limit
async function getNeuesteBenutzer(limit = 10) {
    const db = await connect();
    try {
        return await db.collection('benutzer')
            .find({})
            .sort({ erstellt: -1 })
            .limit(limit)
            .toArray();
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    } finally {
        await close();
    }
}
```

### Update
```javascript
async function updateBenutzer(id, update) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').updateOne(
            { _id: id },
            { $set: update }
        );
        return result.modifiedCount > 0;
    } catch (err) {
        console.error('Fehler beim Aktualisieren:', err);
        throw err;
    } finally {
        await close();
    }
}

// Mehrere Dokumente aktualisieren
async function updateVieleBenutzer(filter, update) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').updateMany(
            filter,
            { $set: update }
        );
        return result.modifiedCount;
    } catch (err) {
        console.error('Fehler beim Aktualisieren:', err);
        throw err;
    } finally {
        await close();
    }
}
```

### Delete
```javascript
async function deleteBenutzer(id) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').deleteOne({ _id: id });
        return result.deletedCount > 0;
    } catch (err) {
        console.error('Fehler beim Löschen:', err);
        throw err;
    } finally {
        await close();
    }
}

// Mehrere Dokumente löschen
async function deleteVieleBenutzer(filter) {
    const db = await connect();
    try {
        const result = await db.collection('benutzer').deleteMany(filter);
        return result.deletedCount;
    } catch (err) {
        console.error('Fehler beim Löschen:', err);
        throw err;
    } finally {
        await close();
    }
}
```

## Aggregationen

### Einfache Aggregation
```javascript
async function getBenutzerStatistiken() {
    const db = await connect();
    try {
        return await db.collection('benutzer').aggregate([
            {
                $group: {
                    _id: '$rolle',
                    anzahl: { $sum: 1 },
                    durchschnittsalter: { $avg: '$alter' }
                }
            }
        ]).toArray();
    } catch (err) {
        console.error('Fehler bei der Aggregation:', err);
        throw err;
    } finally {
        await close();
    }
}
```

### Komplexe Aggregation
```javascript
async function getBenutzerAktivitaet() {
    const db = await connect();
    try {
        return await db.collection('benutzer').aggregate([
            {
                $lookup: {
                    from: 'aktivitaeten',
                    localField: '_id',
                    foreignField: 'benutzerId',
                    as: 'aktivitaeten'
                }
            },
            {
                $project: {
                    name: 1,
                    anzahlAktivitaeten: { $size: '$aktivitaeten' },
                    letzteAktivitaet: { $max: '$aktivitaeten.datum' }
                }
            },
            {
                $sort: { anzahlAktivitaeten: -1 }
            }
        ]).toArray();
    } catch (err) {
        console.error('Fehler bei der Aggregation:', err);
        throw err;
    } finally {
        await close();
    }
}
```

## Indizes

### Indizes erstellen
```javascript
async function createIndizes() {
    const db = await connect();
    try {
        // Einfacher Index
        await db.collection('benutzer').createIndex({ email: 1 }, { unique: true });
        
        // Zusammengesetzter Index
        await db.collection('benutzer').createIndex(
            { name: 1, erstellt: -1 }
        );
        
        // Text-Index
        await db.collection('benutzer').createIndex(
            { beschreibung: 'text' }
        );
        
        console.log('Indizes erstellt');
    } catch (err) {
        console.error('Fehler beim Erstellen der Indizes:', err);
        throw err;
    } finally {
        await close();
    }
}
```

## Best Practices

### Verbindungsmanagement
- Verbindungen wiederverwenden
- Verbindungen nach Gebrauch schließen
- Fehlerbehandlung implementieren
- Timeouts konfigurieren

### Performance
- Indizes für häufige Abfragen
- Projektionen für große Dokumente
- Aggregationen optimieren
- Batch-Operationen nutzen

### Sicherheit
- Verbindungsdaten sicher speichern
- Benutzerrechte einschränken
- Validierung implementieren
- Fehler nicht nach außen geben

## Beispiel: Benutzerverwaltung

```javascript
import { MongoClient, ObjectId } from 'mongodb';

class BenutzerManager {
    constructor() {
        this.uri = 'mongodb://localhost:27017';
        this.client = new MongoClient(this.uri);
        this.dbName = 'benutzer_db';
    }
    
    async connect() {
        await this.client.connect();
        return this.client.db(this.dbName);
    }
    
    async close() {
        await this.client.close();
    }
    
    async createBenutzer(benutzer) {
        const db = await this.connect();
        try {
            const result = await db.collection('benutzer').insertOne({
                ...benutzer,
                erstellt: new Date()
            });
            return result.insertedId;
        } catch (err) {
            console.error('Fehler beim Erstellen:', err);
            throw err;
        } finally {
            await this.close();
        }
    }
    
    async getBenutzer(id) {
        const db = await this.connect();
        try {
            return await db.collection('benutzer').findOne(
                { _id: new ObjectId(id) }
            );
        } catch (err) {
            console.error('Fehler beim Abrufen:', err);
            throw err;
        } finally {
            await this.close();
        }
    }
    
    async updateBenutzer(id, update) {
        const db = await this.connect();
        try {
            const result = await db.collection('benutzer').updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...update, aktualisiert: new Date() } }
            );
            return result.modifiedCount > 0;
        } catch (err) {
            console.error('Fehler beim Aktualisieren:', err);
            throw err;
        } finally {
            await this.close();
        }
    }
    
    async deleteBenutzer(id) {
        const db = await this.connect();
        try {
            const result = await db.collection('benutzer').deleteOne(
                { _id: new ObjectId(id) }
            );
            return result.deletedCount > 0;
        } catch (err) {
            console.error('Fehler beim Löschen:', err);
            throw err;
        } finally {
            await this.close();
        }
    }
    
    async getBenutzerStatistiken() {
        const db = await this.connect();
        try {
            return await db.collection('benutzer').aggregate([
                {
                    $group: {
                        _id: '$rolle',
                        anzahl: { $sum: 1 },
                        durchschnittsalter: { $avg: '$alter' }
                    }
                }
            ]).toArray();
        } catch (err) {
            console.error('Fehler bei der Aggregation:', err);
            throw err;
        } finally {
            await this.close();
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
        alter: 30,
        rolle: 'benutzer'
    });
    console.log('Benutzer erstellt mit ID:', benutzerId);
} catch (err) {
    console.error('Fehler:', err);
}
```