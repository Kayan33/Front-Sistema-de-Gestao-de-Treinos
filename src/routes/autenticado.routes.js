import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/personal/ListaAlunos/ListaAlunos";
import AlunoUnico from "../pages/personal/AlunoUnico/AlunoUnico";
import TodosTreinos from "../components/personal/ConsultaTodosTreinos/ConsultaTodosTreinos";
import Categoria from "../pages/personal/Categoria/Categoria";
import Exercicio from "../pages/personal/Exercicio/Exercicio";
import NotFound from "../pages/personal/NotFound/NotFound";
import ConvitePersonal from "../components/Aluno/ConvitePersonal/ConvitePersonal";
import DashboardAluno from "../pages/Aluno/DashboardAluno/DashboardAluno";


export default function Autentificado() {
  return (
    <BrowserRouter >
    
      <Routes>
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal/>}/>
        <Route path="/Categoria" element={<Categoria/>}/>
        <Route path="/cliente/lista" element={<ListaAlunos/>}/>
        <Route path="/cliente/:aluno" element={<AlunoUnico/>}/>
        <Route path="Todos/treino" element={<TodosTreinos/>}/>
        <Route path="/Exercicios/:categoriaID" element={<Exercicio/>}/>
        <Route path="/convite" element={<ConvitePersonal/>}/>
        <Route path="/dashboard/aluno" element={<DashboardAluno/>}/>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}