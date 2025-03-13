import { useEffect, useState } from "react";
import "./TreinoConcluido.css";
import { useNavigate } from "react-router-dom";

export default function TreinoConcluido() {
  const [cargasUtilizadas, setCargasUtilizadas] = useState(null);

  const navigate = useNavigate

  useEffect(() => {
    const IcargasUtilizadas = localStorage.getItem("cargasUtilizadas");
    const cargas = IcargasUtilizadas ? JSON.parse(IcargasUtilizadas) : null;
    setCargasUtilizadas(cargas);
  }, []);

  function CadastrarHistorico() {
    try {
        navigate("/dashboard/aluno")
    } catch (error) {
        
    }
  }

  return (
    <div className="container-Treino-concluido">

    
    <div className="conteudo-treino">
      <h1 className="titulo-treino-concluido">Parabéns, treino concluído!</h1>
      <p className="mensagem-motivacional">Você está indo muito bem, continue assim!</p>

      <div className="historico-treino">
        <h2>Histórico do Treino</h2>
        {cargasUtilizadas && cargasUtilizadas.length > 0 ? (
          <ul className="lista-treino">
            {cargasUtilizadas.map((item, index) => (
              <li key={index} className="item-historico">
                <div className="detalhes-carga">
                <div className="info-treino">
                    <span className="icone-treino">🏋️‍♂️</span>
                    <p><strong>Treino:</strong> {item.NomeTreino}</p>
                  </div>
                  <div className="info-treino">
                    <span className="icone-treino">🏋️‍♂️</span>
                    <p><strong>Exercicio:</strong> {item.NomeExercicio}</p>
                  </div>
                  <div className="info-carga">
                    <span className="icone-carga">⚡</span>
                    <p><strong>Carga Usada:</strong> {item.carga}kg</p>
                  </div>
                  <div className="info-carga-sugerida">
                    <span className="icone-carga-sugerida">📊</span>
                    <p><strong>Carga Sugerida:</strong> {item.CargaSugerida}kg</p>
                  </div>
                  <div className="info-categoria">
                    <span className="icone-categoria">🏅</span>
                    <p><strong>Categoria:</strong> {item.NomeCategoria}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há cargas registradas.</p>
        )}
      </div>

      <div className="botao-historico">
        <button className="btn-enviar-historico" onClick={(e)=>CadastrarHistorico()}>Enviar Histórico</button>
      </div>
    </div>
    </div>
  );
}
