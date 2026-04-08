import vendas from "./vendas.js";

const statusVenda = {
    aprovada: "aprovado",
    cancelada: "cancelado"
};

function main() {
    let totalGeral      = 0;
    let vendasAprovadas = 0;
    let rankingVendas   = {};
    let rankingArr;
    let displayString   = "";

    if(vendas.length == 0) {
        console.log("Nenhum vendedor contabilizado")
        return -1;
    }

    vendas.forEach((venda => {
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

    rankingArr = formatRankingVendas(rankingVendas);    

    const topVendedor = rankingArr[0];

    displayString += `Total Geral: ${totalGeral} \n`;

    if(vendasAprovadas == 0) {
        displayString += `Ticket Medio: ${totalGeral} \n`;
    } else {
        displayString += `Ticket Medio ${totalGeral / vendasAprovadas} \n`;
    }

    displayString += `Top Vendedor: ${topVendedor.vendedor} - ${topVendedor.total} \n`;

    console.log(displayString);
    console.log("--------------------------")
    console.log(rankingArr);
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

main();