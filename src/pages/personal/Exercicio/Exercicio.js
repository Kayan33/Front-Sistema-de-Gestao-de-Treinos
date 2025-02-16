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
import Loading from "../../../components/Loading/Loading"; 
import { extrairIdDoYoutube } from "../../../services/utils/validacoes";
import { toast } from "react-toastify";

export default function Exercicio() {
  const [exercicio, setExercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupCadastroOpen, setIsPopupCadastroOpen] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState(false);
  const [selectedExercicio, setSelectedExercicio] = useState(null);
  const [nome_exercicio, setNome_exercicio] = useState("");
  const [URL_video, setURL_video] = useState("");

  const { categoriaID } = useParams();
  const { verificarToken, token } = useContext(AutenticadoContexto);

  const Iid = localStorage.getItem("@id");
  const personalID = Iid ? JSON.parse(Iid) : null;

  useEffect(() => {
    verificarToken();
  }, []);

  async function ConsultaUnica() {
    setLoading(true);
    try {
      const resposta = await ExercicioApi.consultaPorPersonalECategoria(categoriaID,personalID);
      setExercicio(resposta.data);
    
      
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ConsultaUnica();
  }, [categoriaID]);

  async function CadastrarExercicio() {
    setLoading(true);
    
    const videoID = extrairIdDoYoutube(URL_video);
    if (!videoID) {
      toast.error("URL de vídeo inválida!");
      setLoading(false);
      return;
    }
  
    await ExercicioApi.cadastro(nome_exercicio,videoID, categoriaID,personalID);
    
    setNome_exercicio("");
    setURL_video(""); 
    setIsPopupCadastroOpen(false)
    await ConsultaUnica();
  }
  

  async function DeleteExercicio(ID) {
    setLoading(true);
    await ExercicioApi.delete(ID);
    await ConsultaUnica();
  }

  const { listaFiltrada, termoBusca, setTermoBusca } = useBusca(
    exercicio ? exercicio : [],
    ["nome_exercicio"]
  );

  return (
    <div className="dashboard-personal-container">
      <Header />
      <Loading loading={loading} /> 
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

        
          <div className="exercicios-wrapper">
            <h1 className="titulo-exercicios">{exercicio?.categoria || "Sem categoria"}</h1>
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
              <p className="msg-nenhum-exercicio">Nenhum exercício encontrado.</p>
            )}
          </div>
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
