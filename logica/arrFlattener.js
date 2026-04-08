import categorias from "./nestedArr.js";

function main() {
    const flattenedArr = [];

    recursiveFlattener(categorias, flattenedArr);

    console.log(flattenedArr);

}

function recursiveFlattener(arr, flattened) {
    for(let i = 0; i < arr.length; i++) {
        const pruned = {
            id: arr[i].id,
            nome: arr[i].nome
        };

        if(!arr[i].filhos || arr[i].filhos.length == 0) {
            flattened.push(pruned);
        } else {
            flattened.push(pruned)
            recursiveFlattener(arr[i].filhos, flattened);
        }
    }

}

main();