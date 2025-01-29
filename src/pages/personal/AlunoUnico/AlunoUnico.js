import { Link, useParams } from "react-router-dom";
import Header from "../../../components/personal/header/header";
import { Personalapi } from "../../../api/personalApi";
import { useContext, useEffect, useState } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import "./AlunoUnico.css";
import PopupCadastrarTreino from "../../../components/personal/popupCadastrarTreino/popupCadastrarTreino";
import { treinoAPI } from "../../../api/treinoApi";

export default function AlunoUnico() {
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nome_treino, setNome_treino] = useState("");

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

  return (
    <>
      {dadosAluno.length === 0 ? 
        <div>zero dados</div>
       : 
        <div className="dashboard-personal-container">
          <Header />

          <div className="container-aluno-unico">
            <h3>{dadosAluno.nome}</h3>
            <div className="container-aluno-unico-links">
              <button
                onClick={togglePopup}
                className="container-aluno-unico-links link"
              >
                Cadastrar Treino
              </button>

              <PopupCadastrarTreino
                isOpen={isPopupOpen}
                togglePopup={togglePopup}
                nome_treino={nome_treino}
                setNome_treino={setNome_treino}
                onSubmit={CadastroTreino}
              />
              <Link to={`/`} className="container-aluno-unico-links link">
                consultar Treino
              </Link>
            </div>
            <div className=" container-aluno-unico-lista-treino">
              {dadosAluno.treino?.map((treino) => (
                <div className="container-aluno-unico-treino" key={treino.id}>
                  <h1>{treino.nome_treino}</h1>
                  <button>-</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
}
