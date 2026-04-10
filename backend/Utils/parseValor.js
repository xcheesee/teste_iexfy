function parseValor(valor) {
    const str = valor.toString();

    const inteiro = str.slice(0, -2);
    const decimal = str.slice(-2);

    const formatado = inteiro + "," + decimal;

    return formatado;
}

export default parseValor;