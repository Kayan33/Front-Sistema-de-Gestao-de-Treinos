import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const alunoApi = {
  

  consultaUnica: async (ID) => {
    try {
      const resposta = await apiLocal.post(
        `/ConsultarAlunoUnico/${ID}`,
        {},
        {
          
        }
      );
      return resposta;
    } catch (error) {
      console.error("Erro ao buscar personal:", error);
      toast.error("Erro ao buscar personal.");
      throw error;
    }
  },

 
};
