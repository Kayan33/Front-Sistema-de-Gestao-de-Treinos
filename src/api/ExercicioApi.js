import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";


export const ExercicioApi = {
  cadastro : async(nome_exercicio,URL_video,categoriaID,personalID)=>{
    try {
      const resposta = await apiLocal.post(`CadastrarExercicios`,{
        nome_exercicio,
        URL_video,
        categoriaID,
        personalID
      })
      toast.success("Cadastro Realizado com sucesso")
      return resposta
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  },

  consultaPorPersonalECategoria: async (categoriaID,personalID) => {
    try {
      const resposta = await apiLocal.post(`/ConsultapersonalExerciciosCategoria/${categoriaID}/${personalID}`)

      return resposta
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.error|| err.response?.data?.message || "Erro desconhecido. Tente novamente."
      );
    }
  },
  delete : async(ID)=>{
    try {
      const resposta = await apiLocal.delete(`ApagarExercicios/${ID}`,)
      toast.success("Deletado com sucesso")
      return resposta
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
    }
  }
};
