import { useContext, useEffect, useState } from "react";
import "./DashboardAluno.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import { alunoApi } from "../../../api/alunoApi";
import HeaderAluno from "../../../components/Aluno/Header/Header";
import ConvitePersonal from "../../../components/Aluno/ConvitePersonal/ConvitePersonal";

export default function DashboardAluno() {
  const [loading, setLoading] = useState(true);
  const [dadosUsuarios, setDadosUsuarios] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const { VerificaTokenAluno, token } = useContext(AutenticadoContexto);

  const Iid = localStorage.getItem("@idaluno");
  const ID = Iid ? JSON.parse(Iid) : null;

  useEffect(() => {
    VerificaTokenAluno();
  }, []);

  async function consultarDadosUsuarios() {
    if (!ID) {
      console.error("ID não encontrado no localStorage.");
      setLoading(false);
      return;
    }

    try {
      const resposta = await alunoApi.consultaUnica(ID);
      setDadosUsuarios(resposta.data);
console.log(resposta.data);

      if (resposta.data.convite?.some(convite => convite.status === "PENDENTE")) {
        setTimeout(() => setMostrarPopup(true), 10000);
      }
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
      <HeaderAluno />

      {mostrarPopup && <ConvitePersonal />}

      <div className="dados-usuario-personal">
        {dadosUsuarios?.personal ? (
          <>
            <p>Personal Trainer: {dadosUsuarios.personal.nome}</p>
            <p>Email: {dadosUsuarios.personal.email}</p>
            <p>Email: {dadosUsuarios.personal.telefone}</p>
          </>
        ) : (
          <>
            <p>Nenhum personal adicionado</p>
            <h1>Peça para seu Personal se cadastrar no site</h1>
            <p>Faça o cadastro e mande um convite para você pelo e-mail de criação</p>
          </>
        )}
      </div>

      {dadosUsuarios && (
        <div className="personal-details">
          <div className="personal-card">
            <h3>{dadosUsuarios.nome}</h3>
            <p>{dadosUsuarios.email}</p>
            <p>{dadosUsuarios.telefone}</p>
          </div>
        </div>
      )}
    </div>
  );
}
