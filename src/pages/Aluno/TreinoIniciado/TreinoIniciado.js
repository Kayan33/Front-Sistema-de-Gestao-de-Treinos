import { useContext, useEffect, useState } from "react";
import "./TreinoIniciado.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import { treinoAPI } from "../../../api/treinoApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderTreinoIniciado from "../../../components/Aluno/HeaderTreinoIniciado/HeaderTreinoIniciado";

export default function TreinoIniciado() {
  const [dadosTreino, setDadosTreino] = useState(null);
  const { VerificaTokenAluno, token } = useContext(AutenticadoContexto);
  const [loading, setLoading] = useState(true);
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [tempoRepeticao, setTempoRepeticao] = useState(0);
  const [contagemRegressiva, setContagemRegressiva] = useState(false);
  const [repeticoesRestantes, setRepeticoesRestantes] = useState(0);
  const [contagemExibida, setContagemExibida] = useState(null);

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
      let tempo = 10; // Começa em 10 segundos

      const intervalo = setInterval(() => {
        setContagemExibida(tempo);
        tempo--;

        if (tempo < 0) {
          clearInterval(intervalo);
          setContagemExibida(null);
          setContagemRegressiva(false);

          if (repeticoesRestantes > 1) {
            setRepeticoesRestantes(repeticoesRestantes - 1);
            setTempoRepeticao(exercicio.tempoRepeticao);
          } else {
            if (exercicioAtual < dadosTreino.AlunoExercicio.length - 1) {
              setExercicioAtual(exercicioAtual + 1);
              const proximoExercicio =
                dadosTreino.AlunoExercicio[exercicioAtual + 1];
              setTempoRepeticao(proximoExercicio.tempoRepeticao);
            } else {
              toast.success("Treino concluído!");
            }
          }
        }
      }, 1000);
    }
  };

  return (
    <div className="dashboard-personal-container">
       <HeaderTreinoIniciado/>
       
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
    </div>
  );
}
