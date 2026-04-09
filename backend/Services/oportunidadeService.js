import { db } from "../Data/dbContext.js";

const TABLE = 'oportunidades';

function get(id) {
    const query = db.prepare(`SELECT * FROM ${TABLE} WHERE id = ?;`);
    const result = query.get(id);

    return result;

}

function getAll() {
    const query = db.prepare(`SELECT * FROM ${TABLE};`);
    const result = query.all();

    return result;
}

//function remove(id) {
//
//}
//
//function update(oportunidade) {
//
//}

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
    //remove, 
    //update, 
    insert,
};

export default oportunidadeService;

