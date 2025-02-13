import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiLocal from "../api/apilocal/apiLocal";

export const AutenticadoContexto = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    verificarToken();
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
      const resposta = await apiLocal.get(`/verificaToken/${ID}`, {
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

  async function loginEntrada(email, senha) {
    try {
      const resposta = await apiLocal.post("/loginUsuarios", { email, senha });

      localStorage.setItem("@id", JSON.stringify(resposta.data.id));
      localStorage.setItem("@token", JSON.stringify(resposta.data.token));
      localStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      localStorage.setItem("@email", JSON.stringify(resposta.data.email));

      setToken(resposta.data.token);
      setAutenticado(true);
      toast.success("Login realizado com sucesso");
      window.location.href = "/DashBoardPersonal";
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao fazer login");
    }
  }

  function logout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@id");
    localStorage.removeItem("@nome");
    localStorage.removeItem("@email");

    setToken("");
    setAutenticado(false);
    window.location.href = "/";
    toast.success("Deslogado com sucesso");
  }

  return (
    <AutenticadoContexto.Provider value={{ autenticado, loginEntrada, verificarToken, token, logout }}>
      {children}
    </AutenticadoContexto.Provider>
  );
}
