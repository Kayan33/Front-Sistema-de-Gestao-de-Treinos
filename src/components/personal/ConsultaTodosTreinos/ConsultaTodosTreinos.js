import React, { useState, useEffect, useContext } from "react";
import { AutenticadoContexto } from "../../../context/authContexts";
import { Personalapi } from "../../../api/personalApi";
import "./ConsultaTodosTreinos.css";
import "../../../style/classes.css";
import Loading from "../../../components/Loading/Loading";

const ConsultaTodosTreinos = ({ setAbrir }) => {
  const [dadosTreino, setDadosTreino] = useState([]);
  const [loading, setLoading] = useState(true);
  const { verificarToken, token } = useContext(AutenticadoContexto);

  verificarToken();

  const Iid = localStorage.getItem("@id");
  const ID = Iid ? JSON.parse(Iid) : null;

  async function consultarDadosTreino() {
    try {
      if (!ID || !token) {
        console.error("ID ou token inválidos.");
        return;
      }

      const resposta = await Personalapi.consultaUnica(ID, token);
      setDadosTreino(resposta.data?.[0]?.treino || []);
    } catch (erro) {
      console.error("Erro ao consultar treinos:", erro);
      setDadosTreino([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    consultarDadosTreino();
  }, []);

  return (
    <>
      <button
        onClick={() => setAbrir(false)}
        className="BTN-link-redirecionamento"
      >
        Voltar
      </button>
      <h3>Todos os Treinos</h3>

      <Loading loading={loading} /> 

      <div className="container-aluno-unico-lista-treino">
        {!loading && ( 
          dadosTreino.length > 0 ? (
            dadosTreino.map((treino) => (
              <div className="container-aluno-unico-treino" key={treino.id}>
                <div className="container-treino-nome">
                  <h1>{treino.nome_treino}</h1>
                  <button className="BTN-adiciona">+</button>
                </div>
              </div>
            ))
          ) : (
            <p className="msg-nenhum-exercicio">Nenhum treino encontrado.</p>
          )
        )}
      </div>
    </>
  );
};

export default ConsultaTodosTreinos;
