import React, { useState } from "react";
import "./CadastroPersonal.css";
import { Link, useNavigate } from "react-router-dom";
import { Personalapi } from "../../../api/personalApi";
import { toast } from "react-toastify";
import {
  formatarTelefone,
  validarCREF,
  validarSenhaForte,
  validarTelefone,
} from "../../../services/utils/validacoes";

export default function CadastroPersonal() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [CREF, setCREF] = useState("");
  const [sexo, setSexo] = useState("");
  const [senha, setSenha] = useState("");
  const [aluno, setAluno] = useState([]);
  const [visivelS, setvisivelS] = useState(false);

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validarCREF(CREF)) {
      toast.error("Formato de CREF inválido! O formato correto é 12345-6/SP");
      return;
    }

    if (!validarTelefone(telefone)) {
      toast.error(
        "Formato de telefone inválido! O formato correto é (14) 99482-1456"
      );
      return;
    }

    if (!validarSenhaForte(senha)) {
      toast.error(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."
      );
      return;
    }

    try {
      await Personalapi.CadastrarPersonal({
        nome,
        telefone,
        email,
        CREF,
        sexo,
        senha,
        aluno,
      });

      
       
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2>Cadastro Personal</h2>
        <form onSubmit={handleCadastro} className="cadastro-personal-form">
          <div>
            <label className="login-cadastro-personal-label">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="login-cadastro-personal-input-select cadastro-input"
              required
            />
          </div>
          <div>
            <label className="login-cadastro-personal-label">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              className="login-cadastro-personal-input-select cadastro-input"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>
          <div>
            <label className="login-cadastro-personal-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-cadastro-personal-input-select cadastro-input"
              placeholder="exemplo@dominio.com"
              required
            />
          </div>
          <div>
            <label className="login-cadastro-personal-label">CREF</label>
            <input
              type="text"
              value={CREF}
              onChange={(e) => setCREF(e.target.value)}
              className="login-cadastro-personal-input-select cadastro-input"
              placeholder="XXXXX-X/SP"
              required
            />
          </div>
          <div>
            <label className="login-cadastro-personal-label">Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="login-cadastro-personal-input-select cadastro-input"
              required
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div className="senha-container">
            <label className="login-cadastro-personal-label">Senha</label>
            <input
              type={visivelS ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-cadastro-personal-input-select cadastro-input"
              required
            />
            <div className="visivel" onClick={() => setvisivelS(!visivelS)}>
              👁
            </div>
          </div>
          <button type="submit" className="cadastro-personal-btn">
            Cadastrar
          </button>
        </form>
        <p className="login-personal-register-link">
          Já tem uma conta?{" "}
          <Link to="/login/personal" className="login-personal-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
