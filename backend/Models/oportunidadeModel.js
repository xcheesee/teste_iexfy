import Status from "../Enums/oportunidadeStatus.js";
class Oportunidade {

    constructor({cliente, status, valor, data}) {
        this.cliente = cliente;
        this.status = status;
        this.valor = String(valor).replace(/[,\.]/g, "");
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

        //Apos o strip de separacoes numericas, deve ser verificado se eh um numero valido
        const isNumeric = /^\d+$/;
        if(!isNumeric.test(this.valor)) {
            return false
        } 

        return true;
    }
}

export default Oportunidade;