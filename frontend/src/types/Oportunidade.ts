import OportunidadeStatus from "./OportunidadeStatus";

interface Oportunidade {
    id: number;
    cliente: string;
    status: OportunidadeStatus;
    valor: string;
    data?: string
};

export default Oportunidade;