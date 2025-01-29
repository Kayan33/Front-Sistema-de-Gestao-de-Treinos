import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/personal/ListaAlunos/ListaAlunos";
import AlunoUnico from "../pages/personal/AlunoUnico/AlunoUnico";


export default function Autentificado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal/>}/>
        <Route path="/" element={<DashBoardPersonal/>}/>
        <Route path="/cliente/lista" element={<ListaAlunos/>}/>
        <Route path="/cliente/:aluno" element={<AlunoUnico/>}/>
      </Routes>
    </BrowserRouter>
  )
}