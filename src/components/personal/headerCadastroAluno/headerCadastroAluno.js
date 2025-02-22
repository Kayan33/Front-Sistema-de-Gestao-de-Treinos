import { useState } from "react";
import Popup from "../popupConectaAluno/popupConectaAluno";
import "./headerCadastroAluno.css";
import { ConviteApi } from "../../../api/conviteApi";

const HeaderCadastroAluno = ({ onAlunoCadastrado }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const Iid = localStorage.getItem("@id");
  const ID = JSON.parse(Iid);

  const EnviarConvite = async (e) => {
    e.preventDefault();
    try {
      await ConviteApi.EnviarConvite(ID,email);
      setEmail("");
      onAlunoCadastrado();
    } catch (err) {}
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
        onSubmit={EnviarConvite}
        email={email}
        setEmail={setEmail}
      />
    </section>
  );
};

export default HeaderCadastroAluno;
