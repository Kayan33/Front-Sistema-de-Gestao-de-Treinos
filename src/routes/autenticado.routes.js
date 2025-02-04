import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/personal/ListaAlunos/ListaAlunos";
import AlunoUnico from "../pages/personal/AlunoUnico/AlunoUnico";
import TodosTreinos from "../components/personal/ConsultaTodosTreinos/ConsultaTodosTreinos";
import Categoria from "../pages/personal/Categoria/Categoria";


export default function Autentificado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal/>}/>
        <Route path="/" element={<DashBoardPersonal/>}/>
        <Route path="/Categoria" element={<Categoria/>}/>
        <Route path="/cliente/lista" element={<ListaAlunos/>}/>
        <Route path="/cliente/:aluno" element={<AlunoUnico/>}/>
        <Route path="Todos/treino" element={<TodosTreinos/>}/>
      </Routes>
    </BrowserRouter>
  )
}