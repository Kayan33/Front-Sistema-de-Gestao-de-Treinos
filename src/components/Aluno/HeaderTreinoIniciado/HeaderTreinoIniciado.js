import "./HeaderTreinoIniciado.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TiStopwatch } from "react-icons/ti";
import { useEffect, useState } from "react";

export default function HeaderTreinoIniciado({ setTempo }) {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);


    const Inome = localStorage.getItem("@nomealuno");
  const nome = Inome ? JSON.parse(Inome) : null;

  const primeiroNome = nome ? nome.split(" ")[0] : "";

  useEffect(() => {
    const cronometro = setInterval(() => {
      setSegundos((prevSegundos) => {
        if (prevSegundos === 59) {
          setMinutos((prevMinutos) => {
            if (prevMinutos === 59) {
              setHoras((prevHoras) => prevHoras + 1);
              return 0;
            }
            return prevMinutos + 1;
          });
          return 0;
        }
        return prevSegundos + 1;
      });
    }, 1000);

    return () => clearInterval(cronometro);
  }, []);

  // 🔹 Agora o tempo vai de fato para o componente pai
  useEffect(() => {
    setTempo({ horas, minutos, segundos });
  }, [horas, minutos, segundos]);

  const formatarTempo = (tempo) => String(tempo).padStart(2, "0");

  return (
    <header className="header-personal">
      <div className="headar-aluno-voltar">
      <h1>Bem-vindo {primeiroNome}</h1>
      </div>

      <div className="navigation-personal">
        <TiStopwatch size={30} />
        <div className="cronometro">
          <div >
            <h3>{formatarTempo(horas)}:</h3>
            <p>h</p>
          </div>
          <div>
            <h3>{formatarTempo(minutos)}:</h3>
            <p>min</p>
          </div>
          <div>
            <h3>{formatarTempo(segundos)}</h3>
            <p>seg</p>
          </div>
        </div>
      </div>
    </header>
  );
}

