import "../../../style/classes.css";
import "./PopupCadastrarExercicio.css";

const PopupCadastrarExercicio = ({
  isOpen,
  togglePopup,
  onSubmit,
  nome_exercicio,
  setNome_exercicio,
  URL_video,
  setURL_video,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome_exercicio, URL_video });
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
              <h2>Cadastrar Exercício</h2>

              <input
                type="text"
                className="form-input-number"
                placeholder="Nome Exercicio"
                value={nome_exercicio}
                onChange={(e) => setNome_exercicio(e.target.value)}
                required
              />
              <div>
              <p>*Opicional</p>
                <div>
                <input
                  type="text"
                  className="form-input-number"
                  placeholder="URL videio do youtube"
                  value={URL_video}
                  onChange={(e) => setURL_video(e.target.value)}
                  
                />
                </div>
              </div>
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

export default PopupCadastrarExercicio;
