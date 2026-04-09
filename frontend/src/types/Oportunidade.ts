import OportunidadeStatus from "./OportunidadeStatus";

interface Oportunidade {
    cliente: string;
    status: OportunidadeStatus;
    valor: number;
    data: string
};

export default Oportunidade;