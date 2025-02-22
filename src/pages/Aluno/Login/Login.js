import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AutenticadoContexto } from "../../../context/authContexts";

export default function LoginAluno() {
  const [visivelS, setvisivelS] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { loginEntradaAluno, verificarToken } = useContext(AutenticadoContexto);
    verificarToken();

  async function dadosLogin(e) {
    e.preventDefault();
    await loginEntradaAluno(email, senha);
  }
  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2>Login para Aluno</h2>
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
            <div
              className="visivel-login"
              onClick={() => setvisivelS(!visivelS)}
            >
              👁
            </div>
          </div>
          <button type="submit" className="login-personal-btn">
            Entrar
          </button>
        </form>
        <p className="login-personal-register-link">
          Não tem uma conta?{" "}
          <Link to="/cadastro/aluno" className="login-personal-link">
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
