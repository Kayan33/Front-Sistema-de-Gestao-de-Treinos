import { useContext, useEffect, useState } from "react";
import "./DashboardAluno.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import { alunoApi } from "../../../api/alunoApi";
import HeaderAluno from "../../../components/Aluno/Header/Header";
import ConvitePersonal from "../../../components/Aluno/ConvitePersonal/ConvitePersonal";
import { Link } from "react-router-dom";

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

      if (
        resposta.data.convite?.some((convite) => convite.status === "PENDENTE")
      ) {
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

      <div className="treinos-container">
        {dadosUsuarios?.personal?.treino?.length > 0 ? (
          <div className="treinos-list">
            <h3 className="treinos-title">Treinos Disponíveis:</h3>
            <div className="treinos-grid">
              {dadosUsuarios.personal.treino.map((treino) => (
                <div key={treino.id} className="treino-item">
                  <p className="treino-name">{treino.nome_treino}</p>

                  {treino.AlunoExercicio && treino.AlunoExercicio.length > 0 ? (
                    <>
                      <div className="exercicios-list">
                        {treino.AlunoExercicio.slice(0, 2).map((exercicio) => (
                          <div
                            key={exercicio.id}
                            className="exercicio-container"
                          >
                            <p className="exercicio-category">
                              {`Categoria: ${exercicio.exercicio.categoria.categoria}`}
                            </p>
                            <p className="exercicio-title">
                              {exercicio.exercicio.nome_exercicio}
                            </p>
                            <p className="exercicio-sets-reps">
                              {`Repetições: ${exercicio.repeticoes}`}
                            </p>
                            <p className="exercicio-rest">
                              {`Descanso: ${exercicio.descanso} segundos`}
                            </p>
                          </div>
                        ))}

                        {treino.AlunoExercicio.length > 2 && (
                          <p className="mais-exercicios-texto">
                            Mais exercícios disponíveis
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/treino/unico/${treino.id}`}
                        className="start-treino-button"
                      >
                        Iniciar Treino
                      </Link>
                    </>
                  ) : (
                    <p className="no-exercicio-message">
                      Nenhum exercício cadastrado para este treino
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-treino-message">
            <p>Não existe treino atribuído</p>
          </div>
        )}
      </div>

      <div className="dados-usuario-personal">
        {dadosUsuarios?.personal ? (
          <div className="personal-info">
            <h2 className="personal-title">Personal Trainer</h2>
            <div className="personal-dados">
              <p>
                <strong>Nome:</strong> {dadosUsuarios.personal.nome}
              </p>
              <p>
                <strong>Email:</strong> {dadosUsuarios.personal.email}
              </p>
              <p>
                <strong>Telefone:</strong> {dadosUsuarios.personal.telefone}
              </p>
            </div>
          </div>
        ) : (
          <div className="personal-sem-cadastro">
            <p className="sem-personal-msg">Nenhum personal adicionado</p>
            <h1 className="personal-convite-titulo">
              Peça para seu Personal se cadastrar no site
            </h1>
            <p className="personal-convite-texto">
              Peça para ele enviar um convite para você pelo e-mail de criação
            </p>
          </div>
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
