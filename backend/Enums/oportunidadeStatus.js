class Status {
    static Aberta = new Status("Aberta", 0)
    static Ganha = new Status("Ganha", 1)
    static Perdida = new Status("Perdida", 2)

    constructor(nome, chave) {
        this.nome  = nome;
        this.chave = chave;
    }

    static includes(nome) {
        if(nome === this.Aberta.nome || nome === this.Ganha.nome || nome === this.Perdida.nome ) {
            return true;
        }

        return false;
        
    }
}

export default Status;