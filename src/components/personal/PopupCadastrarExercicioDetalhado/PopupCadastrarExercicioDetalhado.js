import { useState } from "react";
import "../../../style/classes.css";
import "./PopupCadastrarExercicioDetalhado.css";
import { toast } from "react-toastify";

const PopupCadastrarExercicioDetalhado = ({
  isOpen,
  togglePopup,
  onSubmit,
  categoria,
}) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [exercicioSelecionado, setExercicioSelecionado] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [descanso, setDescanso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercicioSelecionado || !repeticoes || !descanso) {
      toast.error("Preencha todos os campos!");
      return;
    }
    onSubmit({ repeticoes, descanso, exercicioID: exercicioSelecionado });
  };

  return (
    isOpen && (
      <div className="popup-overlay" onClick={togglePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={togglePopup}>
            &times;
          </button>

          <div className="cadastrar-aluno-container">
            <form className="cadastrar-aluno-form" onSubmit={handleSubmit}>
              <h2>Cadastrar Exercício Detalhado</h2>

              <select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                className="form-select"
              >
                <option value="">Selecione uma categoria</option>
                {categoria.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="form-select-option"
                  >
                    {cat.categoria}
                  </option>
                ))}
              </select>

              <select
                value={exercicioSelecionado}
                onChange={(e) => setExercicioSelecionado(e.target.value)}
                className="form-select"
              >
                <option value="">Selecione um exercício</option>
                {categoria
                  .find((cat) => cat.id === categoriaSelecionada)
                  ?.exercicios.map((ex) => (
                    <option
                      key={ex.id}
                      value={ex.id}
                      className="form-select-option"
                    >
                      {ex.nome_exercicio}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                className="form-input-number"
                placeholder="Repetições"
                value={repeticoes}
                onChange={(e) => setRepeticoes(e.target.value)}
                required
              />

              <input
                type="number"
                className="form-input-number"
                placeholder="Descanso (segundos)"
                value={descanso}
                onChange={(e) => setDescanso(e.target.value)}
                required
              />



              <button type="submit" className="form-button">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default PopupCadastrarExercicioDetalhado;
