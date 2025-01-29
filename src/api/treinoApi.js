import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";
import { data } from "react-router-dom";

export const treinoAPI = {
    Cadastro: async ( nome_treino,aluno,ID, ) => {
        try {
          const response = await apiLocal.post(`/treino/${aluno}/${ID}`, {
            nome_treino,
          },
          // {
          //   headers:{
          //     Authorization: `Bearer ${token}`,
          //   }
          // }
          );
      
          toast.success("Cadastro feito com sucesso!");
          return response;
        } catch (err) {
          console.error("Erro ao cadastrar aluno:", err);
          toast.error(err.response?.data?.error || "Erro ao cadastrar treino. Tente novamente.");
          toast.error(data.dados)
          throw err;
        }
      },
      

  
};
