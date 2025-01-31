import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPersonal from "../pages/personal/LoginPersonal/LoginPersonal";
import CadastroPersonal from "../pages/personal/CadastroPersonal/CadastroPersonal";
import EsqueciSenha from "../pages/personal/EsqueciSenha/EsqueciSenha";
import TrocaSenha from "../pages/personal/TrocaSenha/TrocaSenha";

export default function Nautentificado() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<LoginPersonal/>}/>
        <Route path="/cadastro/personal"  element={<CadastroPersonal/>}/>
        <Route path="/resetar-senha"  element={<EsqueciSenha/>}/>
        <Route path="/Troca-senha/:token"  element={<TrocaSenha/>}/>
      </Routes>
    </BrowserRouter>
  )
}