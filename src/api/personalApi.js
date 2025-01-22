import { toast } from "react-toastify";
import apiLocal from "./apiLocal";

export const Personalapi = {
  CadastrarPersonal: async ({ nome, telefone, email, CREF, sexo, senha, aluno }) => {
    try {
      const response = await apiLocal.post(`/CadastrarPersonal`, {
        nome: nome,
        telefone,
        email,
        CREF,
        sexo,
        senha,
        aluno,
      });

     
        toast.success("Cadastro feito com sucesso!");
      

      return response.data;
    } catch (error) {
      toast.error(`Erro ao cadastrar o personal`);
      console.log(error);
      
      throw error;
    }
  },
};
