import { useState, useMemo } from "react";

/**

  @param {Array} lista 
  @param {Array} [campos=[]] 
  @returns {Object} 
 */
export const useBusca = (lista = [], campos = []) => {
  const [termoBusca, setTermoBusca] = useState("");

  const listaFiltrada = useMemo(() => {
    const termo = termoBusca.toLowerCase();

    return lista.filter((item) => {
      //  lista com objetos 
      if (typeof item === "object" && campos.length > 0) {
        return campos.some((campo) =>
          String(item[campo] || "").toLowerCase().includes(termo)
        );
      }

      // lista simples (ex: strings, números)
      return String(item).toLowerCase().includes(termo);
    });
  }, [lista, termoBusca, campos]);

  return {
    listaFiltrada,
    termoBusca,
    setTermoBusca,
  };
};
