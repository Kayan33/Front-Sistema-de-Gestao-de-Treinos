import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

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

  alteracao: async(aluno,ID)=>{
    try {
      await apiLocal.put(`/AlterarDadosPersonal/${ID}`,{
        aluno: aluno? [aluno]:[]
      })
      toast.success('Cadastro efetuado com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      toast.error('Erro ao cadastrar aluno.');
      throw error;
    }
  }
};
