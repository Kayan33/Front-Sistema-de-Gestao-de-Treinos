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

export default function AlunoUnico() {
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nome_treino, setNome_treino] = useState("");
  const [abrir, setAbrir] = useState(false);
  const [treinoSelecionado, setTreinoSelecionado] = useState(null); // Track selected treino

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

  const CadastroTreino = async (e) => {
    e.preventDefault();
    await treinoAPI.Cadastro(nome_treino, aluno, ID, token);
    setNome_treino("");
    await consultarDadosUsuarios();
  };

  const handleTreinoClick = (treino) => {
  
    setTreinoSelecionado(treinoSelecionado?.id === treino.id ? null : treino);
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
                <h3>{dadosAluno.nome}</h3>
                <div className="container-aluno-unico-links">
                  <button onClick={togglePopup} className="BTN-link-redirecionamento">
                    Cadastrar Treino
                  </button>

                  <PopupCadastrarTreino
                    isOpen={isPopupOpen}
                    togglePopup={togglePopup}
                    nome_treino={nome_treino}
                    setNome_treino={setNome_treino}
                    onSubmit={CadastroTreino}
                  />

                  <button onClick={() => setAbrir(true)} className="BTN-link-redirecionamento">
                    Consultar Treino
                  </button>
                </div>

                <div className="container-aluno-unico-lista-treino">
                  {dadosAluno.treino?.length > 0 ? (
                    dadosAluno.treino.map((treino) => (
                      <div
                        className={`container-aluno-unico-treino ${
                          treinoSelecionado?.id === treino.id ? "expandido" : ""
                        }`}
                        key={treino.id}
                        onClick={() => handleTreinoClick(treino)} 
                      >
                        {treinoSelecionado?.id === treino.id ? (
                          <div>
                            <ConsultaTreinoComExercicios treinoId={treino.id} /> 
                          </div>
                        ) : (
                          <h1>{treino.nome_treino}</h1>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Nenhum treino cadastrado.</p>
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
