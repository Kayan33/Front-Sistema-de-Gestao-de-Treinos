import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 
import { AutenticadoContexto } from '../../context/authContexts';

export default function Header() {
const{logout} = useContext(AutenticadoContexto)

  return (
    
      <header className="dashboard-header">
        <h1>Bem-vindo </h1>
        <div className="dashboard-navigation">
          <Link to="/assinatura">Assinatura</Link>
          <Link to="/ajuda">Ajuda</Link>
          <Link to="/perfil">Perfil</Link>

        <Link className='logout' onClick={logout}>logout</Link>
        </div>
      </header>

    
  );
}
