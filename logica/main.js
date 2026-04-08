import vendas from "./vendas.js";

const statusVenda = {
    aprovada: "aprovado",
    cancelada: "cancelado"
};

function main() {

    if(vendas.length == 0) {
        console.log("Nenhum vendedor contabilizado")
        return -1;
    }

    const { totalGeral, vendasAprovadas, rankingVendas } = parseVendasInfo(vendas);  

    const rankingArr = formatRankingVendas(rankingVendas);    

    displayInfoVendas(totalGeral, vendasAprovadas, rankingArr)

}

function parseVendasInfo(vendasArr) {
    let totalGeral      = 0;
    let vendasAprovadas = 0;
    let rankingVendas   = {};

    if(vendasArr.length == 0) {
        throw new Error("Nenhum vendedor contabilizado");
    }

    vendasArr.forEach((venda => {
        let vendedor = venda.vendedor;
        let valor    = venda.valor;
        let status   = venda.status;

        if(!validateVenda(venda))        
            return;

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

    return { totalGeral, vendasAprovadas, rankingVendas};
}

function validateVenda({ vendedor, valor }) {
    let valid = true;

    if(!vendedor || vendedor == "") 
        valid = false;        

    if(!valor || valor == 0)
        valid = false;

    return valid;
}

function formatRankingVendas(rankingObj) {
    let rankingArr = Object.entries(rankingObj).map(([key, val]) => {
        return {vendedor: key, total: val}
    });

    rankingArr = rankingArr.sort(({total: totalA}, {total: totalB}) => totalB - totalA);

    return rankingArr;
}

function displayInfoVendas(totalGeral, vendasAprovadas, rankingVendas) {
    let displayString = "";
    const topVendedor = rankingVendas[0];

    displayString += `Total Geral: ${totalGeral} \n`;

    if(vendasAprovadas == 0) {
        displayString += `Ticket Medio: ${totalGeral} \n`;
    } else {
        displayString += `Ticket Medio ${totalGeral / vendasAprovadas} \n`;
    }

    displayString += `Top Vendedor: ${topVendedor.vendedor} - ${topVendedor.total} \n`;

    console.log(displayString);
    console.log("--------------------------")
    console.log(rankingVendas);
}

main();