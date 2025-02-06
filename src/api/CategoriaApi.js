import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";
import { data } from "react-router-dom";

export const CategoriaApi = {
  consulta: async () => {
    try {
      const resposta = await apiLocal.get(`/ConsultarTodosCategoria`, {}, {});
      return resposta;
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  },

  consultaUnica: async (categoriaID) => {
    try {
      const resposta = await apiLocal.post(`ConsultarCategoriaUnico/${categoriaID}`)

      return resposta
    } catch (err) {
      console.log(err);
      
      toast.error(
         "Erro desconhecido. Tente novamente."
      );
    }
  },
};
