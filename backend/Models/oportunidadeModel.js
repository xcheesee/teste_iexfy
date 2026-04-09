import Status from "../Enums/oportunidadeStatus.js";
class Oportunidade {

    constructor({cliente, status, valor, data}) {
        this.cliente = cliente;
        this.status = status;
        this.valor = valor;
        this.data = data;
    }

    isValid() {
        if(
            !this.cliente                 || 
            this.cliente == ""            || 
            !Status.includes(this.status) ||
            !this.valor                   ||
            !this.data
        ) {
                return false;
        }

        return true;
    }
}

export default Oportunidade;