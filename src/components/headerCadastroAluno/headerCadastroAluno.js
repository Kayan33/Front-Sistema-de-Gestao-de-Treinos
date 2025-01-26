import { useState } from "react";
import Popup from "../popupConectaAluno/popupConectaAluno";
import { Personalapi } from '../../api/personalApi';
import './headerCadastroAluno.css'; 

const HeaderCadastroAluno = ({ onAlunoCadastrado }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [aluno, setAluno] = useState('');

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const Iid = localStorage.getItem('@id');
  const ID = JSON.parse(Iid);

  const enviarAlteracao = async (e) => {
    e.preventDefault();
    try {
      await Personalapi.alteracao(ID);
      setAluno('');
      onAlunoCadastrado();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="personal-header">
      <h1>Bem-vindo</h1>
      <p className="personal-header-descript">Cadastre alunos</p>
      <button onClick={togglePopup} className="register-link">
        Cadastrar Aluno
      </button>

      <Popup
        isOpen={isPopupOpen}
        togglePopup={togglePopup}
        onSubmit={enviarAlteracao}
        aluno={aluno}
        setAluno={setAluno}
      />
    </section>
  );
};

export default HeaderCadastroAluno;
