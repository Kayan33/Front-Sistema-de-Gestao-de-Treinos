import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./DashBoardPersonal.css";
import Header from "../../../components/personal/header/header";
import HeaderCadastroAluno from "../../../components/personal/headerCadastroAluno/headerCadastroAluno";
import { AutenticadoContexto } from "../../../context/authContexts";
import { Personalapi } from "../../../api/personalApi";
import Loading from "../../../components/Loading/Loading"; 

export default function DashBoardPersonal() {
  const [dadosUsuarios, setDadosUsuarios] = useState(null);
  const [dadosAluno, setDadosAluno] = useState([]);
  const [loading, setLoading] = useState(true);

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  const Iid = localStorage.getItem("@id");
  const ID = Iid ? JSON.parse(Iid) : null;

  async function consultarDadosUsuarios() {
    if (!ID) {
      console.error("ID não encontrado no localStorage.");
      setLoading(false);
      return;
    }

    try {
      const resposta = await Personalapi.consultaUnica(ID, token);
      setDadosUsuarios(resposta.data);
      setDadosAluno(resposta.data.aluno || []);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    consultarDadosUsuarios();
  }, [ID, token]);



  return (
    <div className="dashboard-personal-container">
      <Header />
      <HeaderCadastroAluno onAlunoCadastrado={consultarDadosUsuarios} />
      <Loading loading={loading} /> 

      <section className="dashboard-links">
        <div className="dashboard-card">
          <Link to="/cliente/lista" className="dashboard-link">
            <h3 className="dashboard-title">Alunos</h3>
            <div className="dashboard-description">
              <p>Veja os alunos cadastrados</p>
              <div className="alunos-ativos">
                <p>Ativos: {dadosAluno.length}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="dashboard-card">
          <Link to="/Categoria" className="dashboard-link">
            <h3 className="dashboard-title">Exercícios</h3>
            <p className="dashboard-description">
              Aqui você vê, cria e edita exercícios.
            </p>
          </Link>
        </div>
      </section>

      <section className="personal-details">
        <h2>Meus Dados</h2>
        {dadosUsuarios && (
          <div className="personal-card">
            <h3>{dadosUsuarios.nome}</h3>
            <p>{dadosUsuarios.email}</p>
            <p>{dadosUsuarios.telefone}</p>
          </div>
        )}
      </section>
    </div>
  );
}
