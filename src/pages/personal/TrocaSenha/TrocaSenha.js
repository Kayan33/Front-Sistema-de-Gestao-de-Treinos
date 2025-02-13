import React, {  useState } from 'react';
import { Link, useNavigate, useParams, } from 'react-router-dom';
import { EmailAPI } from '../../../api/EmailApi';
import { validarSenhaForte } from '../../../services/utils/validacoes';
import { toast } from 'react-toastify';



export default function TrocaSenha() {
  
  const [senha, setSenha] = useState('');
  const [Confirmarsenha, setConfirmarsenha] = useState('');

  const { token } = useParams();
const navigate = useNavigate()

  async function dadosLogin(e) {
    e.preventDefault();

    if (!validarSenhaForte(senha)) {
          toast.error(
            "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."
          );
          return;
        }

        if (senha !== Confirmarsenha) {
          toast.error(
            "senhas diferentes"
          );
          return;
        }
    await EmailAPI.TrocaSenha(senha,token)
  
    navigate("/")
  }

  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2 >Troca senha</h2>
        <form className="login-personal-form"  onSubmit={dadosLogin}>
          
          <div className="login-personal-input-group">
            <label htmlFor="senha" className="login-cadastro-personal-label">Nova senha</label>
            <input
              type="password"
              id="senha"
              className="login-cadastro-personal-input-select"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="login-personal-input-group">
            <label htmlFor="senha" className="login-cadastro-personal-label">Confirmar senha</label>
            <input
              type="password"
              id="senha"
              className="login-cadastro-personal-input-select"
              value={Confirmarsenha}
              onChange={(e) => setConfirmarsenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-personal-btn">Entrar</button>
        </form>

        <p className="login-personal-register-link">
           <Link to="/" className="login-personal-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
