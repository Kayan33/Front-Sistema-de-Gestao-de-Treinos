import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AutenticadoContexto } from "../../../context/authContexts";

export default function HeaderAluno() {
  const { logout } = useContext(AutenticadoContexto);

  const Inome = localStorage.getItem("@nomealuno");
  const nome = Inome ? JSON.parse(Inome) : null;

  const primeiroNome = nome ? nome.split(" ")[0] : "";

  return (
    <header className="header-personal">
      <h1>Bem-vindo {primeiroNome}</h1>
      <div className="navigation-personal">
        
        <Link className="logout" onClick={logout}>
          logout
        </Link>
      </div>
    </header>
  );
}
