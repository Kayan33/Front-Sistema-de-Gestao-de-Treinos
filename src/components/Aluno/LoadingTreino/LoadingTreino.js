import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import "./LoadingTreino.css";

const frases = [
    "Prepare-se! O treino está prestes a começar...",
    "Lembre-se de manter a postura correta durante os exercícios!",
    "Respire fundo e se concentre no movimento!",
    "Descanse bem entre os exercícios para manter a energia!"
];

export default function LoadingTreino({ onComplete }) {
    const [indice, setIndice] = useState(0);
    const navigate = useNavigate(); 
    const { treinoID } = useParams();

    useEffect(() => {
        const intervaloTempo = 3000;
        const tempoTotal = intervaloTempo * frases.length;

        const interval = setInterval(() => {
            setIndice((prev) => (prev + 1) % frases.length);
        }, intervaloTempo);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            if (onComplete) onComplete();
            navigate(`/Treino/Iniciado/${treinoID}`); 
        }, tempoTotal);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate, onComplete]);

    return (
        <div className="loading-treino">
            <div className="loading-icon">
                <AiOutlineLoading className="loading-spinner" />
            </div>
            <p className="loading-text">{frases[indice]}</p>
        </div>
    );
}
