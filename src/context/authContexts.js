import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiLocal from "../api/apilocal/apiLocal";

export const AutenticadoContexto = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    verificarToken();
    VerificaTokenAluno();
  }, []);

  async function verificarToken() {
    const iToken = localStorage.getItem("@token");
    if (!iToken) {
      setAutenticado(false);
      return;
    }

    const tokenU = JSON.parse(iToken);
    setToken(tokenU);

    const Iid = localStorage.getItem("@id");
    const ID = Iid ? JSON.parse(Iid) : null;

    try {
      const resposta = await apiLocal.get(`/verificaTokenPersonal/${ID}`, {
        headers: {
          Authorization: `Bearer ${tokenU}`, 
        },
      });

      if (resposta.data.id) {
        setAutenticado(true);
        localStorage.setItem("@id", JSON.stringify(resposta.data.id));
        localStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      }
    } catch (err) {
      setAutenticado(false);
    }
  }

  async function VerificaTokenAluno() {
    const iToken = localStorage.getItem("@tokenaluno");
    if (!iToken) {
      return; 
    }
  
    const tokenU = JSON.parse(iToken);
    setToken(tokenU);
  
    const Iid = localStorage.getItem("@idaluno");
    const ID = Iid ? JSON.parse(Iid) : null;
  
    if (!ID) {
      toast.error("Erro: ID do usuário não encontrado.");
      return;
    }
  
    try {
      const resposta = await apiLocal.get(`/verificaTokenAluno/${ID}`, {
        headers: {
          Authorization: `Bearer ${tokenU}`,
        },
      });
  
      if (resposta.data.id) {
        setAutenticado(true);
        localStorage.setItem("@idaluno", JSON.stringify(resposta.data.id));
        localStorage.setItem("@nomealuno", JSON.stringify(resposta.data.nome));
      }
    } catch (err) {
      setAutenticado(false);
      toast.error("Sessão inválida ou expirada. Faça login novamente.");
    }
  }
  
  async function loginEntrada(email, senha) {
    try {
      const resposta = await apiLocal.post("/loginPersonal", { email, senha });

      localStorage.setItem("@id", JSON.stringify(resposta.data.id));
      localStorage.setItem("@token", JSON.stringify(resposta.data.token));
      localStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      localStorage.setItem("@email", JSON.stringify(resposta.data.email));

      setToken(resposta.data.token);
      setAutenticado(true);
      toast.success("Login realizado com sucesso");
      window.location.href = "/DashBoardPersonal";
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Erro ao fazer login");
    }
  }

  async function loginEntradaAluno(email, senha) {
    try {
      const resposta = await apiLocal.post("/loginUsuarios", { email, senha });

      localStorage.setItem("@idaluno", JSON.stringify(resposta.data.id));
      localStorage.setItem("@tokenaluno", JSON.stringify(resposta.data.token));
      localStorage.setItem("@nomealuno", JSON.stringify(resposta.data.nome));
      localStorage.setItem("@emailaluno", JSON.stringify(resposta.data.email));

      setToken(resposta.data.token);
      setAutenticado(true);
      toast.success("Login realizado com sucesso");
      window.location.href = "/dashboard/aluno";
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Erro ao fazer login");
    }
  }

  function logout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@id");
    localStorage.removeItem("@nome");
    localStorage.removeItem("@email");
    localStorage.removeItem("@tokenaluno");
    localStorage.removeItem("@idaluno");
    localStorage.removeItem("@nomealuno");
    localStorage.removeItem("@emailaluno");

    setToken("");
    setAutenticado(false);
    window.location.href = "/";
    toast.success("Deslogado com sucesso");
  }

  return (
    <AutenticadoContexto.Provider value={{ autenticado, loginEntrada, loginEntradaAluno, verificarToken, VerificaTokenAluno, token, logout }}>
      {children}
    </AutenticadoContexto.Provider>
  );
}
