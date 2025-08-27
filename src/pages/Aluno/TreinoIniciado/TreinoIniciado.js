import { useContext, useEffect, useState } from "react";
import "./TreinoIniciado.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import { treinoAPI } from "../../../api/treinoApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderTreinoIniciado from "../../../components/Aluno/HeaderTreinoIniciado/HeaderTreinoIniciado";
import ModalCargaUsada from "../../../components/Aluno/modalCargaUsada/modalCargaUsada";
import TreinoConcluido from "../TreinoConcluido/TreinoConcluido";

export default function TreinoIniciado() {
  const [dadosTreino, setDadosTreino] = useState(null);
  const { VerificaTokenAluno, token } = useContext(AutenticadoContexto);
  const [loading, setLoading] = useState(true);
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [tempoRepeticao, setTempoRepeticao] = useState(0);
  const [contagemRegressiva, setContagemRegressiva] = useState(false);
  const [repeticoesRestantes, setRepeticoesRestantes] = useState(0);
  const [contagemExibida, setContagemExibida] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [treinoConcluido, setTreinoConcluido] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const [modalData, setModalData] = useState({
    idExercicio: null,
    idTreino: null,
    NomeTreino: null,
    CargaSugerida: null,
    NomeCategoria: null,
    NomeExercicio: null,
  });

  const { treinoID } = useParams();

  useEffect(() => {
    VerificaTokenAluno();
  }, []);

  async function consultarDadosUnicoTreino() {
    try {
      const resposta = await treinoAPI.consultaUnica(treinoID);
      setDadosTreino(resposta.data);
      console.log("Dados do treino:", resposta.data);
    } catch (error) {
      console.error("Erro ao buscar os dados do treino:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    consultarDadosUnicoTreino();
  }, [token]);

  const exercicio = dadosTreino?.AlunoExercicio[exercicioAtual];

  useEffect(() => {
    if (exercicio) {
      setTempoRepeticao(exercicio.tempoRepeticao);
      setRepeticoesRestantes(exercicio.repeticoes);
    }
  }, [exercicio]);

  const pulaexercicio = () => {
  if (dadosTreino && exercicio && !contagemRegressiva) {
    setContagemRegressiva(true);
    let tempo = exercicio.tempoRepeticao;

    const intervalo = setInterval(() => {
      setContagemExibida(tempo);
      tempo--;

      if (tempo < 0) {
        clearInterval(intervalo);
        setContagemExibida(null);
        setContagemRegressiva(false);

        if (repeticoesRestantes > 1) {
          setRepeticoesRestantes((prev) => prev - 1);
          setTempoRepeticao(exercicio.tempoRepeticao);
        } else {
          const ultimoExercicio = exercicioAtual === dadosTreino.AlunoExercicio.length - 1;

          if (ultimoExercicio) {
            // 👉 Primeiro exibe o modal, e só depois finaliza o treino
            setModalData({
              idExercicio: exercicio.exercicio.id,
              idTreino: dadosTreino.id,
              NomeTreino: dadosTreino.nome_treino,
              CargaSugerida: exercicio.cargaSugerida,
              NomeCategoria: exercicio.exercicio.categoria.categoria,
              NomeExercicio: exercicio.exercicio.nome_exercicio,
            });

            setIsPopupOpen(true); 

          } else {
            // Vai para o próximo exercício
            setExercicioAtual((prev) => prev + 1);
            const proximoExercicio = dadosTreino.AlunoExercicio[exercicioAtual + 1];

            toast.success("Próximo exercício!");

            setModalData({
              idExercicio: proximoExercicio.exercicio.id,
              idTreino: dadosTreino.id,
              NomeTreino: dadosTreino.nome_treino,
              CargaSugerida: proximoExercicio.cargaSugerida,
              NomeCategoria: proximoExercicio.exercicio.categoria.categoria,
              NomeExercicio: proximoExercicio.exercicio.nome_exercicio,
            });

            setIsPopupOpen(true);
            setTempoRepeticao(proximoExercicio.tempoRepeticao);
          }
        }
      }
    }, 1000);
  }
};

  

const [tempo, setTempo] = useState({ horas: 0, minutos: 0, segundos: 0 });

const handleCloseModal = () => {
  setIsPopupOpen(false);

  setTimeout(() => {
    if (exercicioAtual === dadosTreino.AlunoExercicio.length - 1 && repeticoesRestantes === 1) {

      // usa o tempo do state
      const tempoExecucao = 
        String(tempo.horas).padStart(2, "0") + ":" +
        String(tempo.minutos).padStart(2, "0") + ":" +
        String(tempo.segundos).padStart(2, "0");

        console.log(tempo.horas, tempo.minutos, tempo.segundos);
        

      let cargasAnteriores = JSON.parse(localStorage.getItem("cargasUtilizadas")) || [];

      const cargasAtualizadas = cargasAnteriores.map((carga, index) => {
        if (index === cargasAnteriores.length - 1) {
          return { ...carga, tempo_execucao: tempoExecucao };
        }
        return carga;
      });

      localStorage.setItem("cargasUtilizadas", JSON.stringify(cargasAtualizadas));
      setTreinoConcluido(true);
    }
  }, 100);
};


  return treinoConcluido ? (
    <TreinoConcluido />
  ) : (
    <div className="dashboard-personal-container">
      <HeaderTreinoIniciado setTempo={setTempo} />

      {loading ? (
        <div className="area-carregando">
          <p>Carregando treino...</p>
        </div>
      ) : exercicio ? (
        <div className="treino-iniciado-conteudo">
          <p className="treino-iniciado-categoria">
            <strong>Categoria:</strong>{" "}
            {exercicio.exercicio.categoria.categoria}
          </p>
          <div className="exercicio-titulo-area">
            <h2 className="exercicio-titulo">
              {exercicio.exercicio.nome_exercicio}
            </h2>
          </div>

          <div className="video-area">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${exercicio.exercicio.URL_video}`}
              title={exercicio.exercicio.nome_exercicio}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="exercicio-info">
            <div className="exercicio-dado">
              <p className="exercicio-numero">{exercicio.cargaSugerida}kg</p>
              <strong className="exercicio-titulo-carga">
                Carga Sugerida:
              </strong>
            </div>

            <div className="exercicio-dado">
              <p className="exercicio-numero">{exercicio.tempoRepeticao}s</p>
              <strong className="exercicio-titulo-carga">
                Tempo Sugerido:
              </strong>
            </div>
          </div>

          <div className="exercicio-dados-area">
            <div className="repeticoes-area">
              {Array.from({ length: exercicio.repeticoes }, (_, i) => (
                <span
                  key={i}
                  className={`repeticao ${
                    i < exercicio.repeticoes - repeticoesRestantes
                      ? "repeticao-feita"
                      : ""
                  }`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="area-botao">
            <button
              className="botao-proximo-exercicio"
              onClick={pulaexercicio}
              disabled={contagemRegressiva}
            >
              {contagemRegressiva ? contagemExibida : "GO"}
            </button>
          </div>
        </div>
      ) : (
        <div className="area-erro">
          <p>Erro ao carregar o exercício</p>
        </div>
      )}

      
{isPopupOpen && (
  <ModalCargaUsada
        isOpen={isPopupOpen}
        togglePopup={handleCloseModal}
        idExercicio={modalData.idExercicio}
        idTreino={modalData.idTreino}
        NomeTreino={modalData.NomeTreino}
        CargaSugerida={modalData.CargaSugerida}
        NomeCategoria={modalData.NomeCategoria}
        NomeExercicio={modalData.NomeExercicio}
      />
)}
    </div>


  );
}
