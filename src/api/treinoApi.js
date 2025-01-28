import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const treinoAPI = {
    Cadastro: async ( nome_treino,aluno,ID ) => {
        try {
          const response = await apiLocal.post(`/treino/${aluno}/${ID}`, {
            nome_treino,
          });
      
          toast.success("Cadastro feito com sucesso!");
          return response;
        } catch (err) {
          console.error("Erro ao cadastrar aluno:", err);
          toast.error(err.response?.data?.error || "Erro ao cadastrar treino. Tente novamente.");
          throw err;
        }
      },
      

  
};
