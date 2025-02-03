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
      toast.success("Exercício cadastrado com sucesso!")
      return resposta;
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  },
};
