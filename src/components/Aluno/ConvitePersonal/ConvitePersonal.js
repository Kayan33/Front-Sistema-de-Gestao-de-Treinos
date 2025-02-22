import { useContext, useEffect, useState } from "react";
import { ConviteApi } from "../../../api/conviteApi";
import "./ConvitePersonal.css";
import { AutenticadoContexto } from "../../../context/authContexts";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";

const ConvitePersonalPopup = () => {
  const [loading, setLoading] = useState(true);
  const [dadosConvites, setDadosConvites] = useState(null);
  const [popupAberto, setPopupAberto] = useState(true); // Estado para controlar se o popup está aberto
  const { VerificaTokenAluno, token } = useContext(AutenticadoContexto);
  const navigate = useNavigate();

  VerificaTokenAluno();

  const ID = JSON.parse(localStorage.getItem("@idaluno"));

  const ListaConvitesPendentes = async () => {
    try {
      const resposta = await ConviteApi.ListaConvitesPendentes(ID);
      setDadosConvites(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar convites:", error);
    } finally {
      setLoading(false);
    }
  };

  const AceitaConvite = async (id) => {
    try {
      await ConviteApi.AceitaConvite(id);
      setDadosConvites((prevConvites) => prevConvites.filter((convite) => convite.id !== id));
      setPopupAberto(false); // Fecha o popup imediatamente ao aceitar
      navigate("/dashboard/aluno");
    } catch (error) {
      console.error("Erro ao aceitar convite:", error);
    } finally {
      setLoading(false);
    }
  };

  const RejeitarConvite = async (id) => {
    try {
      await ConviteApi.RejeitaConvite(id);
      setDadosConvites((prevConvites) => prevConvites.filter((convite) => convite.id !== id));

      // Verifica se não há mais convites pendentes, e então fecha o popup
      if (dadosConvites.length === 1) {
        setPopupAberto(false);
      }
    } catch (error) {
      console.error("Erro ao rejeitar convite:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ListaConvitesPendentes();
  }, [ID, token]);

  if (!popupAberto) {
    return null; // Se o popup estiver fechado, não exibe nada
  }

  return (
    <div className="container-convite">
      <div className="convite-container">
        <h2 className="convite-titulo">Convites do Personal</h2>
        <p className="convite-mensagem">Você tem convites pendentes de personal trainers.</p>
        <p className="convite-mensagem-atencao">* Caso tenha mais de um personal pendente terá que escolher apenas 1</p>

        <Loading loading={loading} /> 

        {dadosConvites && dadosConvites.length > 0 ? (
          dadosConvites.map((convite) => (
            <div key={convite.id} className="convite-item">
              <h3>{convite.personal.nome}</h3>
              <p><strong>Email:</strong> {convite.personal.email}</p>
              <p><strong>Telefone:</strong> {convite.personal.telefone}</p>
              <p><strong>CREF:</strong> {convite.personal.CREF}</p>
              <div className="convite-botoes">
                <button className="botao aceitar" onClick={() => AceitaConvite(convite.id)}>Aceitar</button>
                <button className="botao recusar" onClick={() => RejeitarConvite(convite.id)}>Recusar</button>
              </div>
            </div>
          ))
        ) : (
          <p>Você não tem convites pendentes.</p>
        )}
      </div>
    </div>
  );
};

export default ConvitePersonalPopup;
