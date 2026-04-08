import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync("./database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS oportunidades (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente VARCHAR(255),
        status  INTEGER,
        valor   BIGINT,
        data    TEXT
    );
`);

export { db };