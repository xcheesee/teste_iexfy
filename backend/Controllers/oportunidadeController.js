import oportunidadeService from "../Services/oportunidadeService.js"

function getAll() {
    const resultArr = oportunidadeService.getAll()
    return JSON.stringify(resultArr);
}

function get(id) {
    const result = oportunidadeService.get(id);

    return JSON.stringify(result);
}

function insert(oportunidade) {
    oportunidadeService.insert(oportunidade);

    return;
}

const oportunidadeController = { 
    getAll, 
    get, 
    insert 
};

export default oportunidadeController