import { useParams } from "react-router-dom";
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

  async function handleCadastrarExercicio({ repeticoes, descanso, exercicioID }) {
    try {
      await ExercicioDetalhadoApi.cadastrar(repeticoes, descanso, exercicioID, treinoId);
      setIsPopupOpen(false);
      consultarDadosUsuarios();
    } catch (error) {}
  }

  useEffect(() => {
    consultarDadosUsuarios();
    consultaCategoria();
  }, []);

  return (
    <div className="consulta-treino-container">
      <div className="class-BTN">

      <button className="BTN-link-redirecionamento" onClick={onClose}>
        Voltar
      </button>

      <button className="btn-cadastro" onClick={togglePopup}>
        + Adicionar Exercício
      </button>
      </div>
      <h1 className="treinamento-titulo">{treinoNome}</h1> 


      {dadosAluno.treino?.length > 0 ? (
  <ul className="exercicios-lista">
    {dadosAluno.treino
      .filter((treino) => treino.id === treinoId)
      .flatMap((treino) =>
        treino.AlunoExercicio?.length > 0 ? (
          treino.AlunoExercicio.map((exercicio) => (
            <li key={exercicio.id} className="exercicio-item">
              <span className="exercicio-nome">{exercicio.exercicio.nome_exercicio}</span>
              <span className="exercicio-repeticoes">{exercicio.repeticoes} repetições</span>
              <span className="exercicio-descanso">{exercicio.descanso}s descanso</span>
              <span className="exercicio-categoria">
                Categoria: {exercicio.exercicio.categoria.categoria}
              </span>
            </li>
          ))
        ) : (
          <p className="nenhum-exercicio">Nenhum exercício cadastrado.</p>
        )
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
