import OportunidadeStatus from "./OportunidadeStatus";

interface Oportunidade {
    id: number;
    cliente: string;
    status: OportunidadeStatus;
    valor: number;
    data?: string
};

export default Oportunidade;