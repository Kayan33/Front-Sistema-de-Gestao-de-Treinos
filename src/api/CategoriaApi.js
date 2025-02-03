import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const CategoriaApi = {
  consulta: async () =>{
    try {
        const resposta=await apiLocal.get(`/ConsultarTodosCategoria`,{},{

        }) 
        return resposta
    } catch (err) {
        toast.error(
            err.response?.data?.error || "Erro desconhecido. Tente novamente."
          );
    }
  }
};
