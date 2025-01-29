import './popupCadastrarTreino.css'; 
const PopupCadastrarTreino = ({ isOpen, togglePopup,nome_treino,setNome_treino,onSubmit}) => {
    return (
      isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
  
            <div className="cadastrar-aluno-container">
              <form className="cadastrar-aluno-form" onSubmit={onSubmit}>
                <h2>Cadastrar Treino</h2>
                <p>*Aceite a solicitação de treino no app</p>

                <input
                  type="name"
                  className="form-input"
                  placeholder="Digite Nome no treino"
                  value={nome_treino}
                  onChange={(e) => setNome_treino(e.target.value)}
                  required
                />
                
                <button type="submit" className="form-button">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default PopupCadastrarTreino;
  