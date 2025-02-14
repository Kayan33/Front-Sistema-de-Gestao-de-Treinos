import { Link, useParams } from "react-router-dom";
import Header from "../../../components/personal/header/header";
import { Personalapi } from "../../../api/personalApi";
import { useContext, useEffect, useState } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import "./AlunoUnico.css";
import "../../../style/classes.css";
import PopupCadastrarTreino from "../../../components/personal/popupCadastrarTreino/popupCadastrarTreino";
import { treinoAPI } from "../../../api/treinoApi";
import ConsultaTodosTreinos from "../../../components/personal/ConsultaTodosTreinos/ConsultaTodosTreinos";
import ConsultaTreinoComExercicios from "../../../components/personal/ConsultaTreinoComExercicios/ConsultaTreinoComExercicios";
import { BsArrowDownCircleFill } from "react-icons/bs";

export default function AlunoUnico() {
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nome_treino, setNome_treino] = useState("");
  const [abrir, setAbrir] = useState(false);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  const { aluno } = useParams();

  const Iid = localStorage.getItem("@id");
  const ID = Iid ? JSON.parse(Iid) : null;

  async function consultarDadosUsuarios() {
    const resposta = await Personalapi.consultaPcomA(ID, aluno, token);
    setDadosAluno(resposta.data?.aluno?.[0] || { aluno: [] });
  }

  useEffect(() => {
    consultarDadosUsuarios();
  }, []);

  async function CadastroTreino(e) {
    e.preventDefault();
    await treinoAPI.Cadastro(nome_treino, aluno, ID, token);
    setNome_treino("");
    await consultarDadosUsuarios();
  }

  async function DeleteTreino(id) {
    await treinoAPI.delete(id);
    await consultarDadosUsuarios();
  }

  const handleTreinoClick = (treino) => {
    if (treinoSelecionado?.id !== treino.id) {
      setTreinoSelecionado(treino);
    }
  };

  return (
    <>
      {dadosAluno.length === 0 ? (
        <div>zero dados</div>
      ) : (
        <div className="dashboard-personal-container">
          <Header />
          <div className="container-aluno-unico">
            {abrir ? (
              <div>
                <ConsultaTodosTreinos setAbrir={setAbrir} />
              </div>
            ) : (
              <>
              <div className="container-aluno-unico-links">
                  <button onClick={togglePopup} className="BTN-adiciona">
                    Cadastrar Treino
                  </button>

                  <PopupCadastrarTreino
                    isOpen={isPopupOpen}
                    togglePopup={togglePopup}
                    nome_treino={nome_treino}
                    setNome_treino={setNome_treino}
                    onSubmit={CadastroTreino}
                  />

                  <button
                    onClick={() => setAbrir(true)}
                    className="BTN-link-redirecionamento"
                  >
                    Consultar Treino
                  </button>
                </div>
                <h3>{dadosAluno.nome}</h3>

                <div className="container-aluno-unico-lista-treino">
                  {dadosAluno.treino?.length > 0 ? (
                    dadosAluno.treino.map((treino) => (
                      <div
                        className={`container-aluno-unico-treino`}
                        key={treino.id}
                      >
                        {treinoSelecionado?.id === treino.id ? (
                          <div className="">
                            <ConsultaTreinoComExercicios
                              treinoId={treino.id}
                              treinoNome={treino.nome_treino}
                              onClose={() => setTreinoSelecionado(null)}
                            />
                          </div>
                        ) : (
                          <div className="container-treino-nome">
                            <h1>{treino.nome_treino}</h1>
                            <div className="classes-treino-nome-button">

                            <button
                              className="BTN-remove"
                              onClick={() => DeleteTreino(treino.id)}
                            >
                              Delete
                            </button>

                            <a
                              className="BTN-expandir"
                              onClick={() => handleTreinoClick(treino)}
                            >
                              <BsArrowDownCircleFill
                                style={{
                                  fontSize: "2rem",
                                  color:
                                    treinoSelecionado?.id === treino.id
                                      ? "#FFD700"
                                      : "#001f5c",
                                  transform:
                                    treinoSelecionado?.id === treino.id
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="msg-nenhum-exercicio">Nenhum treino cadastrado.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
