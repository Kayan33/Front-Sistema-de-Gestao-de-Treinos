import { useParams } from "react-router-dom";
import Header from "../../../components/personal/header/header";
import { useEffect, useState, useContext } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import { useBusca } from "../../../hook/useBusca/useBusca";
import "./Exercicio.css";
import PopupCadastrarExercicio from "../../../components/personal/PopupCadastrarExercicio/PopupCadastrarExercicio";
import PopupVideio from "../../../components/personal/popupVideio/popupVideio";
import { ExercicioApi } from "../../../api/ExercicioApi";
import { CategoriaApi } from "../../../api/CategoriaApi";

export default function Exercicio() {
  const [exercicio, setExercicio] = useState(null);
  const [isPopupCadastroOpen, setIsPopupCadastroOpen] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState(false);
  const [selectedExercicio, setSelectedExercicio] = useState(null);
  const [nome_exercicio, setNome_exercicio] = useState("");
  const [URL_video, setURL_video] = useState("");

  const { categoriaID } = useParams();
  const { verificarToken, token } = useContext(AutenticadoContexto);

  verificarToken();

  async function ConsultaUnica() {
    try {
      const resposta = await CategoriaApi.consultaUnica(categoriaID);
      setExercicio(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  }

  useEffect(() => {
    ConsultaUnica();
  }, [categoriaID]);

  async function CadastrarExercicio() {
    await ExercicioApi.cadastro(nome_exercicio, URL_video, categoriaID);
    setNome_exercicio("");
    setURL_video("");
    await ConsultaUnica();
  }

  async function DeleteExercicio(ID) {
    await ExercicioApi.delete(ID);
    await ConsultaUnica();
  }

  const { listaFiltrada, termoBusca, setTermoBusca } = useBusca(
    exercicio ? exercicio.exercicios : [],
    ["nome_exercicio"]
  );

  return (
    <div className="dashboard-personal-container">
      <Header />
      <div className="container-aluno-unico">
        <div className="container-aluno-unico-links">
          <form className="form-busca-aluno">
            <input
              type="text"
              className="input-busca-aluno"
              placeholder="Nome do exercício"
              required
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </form>

          <PopupCadastrarExercicio
            isOpen={isPopupCadastroOpen}
            togglePopup={() => setIsPopupCadastroOpen(!isPopupCadastroOpen)}
            onSubmit={CadastrarExercicio}
            nome_exercicio={nome_exercicio}
            setNome_exercicio={setNome_exercicio}
            URL_video={URL_video}
            setURL_video={setURL_video}
          />

          <button
            className="BTN-adiciona"
            onClick={() => setIsPopupCadastroOpen(true)}
          >
            Cadastrar Exercício
          </button>
        </div>

        {exercicio ? (
          <div className="exercicios-wrapper">
            <h1 className="titulo-exercicios">{exercicio.categoria}</h1>
            {listaFiltrada.length > 0 ? (
              <ul className="lista-exercicios">
                {listaFiltrada.map((item) => (
                  <li key={item.id} className="item-exercicio">
                    <p>{item.nome_exercicio}</p>

                    <a
                      className="link-exercicio"
                      onClick={() => {
                        setSelectedExercicio(item);
                        setIsPopupVideoOpen(true);
                      }}
                    >
                      Ver vídeo
                    </a>
                    <button
                      className="BTN-remove"
                      onClick={() => DeleteExercicio(item.id)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="msg-nenhum-exercicio">
                Nenhum exercício encontrado.
              </p>
            )}
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      {isPopupVideoOpen && selectedExercicio && (
        <PopupVideio
          isOpen={isPopupVideoOpen}
          togglePopup={() => setIsPopupVideoOpen(false)}
          exercicio={[selectedExercicio]}
        />
      )}
    </div>
  );
}
