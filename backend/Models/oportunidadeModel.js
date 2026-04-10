import Status from "../Enums/oportunidadeStatus.js";
class Oportunidade {

    constructor({cliente, status, valor, data}) {
        this.cliente = cliente;
        this.status = status;
        this.valor = String(valor).replace(/\D+/g, "");
        this.data = new Date().toISOString();
    }

    isValid() {
        if(
            !this.cliente                 || 
            this.cliente == ""            || 
            !Status.includes(this.status) ||
            !this.valor                   ||
            this.valor == ""
        ) {
                return false;
        }

        if(this.valor)

        return true;
    }
}

export default Oportunidade;