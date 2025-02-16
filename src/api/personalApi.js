import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const Personalapi = {
  CadastrarPersonal: async (
    { nome, telefone, email, CREF, sexo, senha, aluno },
  ) => {
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
      window.location.href = "/login/personal";
      return response?.data;
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.erro ||
          err.response?.data?.message ||
          "Erro ao cadastrar"
      );
    }
  },

  alteracao: async (aluno, ID) => {
    try {
      const response = await apiLocal.put(`/AlterarDadosPersonal/${ID}`, {
        aluno: aluno ? [aluno] : [],
      });

      toast.success(response.data.mensagem);
    } catch (err) {
      console.error("Erro ao cadastrar aluno", err);

      toast.error(
        err.response.data.erro ||
          err.response.data.mensagem ||
          "Erro ao cadastrar aluno"
      );
    }
  },

  consultaUnica: async (ID, token) => {
    try {
      const resposta = await apiLocal.post(
        `/ConsultarPersonalUnico/${ID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resposta;
    } catch (error) {
      console.error("Erro ao buscar personal:", error);
      toast.error("Erro ao buscar personal.");
      throw error;
    }
  },

  consultaPcomA: async (ID, aluno, token) => {
    try {
      const resposta = await apiLocal.post(
        `/consultarPersonalComAlunoUnico/${ID}/${aluno}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resposta;
    } catch (err) {
      console.error("Erro ao cadastrar aluno:", err);
      toast.error(err.response.data.error);
      throw err;
    }
  },
};
