import { db } from "../Data/dbContext.js";

const TABLE = 'oportunidades';

function get(id) {
    const query = db.prepare(`
        SELECT * FROM ${TABLE} 
        WHERE 
            id = ? AND
            deleted_at IS NULL;
    `);
    const result = query.get(id);

    return result;

}

function getAll() {
    const query = db.prepare(`SELECT * FROM ${TABLE} WHERE deleted_at IS NULL;`);
    const result = query.all();

    return result;
}

function remove(id) {
    const data = new Date().toISOString(); 
    const query = db.prepare(`
        UPDATE ${TABLE}
        SET deleted_at = ?
        WHERE id = ?;
    `);

    query.run(data, id);

    return true;
}

function update(id, oportunidade) {
    const query = db.prepare(`
        UPDATE ${TABLE}
        SET 
            valor = ?,
            status = ?
        WHERE 
            id = ? AND  
            deleted_at IS NULL;
    `);

    query.run(oportunidade.valor, oportunidade.status, id);

    return true;
}

function insert(oportunidade) {
    const query = db.prepare(`
        INSERT INTO ${TABLE} (cliente, status, valor, data)
        VALUES (?, ?, ?, ?);
    `);

    query.run(oportunidade.cliente, oportunidade.status, oportunidade.valor, oportunidade.data)

    return true;
}

const oportunidadeService = {
    get, 
    getAll, 
    remove, 
    update, 
    insert,
};

export default oportunidadeService;

