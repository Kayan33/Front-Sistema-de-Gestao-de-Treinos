import { Routes, Route, HashRouter } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/personal/ListaAlunos/ListaAlunos";
import AlunoUnico from "../pages/personal/AlunoUnico/AlunoUnico";
import TodosTreinos from "../components/personal/ConsultaTodosTreinos/ConsultaTodosTreinos";
import Categoria from "../pages/personal/Categoria/Categoria";
import Exercicio from "../pages/personal/Exercicio/Exercicio";

export default function Autentificado() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashBoardPersonal />} />
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/cliente/lista" element={<ListaAlunos />} />
        <Route path="/cliente/:aluno" element={<AlunoUnico />} />
        <Route path="/Todos/treino" element={<TodosTreinos />} />
        <Route path="/Exercicios/:categoriaID" element={<Exercicio />} />
      </Routes>
    </HashRouter>
  );
}

