import { useContext, useEffect, useState } from "react";
import Header from "../../../components/personal/header/header";
import { AutenticadoContexto } from "../../../context/authContexts";
import { CategoriaApi } from "../../../api/CategoriaApi";
import { Link } from "react-router-dom";
import "./Categoria.css";
import { useBusca } from "../../../hook/useBusca/useBusca";
import Loading from "../../../components/Loading/Loading";  

export default function Categoria() {
  const [categoria, setCategoria] = useState([]);
  const { listaFiltrada, termoBusca, setTermoBusca } = useBusca(categoria, ["categoria",]);
  const [loading, setLoading] = useState(true);  

  const { verificarToken, token } = useContext(AutenticadoContexto);
  verificarToken();

  useEffect(() => {
    consultaCategoria();
  }, []);

  async function consultaCategoria() {
    try {
      const resposta = await CategoriaApi.consulta();
      setCategoria(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    } finally {
      setLoading(false);  
    }
  }


  return (
    <div className="dashboard-personal-container">
      <Header />
      <Loading loading={loading} /> 
      <div className="container-lista-aluno">
        <form className="form-busca-aluno">
          <input
            type="text"
            className="input-busca-aluno"
            placeholder="Peito, Ombro, Costas"
            required
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </form>
        
        <div className="constainer-Link-categoria">
          {listaFiltrada.length > 0 ? (
            listaFiltrada.map((cat) => (
              <Link
                key={cat.id}
                className="Link-categoria"
                to={`/Exercicios/${cat.id}`}
              >
                <h3 className="Link-categoria-h3">{cat.categoria}</h3>
              </Link>
            ))
          ) : (
            <p className="msg-nenhum-exercicio">Sem categoria cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
