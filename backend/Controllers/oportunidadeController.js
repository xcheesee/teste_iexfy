import Oportunidade from "../Models/oportunidadeModel.js";
import oportunidadeService from "../Services/oportunidadeService.js"
import ApiError from "../Utils/ApiError.js";
import Status from "../Enums/oportunidadeStatus.js";

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

function remove(id) {
    const exists = oportunidadeService.get(id);

    if(!exists) {
        throw new ApiError("Nenhum registro com o ID informado", 404, "ITEM_NOT_FOUND");
    }

    oportunidadeService.remove(id);

    return;
}

function update(id, oportunidade) {
    const row = oportunidadeService.get(id);

    if(!row) {
        throw new ApiError("Nenhum registro com o ID informado", 404, "ITEM_NOT_FOUND");
    }

    if(row.id != id) {
        throw new ApiError("Id informado incongruente com registro em banco", 400, "BAD_REQUEST");
    }

    if(!!oportunidade.status && !Status.includes(oportunidade.status)) {
        throw new ApiError("Status Invalido", 400, "BAD_REQUEST");
    }

    const updatedOportunidade = new Oportunidade({
        cliente: row.cliente,
        status:  oportunidade.status ?? row.status,
        valor:   oportunidade.valor  ?? row.valor, 
        data:  row.data
    });

    oportunidadeService.update(id, updatedOportunidade);

    return;
}

const oportunidadeController = { 
    getAll, 
    get, 
    insert,
    update,
    remove 
};

export default oportunidadeController