import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const ExercicioDetalhadoApi = {
  cadastrar: async (repeticoes, descanso, exercicioID, treinosID) => {
    try {
      const resposta = await apiLocal.post(`/rotinaExercicio/${treinosID}`, {
        repeticoes:Number(repeticoes),
        descanso:Number(descanso),
        exercicioID,
      });
      toast.success("Exercício cadastrado com sucesso!");
      return resposta;
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  },

  trocar: async (ID, repeticoes, descanso) => {
    try {
      const resposta = await apiLocal.put(`AlterarotinaExercicio/${ID}`, {
        repeticoes: Number(repeticoes),
        descanso: Number(descanso),
      });
      toast.success("Atulizado com sucesso!");
      return resposta;
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  },

  Deletar : async(id)=> {
    try {
      const resposta = await apiLocal.delete(`DeletarExercicioDelatalhado/${id}`)
     toast.success(`Treino Excluido com sucesso`)
      return resposta
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  }
};
