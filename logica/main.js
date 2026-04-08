import vendas from "./vendas.js";

const statusVenda = {
    aprovada: "aprovado",
    cancelada: "cancelado"
};

function main() {

    try {
        const { totalGeral, vendasAprovadas, rankingVendas } = parseVendasInfo(vendas);  

        const rankingArr = formatRankingVendas(rankingVendas);    

        displayInfoVendas(totalGeral, vendasAprovadas, rankingArr);

    } catch(e) {
        console.error(e.message);
        return -1;
    }

}

function parseVendasInfo(vendasArr) {
    let totalGeral      = 0;
    let vendasAprovadas = 0;
    let rankingVendas   = {};

    if(vendasArr.length == 0) {
        throw new Error("Nenhum vendedor contabilizado");
    }

    vendasArr.forEach((venda => {
        validateVenda(venda);

        let vendedor = venda.vendedor;
        let valor    = venda.valor;
        let status   = venda.status;

        if(status == statusVenda.aprovada) {
            totalGeral += valor;
            vendasAprovadas++;

            if(!rankingVendas[vendedor]) {
                rankingVendas[vendedor] = valor;
            } else {
                rankingVendas[vendedor] += valor;
            }
        }
    }));

    return { totalGeral, vendasAprovadas, rankingVendas };
}

function validateVenda({ vendedor, valor, status }) {
    if(!vendedor || vendedor == '') 
        throw new Error("Vendedor sem nome");

    if(!valor || valor == 0)
        throw new Error("Venda sem valor");

    if(!status || !Object.values(statusVenda).includes(status))
        throw new Error("Status invalido");

}

function formatRankingVendas(rankingObj) {
    let rankingArr = Object.entries(rankingObj).map(([key, val]) => {
        return {vendedor: key, total: val};
    });

    rankingArr = rankingArr.sort(({total: totalA}, {total: totalB}) => totalB - totalA);

    return rankingArr;
}

function displayInfoVendas(totalGeral, vendasAprovadas, rankingVendas) {

    if(vendasAprovadas == 0) 
        throw new Error("Nenhuma venda aprovada");

    let infoObj = {};
    let ticketMedio = totalGeral / vendasAprovadas;
    const topVendedor = rankingVendas[0];

    infoObj["totalGeral"]  = totalGeral;
    infoObj["ticketMedio"] = ticketMedio;
    infoObj["topVendedor"] = topVendedor.vendedor;
    infoObj["ranking"]     = rankingVendas;

    console.log(infoObj);
}

main();