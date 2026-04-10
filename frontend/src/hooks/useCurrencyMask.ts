import { useState, useCallback } from "react";

function useCurrencyMask(defaultValue = 0) {
  const [inteiro, setInteiro] = useState(defaultValue);

  const setFromString = useCallback((value: string) => {
    const formatado = value.replace(/\D/g, "");
    const number = parseInt(formatado || "0", 10);

    setInteiro(number);
  }, []);

  const moeda = (inteiro / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const inputProps = {
    value: moeda,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFromString(e?.target?.value),
    placeholder: "0,00",
  };

  return {
    inteiro,
    setInteiro,
    moeda,
    inputProps
  };
}

export { useCurrencyMask };