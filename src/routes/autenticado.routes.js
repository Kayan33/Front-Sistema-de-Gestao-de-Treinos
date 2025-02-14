import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/personal/ListaAlunos/ListaAlunos";
import AlunoUnico from "../pages/personal/AlunoUnico/AlunoUnico";
import TodosTreinos from "../components/personal/ConsultaTodosTreinos/ConsultaTodosTreinos";
import Categoria from "../pages/personal/Categoria/Categoria";
import Exercicio from "../pages/personal/Exercicio/Exercicio";
import Loading from "../components/Loading/Loading";

function RotasComLoading() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula um tempo de carregamento

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Ativa o Loading ao trocar de rota

  return (
    <>
      {loading && <Loading loading={loading} />}
      <Routes>
        <Route path="/" element={<DashBoardPersonal />} />
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/cliente/lista" element={<ListaAlunos />} />
        <Route path="/cliente/:aluno" element={<AlunoUnico />} />
        <Route path="/Todos/treino" element={<TodosTreinos />} />
        <Route path="/Exercicios/:categoriaID" element={<Exercicio />} />
      </Routes>
    </>
  );
}

export default function Autentificado() {
  return (
    <BrowserRouter>
      <RotasComLoading />
    </BrowserRouter>
  );
}
