# MongoDB Integration in NodeJS mit Mongoose

In diesem Abschnitt lernst du, wie man NodeJS-Anwendungen mit MongoDB unter Verwendung von Mongoose verbindet und interagiert.

## SQL vs. NoSQL: Ein Vergleich

### Vergleichstabelle

| Aspekt | SQL (MySQL) | NoSQL (MongoDB) |
|--------|-------------|-----------------|
| Datenmodell | Tabellarisch, festes Schema | Dokumentenorientiert, flexibles Schema |
| Skalierung | Vertikal (mehr Leistung pro Server) | Horizontal (mehr Server) |
| Transaktionen | ACID-konform, vollständige Transaktionsunterstützung | Eventual Consistency, begrenzte Transaktionsunterstützung |
| Abfragen | SQL, komplexe Joins | Dokumentenabfragen, Aggregation Pipeline |
| Schema | Vorab definiert, Änderungen erfordern Migration | Flexibel, Schema-Validierung optional |
| Indizierung | Primär- und Sekundärindizes | Mehrere Indextypen (einfach, zusammengesetzt, text) |
| Datenintegrität | Referenzielle Integrität durch Fremdschlüssel | Keine eingebaute referenzielle Integrität |
| Einsatzgebiete | Komplexe Beziehungen, Transaktionen | Große Datenmengen, schnelle Skalierung |
| Performance | Optimiert für komplexe Abfragen | Optimiert für Lese- und Schreiboperationen |

### Wann welche Datenbank?

**MySQL ist ideal für:**
- Anwendungen mit komplexen Beziehungen
- Systeme, die ACID-Transaktionen benötigen
- Projekte mit festem Datenmodell
- Finanzielle Anwendungen
- Reporting-Systeme

**MongoDB ist ideal für:**
- Skalierbare Webanwendungen
- Echtzeit-Analysen
- Content Management Systeme
- Mobile Anwendungen
- IoT-Daten

## Lernziele

- Mongoose-Verbindung herstellen
- Schemas und Modelle definieren
- CRUD-Operationen ausführen
- Middleware verwenden
- Validierung implementieren
- Indizes erstellen
- Fehlerbehandlung implementieren

## Grundlegende Verbindung

### Verbindung herstellen

Die Verbindung zu MongoDB wird über Mongoose hergestellt. Im Gegensatz zum nativen MongoDB-Treiber bietet Mongoose zusätzliche Konfigurationsmöglichkeiten und eine bessere Fehlerbehandlung:

```javascript
import mongoose from 'mongoose';

// Verbindungs-URI
const uri = 'mongodb://localhost:27017/meine_datenbank';

// Verbindungsoptionen
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Verbindung herstellen
async function connect() {
    try {
        await mongoose.connect(uri, options);
        console.log('Verbunden mit MongoDB über Mongoose');
    } catch (err) {
        console.error('Verbindungsfehler:', err);
        throw err;
    }
}

// Verbindung schließen
async function close() {
    try {
        await mongoose.connection.close();
        console.log('Verbindung geschlossen');
    } catch (err) {
        console.error('Fehler beim Schließen:', err);
        throw err;
    }
}
```

## Schemas und Modelle

### Benutzer-Schema definieren

Ein Mongoose-Schema definiert die Struktur und Validierungsregeln für Dokumente. Hier sehen wir ein umfassendes Beispiel mit verschiedenen Feldtypen, Validierungen und Middleware:

```javascript
import mongoose from 'mongoose';

// Schema definieren
const benutzerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name ist erforderlich'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email ist erforderlich'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} ist keine gültige Email-Adresse!`
        }
    },
    alter: {
        type: Number,
        min: [0, 'Alter kann nicht negativ sein'],
        max: [120, 'Alter scheint ungültig']
    },
    rolle: {
        type: String,
        enum: ['benutzer', 'admin', 'moderator'],
        default: 'benutzer'
    },
    erstellt: {
        type: Date,
        default: Date.now
    },
    aktiv: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Fügt createdAt und updatedAt hinzu
});

// Indizes
benutzerSchema.index({ email: 1 }, { unique: true });
benutzerSchema.index({ name: 1, erstellt: -1 });

// Virtuelle Eigenschaften
benutzerSchema.virtual('vollständigerName').get(function() {
    return `${this.name} (${this.email})`;
});

// Middleware
benutzerSchema.pre('save', function(next) {
    console.log('Speichere Benutzer...');
    next();
});

benutzerSchema.post('save', function(doc) {
    console.log('Benutzer gespeichert:', doc.name);
});

// Statische Methoden
benutzerSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Instanzmethoden
benutzerSchema.methods.isAdmin = function() {
    return this.rolle === 'admin';
};

// Modell erstellen
const Benutzer = mongoose.model('Benutzer', benutzerSchema);
```

## CRUD-Operationen

### Create (Insert)

Das Erstellen neuer Dokumente erfolgt über Mongoose-Modelle. Die Schema-Validierung wird automatisch durchgeführt, bevor das Dokument in der Datenbank gespeichert wird:

```javascript
async function createBenutzer(benutzerDaten) {
    try {
        const benutzer = new Benutzer(benutzerDaten);
        await benutzer.save();
        return benutzer;
    } catch (err) {
        console.error('Fehler beim Erstellen:', err);
        throw err;
    }
}

// Mehrere Dokumente einfügen
async function createVieleBenutzer(benutzerArray) {
    try {
        return await Benutzer.insertMany(benutzerArray);
    } catch (err) {
        console.error('Fehler beim Erstellen:', err);
        throw err;
    }
}
```

### Read (Find)

Mongoose bietet verschiedene Methoden zum Abrufen von Dokumenten. Die Beispiele zeigen unterschiedliche Abfrageoptionen wie Projektion, Sortierung und Verknüpfungen:

```javascript
async function getBenutzer(filter = {}) {
    try {
        return await Benutzer.find(filter);
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    }
}

// Mit Projektion und Sortierung
async function getNeuesteBenutzer(limit = 10) {
    try {
        return await Benutzer.find()
            .select('name email erstellt') // Projektion
            .sort({ erstellt: -1 })
            .limit(limit);
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    }
}

// Mit Populate
async function getBenutzerMitAktivitaeten() {
    try {
        return await Benutzer.find()
            .populate('aktivitaeten')
            .exec();
    } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        throw err;
    }
}
```

### Update

Aktualisierungen können mit verschiedenen Mongoose-Methoden durchgeführt werden. Die Option `runValidators: true` stellt sicher, dass die Schema-Validierung auch bei Updates durchgeführt wird:

```javascript
async function updateBenutzer(id, update) {
    try {
        const benutzer = await Benutzer.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true }
        );
        return benutzer;
    } catch (err) {
        console.error('Fehler beim Aktualisieren:', err);
        throw err;
    }
}

// Mehrere Dokumente aktualisieren
async function updateVieleBenutzer(filter, update) {
    try {
        const result = await Benutzer.updateMany(
            filter,
            { $set: update },
            { runValidators: true }
        );
        return result.modifiedCount;
    } catch (err) {
        console.error('Fehler beim Aktualisieren:', err);
        throw err;
    }
}
```

### Delete

Das Löschen von Dokumenten kann einzeln oder in größeren Mengen erfolgen. Mongoose bietet spezielle Methoden wie `findByIdAndDelete` für häufige Anwendungsfälle:

```javascript
async function deleteBenutzer(id) {
    try {
        const result = await Benutzer.findByIdAndDelete(id);
        return result !== null;
    } catch (err) {
        console.error('Fehler beim Löschen:', err);
        throw err;
    }
}

// Mehrere Dokumente löschen
async function deleteVieleBenutzer(filter) {
    try {
        const result = await Benutzer.deleteMany(filter);
        return result.deletedCount;
    } catch (err) {
        console.error('Fehler beim Löschen:', err);
        throw err;
    }
}
```

## Aggregationen

### Einfache Aggregation

Mongoose unterstützt die MongoDB-Aggregationspipeline. Hier sehen wir ein Beispiel für die Berechnung von Statistiken über Benutzer:

```javascript
async function getBenutzerStatistiken() {
    try {
        return await Benutzer.aggregate([
            {
                $group: {
                    _id: '$rolle',
                    anzahl: { $sum: 1 },
                    durchschnittsalter: { $avg: '$alter' }
                }
            }
        ]);
    } catch (err) {
        console.error('Fehler bei der Aggregation:', err);
        throw err;
    }
}
```

## Best Practices

### Verbindungsmanagement

Effizientes Verbindungsmanagement ist entscheidend für die Performance und Stabilität der Anwendung:

- Mongoose-Verbindung wiederverwenden
- Verbindung nach Gebrauch schließen
- Fehlerbehandlung implementieren
- Timeouts konfigurieren

### Performance

Die Performance kann durch verschiedene Mongoose-spezifische Optimierungen verbessert werden:

- Indizes für häufige Abfragen
- Lean-Queries für große Datensätze
- Populate mit Bedacht verwenden
- Batch-Operationen nutzen

### Sicherheit

Sicherheit ist ein kritischer Aspekt bei der Datenbankanbindung. Mongoose bietet eingebaute Sicherheitsfeatures:

- Verbindungsdaten sicher speichern
- Benutzerrechte einschränken
- Schema-Validierung nutzen
- Fehler nicht nach außen geben

## Beispiel: Benutzerverwaltung

Hier sehen wir eine vollständige Implementierung einer Benutzerverwaltung mit Mongoose. Die Klasse demonstriert die praktische Anwendung aller zuvor besprochenen Konzepte:

```javascript
import mongoose from 'mongoose';

class BenutzerManager {
    constructor() {
        this.uri = 'mongodb://localhost:27017/benutzer_db';
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }
    
    async connect() {
        try {
            await mongoose.connect(this.uri, this.options);
            console.log('Verbunden mit MongoDB');
        } catch (err) {
            console.error('Verbindungsfehler:', err);
            throw err;
        }
    }
    
    async close() {
        try {
            await mongoose.connection.close();
            console.log('Verbindung geschlossen');
        } catch (err) {
            console.error('Fehler beim Schließen:', err);
            throw err;
        }
    }
    
    async createBenutzer(benutzerDaten) {
        try {
            const benutzer = new Benutzer(benutzerDaten);
            await benutzer.save();
            return benutzer;
        } catch (err) {
            console.error('Fehler beim Erstellen:', err);
            throw err;
        }
    }
    
    async getBenutzer(id) {
        try {
            return await Benutzer.findById(id);
        } catch (err) {
            console.error('Fehler beim Abrufen:', err);
            throw err;
        }
    }
    
    async updateBenutzer(id, update) {
        try {
            return await Benutzer.findByIdAndUpdate(
                id,
                { $set: update },
                { new: true, runValidators: true }
            );
        } catch (err) {
            console.error('Fehler beim Aktualisieren:', err);
            throw err;
        }
    }
    
    async deleteBenutzer(id) {
        try {
            return await Benutzer.findByIdAndDelete(id);
        } catch (err) {
            console.error('Fehler beim Löschen:', err);
            throw err;
        }
    }
    
    async getBenutzerStatistiken() {
        try {
            return await Benutzer.aggregate([
                {
                    $group: {
                        _id: '$rolle',
                        anzahl: { $sum: 1 },
                        durchschnittsalter: { $avg: '$alter' }
                    }
                }
            ]);
        } catch (err) {
            console.error('Fehler bei der Aggregation:', err);
            throw err;
        }
    }
}

// Verwendung
const benutzerManager = new BenutzerManager();

// Beispiel: Benutzer erstellen
try {
    await benutzerManager.connect();
    
    const benutzer = await benutzerManager.createBenutzer({
        name: 'Max Mustermann',
        email: 'max@example.com',
        alter: 30,
        rolle: 'benutzer'
    });
    
    console.log('Benutzer erstellt:', benutzer);
} catch (err) {
    console.error('Fehler:', err);
} finally {
    await benutzerManager.close();
}
```