import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const ConviteApi = {
    EnviarConvite: async (personalID,email) => {
    try {
      const response = await apiLocal.post(`/EnviaConvite/`, {
        personalID,
        email
      });

      toast.success(response.data.dados);
      
    } catch (err) {
      console.error("Erro ao enviar convite", err);

      toast.error(
        err.response.data.erro ||
          err.response.data.message ||
          "Erro ao enviar convite"
      );
    }
  },

  ListaConvitesPendentes: async (alunoID) => {
    try {
      const resposta = await apiLocal.get(`/ListaConvite/${alunoID}`)

      return resposta
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.error|| err.response?.data?.message || "Erro desconhecido. Tente novamente."
      );
    }
  },

  AceitaConvite: async (id) => {
    try {
      const response = await apiLocal.put(`/Convite/aceita/${id}`, {
        
      });

      toast.success(response.data.dados);
      
    } catch (err) {
      console.error("Erro ao cadastrar aluno", err);

      toast.error(
        err.response.data.erro ||
          err.response.data.message ||
          "Erro ao cadastrar aluno"
      );
    }
  },

  RejeitaConvite: async (id) => {
    try {
      const response = await apiLocal.put(`/Convite/rejeita/${id}`, {
        
      });

      toast.success(response.data.dados);
      
    } catch (err) {
      console.error("Erro ao enviar convite", err);

      toast.error(
        err.response.data.erro ||
          err.response.data.message ||
          "Erro ao enviar convite"
      );
    }
  },

 
};
