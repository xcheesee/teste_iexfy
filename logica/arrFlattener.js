import categorias from "./nestedArr.js";

function main() {

    const flattenedArr = recursiveFlattener(categorias);

    console.log(flattenedArr);

    return flattenedArr;
}

function recursiveFlattener(arr) {
    const flattened = [];

    for(let i = 0; i < arr.length; i++) {
        const pruned = {
            id: arr[i].id,
            nome: arr[i].nome
        };

        flattened.push(pruned)

        if(arr[i].filhos && arr[i].filhos.length > 0) {
            flattened.push(...recursiveFlattener(arr[i].filhos));
        }

    }

    return flattened;
}

main();