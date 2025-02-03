import { toast } from "react-toastify";
import apiLocal from "./apilocal/apiLocal";

export const EmailAPI = {
  EnvioEmail: async (email) => {
    try {
      const resposta = await apiLocal.post(`/esqueci-senha`, { email });

      toast.success(
        "E-mail enviado! Entre no seu e-mail para redefinir a senha."
      );
      return resposta;
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao enviar e-mail.");
    }
  },

  TrocaSenha: async (senha, token) => {
    try {
      const resposta = await apiLocal.put(`/resetar-senha/${token}`, {
        senha,
      });
      toast.success("Troca de senha concluida");
      return resposta;
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Erro desconhecido. Tente novamente."
      );
      
    }
  },
};
