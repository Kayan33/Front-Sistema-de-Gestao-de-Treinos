import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { AutenticadoContexto } from "../../../context/authContexts";

export default function Header() {
  const { logout } = useContext(AutenticadoContexto);

  const Inome = localStorage.getItem("@nome");
  const nome = Inome ? JSON.parse(Inome) : null;

  const primeiroNome = nome ? nome.split(" ")[0] : "";

  return (
    <header className="header-personal">
      <h1>Bem-vindo {primeiroNome}</h1>
      <div className="navigation-personal">
        <Link to="/assinatura" className="navigation-personal-link">
          Assinatura
        </Link>
        <Link to="/ajuda" className="navigation-personal-link">
          Ajuda
        </Link>
        <Link to="/perfil" className="navigation-personal-link">
          Perfil
        </Link>

        <Link className="logout" onClick={logout}>
          logout
        </Link>
      </div>
    </header>
  );
}
