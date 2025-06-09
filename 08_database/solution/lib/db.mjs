import mysql from 'mysql2/promise';

export const pool = await mysql.createPool({
    host: 'database-ws.c4ebb30pq7wf.eu-central-1.rds.amazonaws.com',
    user: 'admin',
    password: 'nodejs-workshop',
    database: 'ws-db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

