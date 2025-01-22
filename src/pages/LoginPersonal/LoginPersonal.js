import React, {  useState } from 'react';
import { Link, } from 'react-router-dom';
import './LoginPersonal.css';
import '../../style/global.css';

export default function LoginPersonal() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2 >Login para Personal</h2>
        <form className="login-personal-form" >
          <div className="login-personal-input-group">
            <label htmlFor="email" className="login-cadastro-personal-label">E-mail</label>
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
            <label htmlFor="senha" className="login-cadastro-personal-label">Senha</label>
            <input
              type="password"
              id="senha"
              className="login-cadastro-personal-input-select"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-personal-btn">Entrar</button>
        </form>
        <p className="login-personal-register-link">
          Não tem uma conta? <Link to="/cadastro/personal" className="login-personal-link">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
