import "./ConvitePersonal.css"

export default function ConvitePersonal() {
    return (
        <div className="convite-container">
            <h2 className="convite-titulo">Convite do Personal</h2>
            <p className="convite-mensagem">Você recebeu um convite do seu personal trainer. Aceitar?</p>
            <div className="convite-botoes">
                <button className="botao aceitar">Aceitar</button>
                <button className="botao recusar">Recusar</button>
            </div>
        </div>
    );
}
