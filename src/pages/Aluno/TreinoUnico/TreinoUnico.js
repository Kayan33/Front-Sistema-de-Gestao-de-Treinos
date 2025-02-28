import { useContext, useEffect, useState } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import HeaderAluno from "../../../components/Aluno/Header/Header";
import { treinoAPI } from "../../../api/treinoApi";
import { useParams } from "react-router-dom";  

import "./TreinoUnico.css";
import LoadingTreino from "../../../components/Aluno/LoadingTreino/LoadingTreino";

export default function TreinoUnico() {
  const [loading, setLoading] = useState(true);
  const [dadosTreino, setDadosTreino] = useState(null);
  const { VerificaTokenAluno, token } = useContext(AutenticadoContexto);

  const Iid = localStorage.getItem("@idaluno");
  const ID = Iid ? JSON.parse(Iid) : null;


  useEffect(() => {
    VerificaTokenAluno();
  }, []);

  const { treinoID } = useParams();

  async function consultarDadosUnicoTreino() {
    try {
      const resposta = await treinoAPI.consultaUnica(treinoID);
      setDadosTreino(resposta.data);
      console.log(resposta);
      
    } catch (error) {
      console.error("Erro ao buscar os dados do treino:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    consultarDadosUnicoTreino();
  }, [ID, token]);

  const [isTreinoIniciado, setIsTreinoIniciado] = useState(false);

  const iniciarTreino = () => {
    setIsTreinoIniciado(true); 
  };
  
  if (isTreinoIniciado) {
    return <LoadingTreino />; 
  }
  

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-personal-container">
      <HeaderAluno />

      <>
        {dadosTreino ? (
          <div className="treino-details">
            <h2 className="treino-title">{dadosTreino.nome_treino}</h2>

           
              <div className="treino-video">
                {dadosTreino.AlunoExercicio && dadosTreino.AlunoExercicio.length > 0 ? (
                  dadosTreino.AlunoExercicio.map((alunoExercicio, index) => (
                    <div key={index} className="exercicio-item-aluno">
                      <h4>{alunoExercicio.exercicio.nome_exercicio}</h4>
                      <p><strong>Categoria:</strong> {alunoExercicio.exercicio.categoria.categoria}</p>

                      <div className="video-container">
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${alunoExercicio.exercicio.URL_video}`}
                          title={alunoExercicio.exercicio.nome_exercicio}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="container-repetiçao-descanso">
                          
                        <p><strong>Repetições:</strong> {alunoExercicio.repeticoes}</p>
                        </div>

                        <div className="container-carga">
                          
                        <p><strong>Carga Sugerida pelo Personal:</strong> {alunoExercicio.cargaSugerida}kg</p>
                        </div>

                        <div className="container-tempo-repetição-exercicio">
                        <p><strong>tempo de descanço:</strong> {alunoExercicio.tempoRepeticao} Segundos</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Não há exercícios disponíveis para este treino.</p>
                )}
              </div>

              <button className="iniciar-treino-button" onClick={iniciarTreino}>Iniciar Treino</button>

            </div>
         
        ) : (
          <p>Dados do treino não encontrados.</p>
        )}
      </>
    </div>
  );
}
