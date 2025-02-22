import './popupConectaAluno.css'; 
const Popup = ({ isOpen, togglePopup, onSubmit, email, setEmail}) => {
    return (
      isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
  
            <div className="cadastrar-aluno-container">
              <form className="cadastrar-aluno-form" onSubmit={onSubmit}>
                <h2>Cadastrar Aluno</h2>
                <div>
                <p>Peça pro aluno:</p>
                <p>*Baixe o app e cadastre-se</p>
                <p>*Aceite a solicitação de treino no app</p>
                </div>
                <div>
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Digite o email do aluno"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
                <button type="submit" className="form-button">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default Popup;
  