import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ModalCargaUsada({ isOpen, togglePopup, idExercicio, idTreino }) {
  const [carga, setCarga] = useState("");

  useEffect(() => {
    console.log("Cargas armazenadas:", JSON.parse(localStorage.getItem("cargasUtilizadas") || "[]"));
  }, []);

  const salvarCarga = () => {
    if (!carga) {
      alert("Por favor, insira um valor para a carga.");
      return;
    }
  
    try {
      // Recupera as cargas salvas ou inicializa um array vazio
      let cargasAnteriores = JSON.parse(localStorage.getItem("cargasUtilizadas")) || [];
  
      // Adiciona a nova carga ao array SEM verificar se já existe
      const novaCarga = { idExercicio, idTreino, carga };
      const cargasAtualizadas = [...cargasAnteriores, novaCarga];
  
      // Salva no localStorage
      localStorage.setItem("cargasUtilizadas", JSON.stringify(cargasAtualizadas));
  
      toast.success("Carga salva com sucesso!");
      setCarga("");
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
      alert("Erro ao salvar a carga. Verifique o console.");
    }
  };
  

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <input
            type="number"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
            placeholder="Digite a carga utilizada"
          />
          <button onClick={() => { salvarCarga(); togglePopup(); }}>
            Salvar Carga
          </button>
        </div>
      </div>
    )
  );
}
