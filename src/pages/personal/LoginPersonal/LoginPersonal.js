import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPersonal.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import { toast } from "react-toastify";

export default function LoginPersonal() {
  const { loginEntrada, verificarToken } = useContext(AutenticadoContexto);
  verificarToken();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [visivelS, setvisivelS] = useState(false);

  const navigate = useNavigate();

  async function dadosLogin(e) {
    e.preventDefault();

    try {
      const loginSucesso = await loginEntrada(email, senha);
      if (loginSucesso) {
        navigate("/DashBoardPersonal");
      }
    } catch (err) {
      toast.error("Erro ao fazer login. Tente novamente!");
    }
  }

  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2>Login para Personal</h2>
        <form className="login-personal-form" onSubmit={dadosLogin}>
          <div className="login-personal-input-group">
            <label htmlFor="email" className="login-cadastro-personal-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="login-cadastro-personal-input-select"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-personal-input-group">
            <label htmlFor="senha" className="login-cadastro-personal-label">
              Senha
            </label>
            <input
              type={visivelS ? "text" : "password"}
              id="senha"
              className="login-cadastro-personal-input-select"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <div className="visivel-login" onClick={() => setvisivelS(!visivelS)}>
              👁
            </div>
          </div>
          <button type="submit" className="login-personal-btn">
            Entrar
          </button>
        </form>
        <p className="login-personal-register-link">
          Não tem uma conta?{" "}
          <Link to="/cadastro/personal" className="login-personal-link">
            Cadastre-se
          </Link>
        </p>
        <p className="login-personal-register-link">
          <Link to="/resetar-senha" className="login-personal-link">
            Esqueci Senha
          </Link>
        </p>
      </div>
    </div>
  );
}
