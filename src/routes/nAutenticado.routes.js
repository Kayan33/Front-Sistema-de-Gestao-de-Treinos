import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPersonal from "../pages/personal/LoginPersonal/LoginPersonal";
import CadastroPersonal from "../pages/personal/CadastroPersonal/CadastroPersonal";
import EsqueciSenha from "../pages/personal/EsqueciSenha/EsqueciSenha";
import TrocaSenha from "../pages/personal/TrocaSenha/TrocaSenha";
import LoginAluno from "../pages/Aluno/Login/Login";
import CadastroAluno from "../pages/Aluno/CadastroAluno/CadastroAluno";
import ConvitePersonal from "../components/Aluno/ConvitePersonal/ConvitePersonal";
import DashboardAluno from "../pages/Aluno/DashboardAluno/DashboardAluno";
import PaginaPrincipal from "../pages/header/PaginaPrincipal";

export default function Nautentificado() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/personal"  element={<LoginPersonal/>}/>
        <Route path="/cadastro/personal"  element={<CadastroPersonal/>}/>
        <Route path="/resetar-senha"  element={<EsqueciSenha/>}/>
        <Route path="/Troca-senha/:token"  element={<TrocaSenha/>}/>

        {/* ALUNO */}

        <Route path="/login/aluno" element={<LoginAluno/>}/>
        <Route path="/cadastro/aluno" element={<CadastroAluno/>}/>

        <Route path="/convite" element={<ConvitePersonal/>}/>
        <Route path="/dashboard/aluno" element={<DashboardAluno/>}/>

        <Route path="/" element={<PaginaPrincipal/>}/>
      </Routes>
    </BrowserRouter>
  )
}