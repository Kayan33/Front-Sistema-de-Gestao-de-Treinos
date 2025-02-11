import React, { useContext, useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { AutenticadoContexto } from '../../../context/authContexts';
import { EmailAPI } from '../../../api/EmailApi';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  async function TrocaSenha(e) {
    e.preventDefault();
    
      await EmailAPI.EnvioEmail(email)
 
  }

  return (
    <div className="container-pai-cadastro-login-personal">
      <div className="login-cadastro-personal-form-container">
        <h2 >Esqueci senha</h2>
        <p>Será enviado um e-mail para troca de senha</p>
        <form className="login-personal-form" onSubmit={TrocaSenha} >
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
          
          <button type="submit" className="login-personal-btn">Enviar</button>
        </form>
        
      </div>
    </div>
  );
}
