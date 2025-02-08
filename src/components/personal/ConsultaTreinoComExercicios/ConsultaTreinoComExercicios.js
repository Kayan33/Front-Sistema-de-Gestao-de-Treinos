import { Await, useParams } from "react-router-dom";
import "../../../style/classes.css";
import "./ConsultaTreinoComExercicios.css";
import { Personalapi } from "../../../api/personalApi";
import { useContext, useEffect, useState } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import PopupCadastrarExercicioDetalhado from "../PopupCadastrarExercicioDetalhadp/PopupCadastrarExercicioDetalhado";
import { CategoriaApi } from "../../../api/CategoriaApi";
import { ExercicioDetalhadoApi } from "../../../api/ExercicioDetalhadoApi";

const ConsultaTreinoComExercicios = ({ treinoId, treinoNome, onClose }) => {
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categoria, setCategoria] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  const { aluno } = useParams();
  const ID = JSON.parse(localStorage.getItem("@id")) || null;

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  async function consultarDadosUsuarios() {
    const resposta = await Personalapi.consultaPcomA(ID, aluno, token);
    setDadosAluno(resposta.data?.aluno?.[0] || { aluno: [] });
  }

  async function consultaCategoria() {
    const resposta = await CategoriaApi.consulta();
    setCategoria(resposta.data);
  }

  async function handleCadastrarExercicio({
    repeticoes,
    descanso,
    exercicioID,
  }) {
    try {
      await ExercicioDetalhadoApi.cadastrar(
        repeticoes,
        descanso,
        exercicioID,
        treinoId
      );
      setIsPopupOpen(false);
      consultarDadosUsuarios();
    } catch (error) {}
  }

  async function Troca(ID, repeticoes, descanso) {
    await ExercicioDetalhadoApi.trocar(ID, repeticoes, descanso);
  }

  const handleInputChange = (e, exercicioId, tipo) => {
    const { value } = e.target;

    setExercicios((prevExercicios) =>
      prevExercicios.map((exercicio) => {
        if (exercicio.id === exercicioId) {
          return {
            ...exercicio,
            [tipo]: value,
          };
        }
        return exercicio;
      })
    );
  };

  async function DeleteExercicio(id) {
    
    
  }

  useEffect(() => {
    consultarDadosUsuarios();
    consultaCategoria();
  }, []);

  useEffect(() => {
    if (dadosAluno.treino?.length > 0) {
      const treinoAtual = dadosAluno.treino.find(
        (treino) => treino.id === treinoId
      );
      if (treinoAtual) {
        setExercicios(treinoAtual.AlunoExercicio || []);
      }
    }
  }, [dadosAluno, treinoId]);

  return (
    <div className="consulta-treino-container">
      <div className="class-BTN">
        <button className="BTN-link-redirecionamento" onClick={onClose}>
          Voltar
        </button>

        <button className="BTN-adiciona" onClick={togglePopup}>
          + Adicionar Exercício
        </button>
      </div>
      <h1 className="treinamento-titulo">{treinoNome}</h1>

      {dadosAluno.treino?.length > 0 ? (
        <ul className="exercicios-lista">
          {exercicios.length > 0 ? (
            exercicios.map((exercicio) => (
              <li key={exercicio.id} className="exercicio-item">
                <span className="exercicio-categoria">
                  Categoria: {exercicio.exercicio.categoria.categoria}
                </span>
                <div className="exercicio-container">
                  <div className="exercicio-video-container">
                    <iframe
                      src={exercicio.exercicio.URL_video}
                      className="exercicio-video"
                      title={exercicio.exercicio.nome_exercicio}
                    ></iframe>
                  </div>

                  <form
                    className="exercicio-detalhes"
                    onSubmit={(e) => {
                      e.preventDefault();
                      Troca(
                        exercicio.id,
                        exercicio.repeticoes,
                        exercicio.descanso
                      );
                    }}
                  >
                    <span className="exercicio-nome">
                      {exercicio.exercicio.nome_exercicio}
                    </span>
                    <label>Repetição</label>
                    <input
                      type="number"
                      className="form-input-number-repeticoes"
                      value={exercicio.repeticoes || 0}
                      onChange={(e) =>
                        handleInputChange(e, exercicio.id, "repeticoes")
                      }
                    />
                    <label>Descanço</label>
                    <div className="descanso-input-number">
                    <input
                      type="number"
                      className="form-input-number-descanso"
                      value={exercicio.descanso || 0}
                      onChange={(e) =>
                        handleInputChange(e, exercicio.id, "descanso")
                      }
                    />
                    <label>Segundos</label>
                    </div>

                    <button type="submit" className="BTN-adiciona">
                      Enviar
                    </button>

                    <button type="submit"
                     className="BTN-remove"
                     onClick={()=> DeleteExercicio(exercicio.id)}>
                      deletar
                    </button>
                  </form>
                </div>
              </li>
            ))
          ) : (
            <p className="nenhum-exercicio">Nenhum exercício cadastrado.</p>
          )}
        </ul>
      ) : (
        <p className="nenhum-exercicio">Nenhum exercício cadastrado.</p>
      )}

      {isPopupOpen && (
        <PopupCadastrarExercicioDetalhado
          isOpen={isPopupOpen}
          togglePopup={togglePopup}
          categoria={categoria}
          onSubmit={handleCadastrarExercicio}
        />
      )}
    </div>
  );
};

export default ConsultaTreinoComExercicios;
