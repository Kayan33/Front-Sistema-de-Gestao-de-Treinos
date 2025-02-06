import { createContext, useState } from "react";
import { toast } from "react-toastify";
import apiLocal from "../api/apilocal/apiLocal";

export const AutenticadoContexto = createContext();

export default function AuthProvider({ children }) {
  const [tokenT, setTokenT] = useState(false);
  const [token, setToken] = useState("");

  const autenticado = !!tokenT;

  async function verificarToken() {
    const iToken = localStorage.getItem("@token");
    if (!iToken) {
      setTokenT(false);
      return;
    }
    const tokenU = JSON.parse(iToken);
    setToken(tokenU);

    const Iid = localStorage.getItem("@id");
    const ID = Iid ? JSON.parse(Iid) : null;
    try {
      const resposta = await apiLocal.get(`/verificaToken/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resposta.data.id) {
        setTokenT(true);
        localStorage.setItem("@id", JSON.stringify(resposta.data.id));
        localStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      }
    } catch (err) {}
  }

  async function loginEntrada(email, senha) {
    try {
      const resposta = await apiLocal.post("/loginUsuarios", {
        email,
        senha,
      });

      localStorage.setItem("@id", JSON.stringify(resposta.data.id));
      localStorage.setItem("@token", JSON.stringify(resposta.data.token));
      localStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      localStorage.setItem("@email", JSON.stringify(resposta.data.email));
      setTokenT(true);
      toast.success('Login realizado com sucesso')
    } catch (err) {
      toast.error(err.response.data.error);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@id")
    localStorage.removeItem("@nome")
    localStorage.removeItem("@email")

    setTokenT(false)
    setToken("")
    toast.success('Deslogado com sucesso')
  }

  return (
    <AutenticadoContexto.Provider
      value={{ autenticado, loginEntrada, verificarToken, token,logout }}
    >
      {children}
    </AutenticadoContexto.Provider>
  );
}
