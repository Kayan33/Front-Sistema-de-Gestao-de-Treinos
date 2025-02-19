import { Link } from "react-router-dom";
import './NotFound.css';  // Importando o arquivo CSS

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>Oops! Página Não Encontrada</h1>
            <p>Desculpe, não conseguimos encontrar a página que você está procurando.</p>
            <p>
                Você pode voltar para a <Link to="/">página inicial</Link>.
            </p>
        </div>
    );
}
