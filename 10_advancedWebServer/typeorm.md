# TypeORM Integration

In diesem Modul lernst du, wie man TypeORM als Object-Relational Mapping (ORM) in Express.js-Anwendungen integriert.

## Lernziele

- TypeORM-Setup und Konfiguration
- Entity-Definitionen erstellen
- Repository-Pattern implementieren
- Service-Layer entwickeln
- Beziehungen zwischen Entities definieren

## TypeORM-Grundlagen

### Installation und Setup

```javascript
// package.json
{
  "dependencies": {
    "typeorm": "^0.3.0",
    "mysql2": "^3.0.0",
    "reflect-metadata": "^0.1.13"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### Datenbankverbindung

```javascript
// config/database.js
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'myapp',
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.js'],
    migrations: ['src/migrations/**/*.js'],
    subscribers: ['src/subscribers/**/*.js']
});
```

## Entity-Definitionen

### User Entity

```javascript
// entities/User.js
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post.js';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column({ unique: true })
    email;

    @Column()
    password;

    @OneToMany(() => Post, post => post.author)
    posts;
}
```

### Post Entity

```javascript
// entities/Post.js
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    title;

    @Column('text')
    content;

    @ManyToOne(() => User, user => user.posts)
    author;
}
```

## Repository-Pattern

### User Repository

```javascript
// repositories/UserRepository.js
import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';

export class UserRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findAll() {
        return this.repository.find();
    }

    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }

    async create(userData) {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    async update(id, userData) {
        await this.repository.update(id, userData);
        return this.findById(id);
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}
```

## Service-Layer

### User Service

```javascript
// services/UserService.js
import { UserRepository } from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async createUser(userData) {
        // Passwort hashen
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // Benutzer erstellen
        return this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
    }

    async updateUser(id, userData) {
        // Prüfen ob Benutzer existiert
        await this.getUserById(id);

        // Passwort hashen wenn vorhanden
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        return this.userRepository.update(id, userData);
    }

    async deleteUser(id) {
        // Prüfen ob Benutzer existiert
        await this.getUserById(id);
        return this.userRepository.delete(id);
    }
}
```

## Controller-Integration

### User Controller mit TypeORM

```javascript
// controllers/UserController.js
import { UserService } from '../services/UserService.js';

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async index(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.render('users/index', { users });
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    async show(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.render('users/show', { user });
        } catch (error) {
            res.status(404).render('error', { error });
        }
    }

    async create(req, res) {
        try {
            const user = await this.userService.createUser(req.body);
            res.redirect(`/users/${user.id}`);
        } catch (error) {
            res.status(400).render('users/new', { 
                error,
                user: req.body 
            });
        }
    }

    async update(req, res) {
        try {
            const user = await this.userService.updateUser(
                req.params.id,
                req.body
            );
            res.redirect(`/users/${user.id}`);
        } catch (error) {
            res.status(400).render('users/edit', { 
                error,
                user: req.body 
            });
        }
    }

    async delete(req, res) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.redirect('/users');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }
}
```

## Best Practices

1. **Entity-Design**
   - Klare Beziehungen
   - Validierung
   - Indizes
   - Cascade-Operationen

2. **Repository-Pattern**
   - Wiederverwendbare Queries
   - Transaktionen
   - Error-Handling
   - Performance-Optimierung

3. **Service-Layer**
   - Business-Logik
   - Validierung
   - Error-Handling
   - Transaktionen

4. **Performance**
   - Eager/Lazy Loading
   - Query-Optimierung
   - Caching
   - Connection Pooling

## Nächste Schritte

Nach Abschluss dieses Moduls kannst du mit dem [Security](security.md) Modul fortfahren. 