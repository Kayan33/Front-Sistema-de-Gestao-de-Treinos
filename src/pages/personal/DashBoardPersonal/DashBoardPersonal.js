import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./DashBoardPersonal.css";
import Header from "../../../components/personal/header/header";
import HeaderCadastroAluno from "../../../components/personal/headerCadastroAluno/headerCadastroAluno";
import { AutenticadoContexto } from "../../../context/authContexts";
import { Personalapi } from "../../../api/personalApi";

export default function DashBoardPersonal() {
  const [dadosUsuarios, setDadosUsuarios] = useState([""]);
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  const Iid = localStorage.getItem("@id");
  const ID = Iid ? JSON.parse(Iid) : null;

  async function consultarDadosUsuarios() {
    const resposta = await Personalapi.consultaUnica(ID, token);
    setDadosUsuarios(resposta.data);
    setDadosAluno(resposta.data[0] || { aluno: [] });
  }

  useEffect(() => {
    consultarDadosUsuarios();
  }, []);

  return (
    <>
      {dadosAluno.length === 0 ? (
        <div className="dashboard-personal-container">
          <Header />
          <p>Carregando dados...</p>
        </div>
      ) : (
        <div className="dashboard-personal-container">
          <Header />
          <HeaderCadastroAluno onAlunoCadastrado={consultarDadosUsuarios} />

          <section className="dashboard-links">
            <div className="dashboard-card">
              <Link to="/cliente/lista" className="dashboard-link">
                <h3 className="dashboard-title">Alunos</h3>
                <div className="dashboard-description">
                  <p>Veja os alunos cadastrados</p>
                  <div className="alunos-ativos">
                    <p>Ativos: {dadosAluno?.aluno?.length ?? 0}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="dashboard-card">
              <Link to="/CriaExercicios/:treino" className="dashboard-link">
                <h3 className="dashboard-title">Exercícios</h3>
                <p className="dashboard-description">
                  Aqui você vê, cria e edita exercícios.
                </p>
              </Link>
            </div>
          </section>

          <section className="personal-details">
            <h2>Meus Dados</h2>
            {dadosUsuarios.map((personal) => (
              <div key={personal.id} className="personal-card">
                <h3>{personal.nome}</h3>
                <p>{personal.email}</p>
                <p>{personal.telefone}</p>
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
}
