import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const Personalapi = {
  CadastrarPersonal: async ({
    nome,
    telefone,
    email,
    CREF,
    sexo,
    senha,
    aluno,
  }) => {
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

  alteracao: async (aluno, ID) => {
    try {
      await apiLocal.put(`/AlterarDadosPersonal/${ID}`, {
        aluno: aluno ? [aluno] : [], // Envia o aluno como um array, se definido
      });
      toast.success("Cadastro efetuado com sucesso");
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      toast.error(err.response.data.error);
      throw err;
    }
  },

  consultaUnica: async (ID,token) => {
    try {
     const resposta = await apiLocal.post(`/ConsultarPersonalUnico/${ID}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     );
     return resposta
      
    } catch (error) {
      console.error("Erro ao buscar personal:", error);
      toast.error("Erro ao buscar personal.");
      throw error;
    }
  },

  consultaPcomA: async(ID,aluno,token) =>{
    try {
      const resposta = await apiLocal.post(`/consultarPersonalComAlunoUnico/${ID}/${aluno}/`,{},
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      return resposta
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      toast.error(err.response.data.error);
      throw err;
    }
  }
};
