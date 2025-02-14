import { useContext, useEffect, useState } from "react";
import Header from "../../../components/personal/header/header";

import "./ListaAlunos.css";
import { Personalapi } from "../../../api/personalApi";
import { AutenticadoContexto } from "../../../context/authContexts";
import { Link } from "react-router-dom";
import { useBusca } from "../../../hook/useBusca/useBusca";

export default function ListaAlunos() {
  const [dadosAluno, setDadosAluno] = useState({ aluno: [] });

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  // Passando o array direto para o hook de busca
  const { listaFiltrada, termoBusca, setTermoBusca } = useBusca(dadosAluno.aluno, ["nome", "email", "telefone"]);

  const Iid = localStorage.getItem("@id");
  const ID = Iid ? JSON.parse(Iid) : null;

  const consultarDadosUsuarios = async () => {
    try {
      const resposta = await Personalapi.consultaUnica(ID, token);
      setDadosAluno(resposta.data[0] || { aluno: [] });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    consultarDadosUsuarios();
  }, [ID, token]);

  return (
    <div className="dashboard-personal-container">
      <Header />

      <div className="container-lista-aluno">
        <form className="form-busca-aluno">
          <input
            type="text"
            className="input-busca-aluno"
            placeholder="Nome, E-mail, Telefone"
            required
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </form>

        <div className="container-todos-alunos">
          <h2>Lista de Alunos</h2>
          {listaFiltrada.length > 0 ? (
            <ul>
              {listaFiltrada.map((aluno, index) => (
                <li key={index}>
                  <Link className="lista-dados-alunos" to={`/cliente/${aluno.id}`}>
                    <p>{aluno.nome}</p>
                    <p>{aluno.email}</p>
                    <p>{aluno.telefone}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="msg-nenhum-exercicio">Sem alunos cadastrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
