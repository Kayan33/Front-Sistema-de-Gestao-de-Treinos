import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const treinoAPI = {
  Cadastro: async (nome_treino, aluno, ID) => {
    try {
      const response = await apiLocal.post(
        `/treino/${aluno}/${ID}`,
        {
          nome_treino,
        },
        {
          // headers:{
          //   Authorization: `Bearer ${token}`,
          // }
        }
      );

      toast.success("Cadastro feito com sucesso!");
      return response;
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      toast.error(
        err.response?.data?.error ||
          "Erro ao cadastrar treino. Tente novamente."
      );

      throw err;
    }
  },

  consultaUnica: async (ID) => {
    try {
      const resposta = await apiLocal.get(
        `/consultartreinolUnico/${ID}`,
        {},
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      return resposta;
    } catch (err) {
      console.error("Erro ao consultar treino:", err);
      toast.error(
        err.response?.data?.error ||
          "Erro ao consultar treino. Tente novamente."
      );
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const resposta = await apiLocal.delete(`/ApagarTreino/${id}`);
      return resposta;
      toast.success(`Deletado com Sucesso`);
    } catch (err) {
      console.error("Erro ao consultar treino:", err);
      toast.error(
        err.response?.data?.error ||
          "Erro ao consultar treino. Tente novamente."
      );
      throw err;
    }
  },
};
