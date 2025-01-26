import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPersonal from "../pages/personal/LoginPersonal/LoginPersonal";
import CadastroPersonal from "../pages/personal/CadastroPersonal/CadastroPersonal";

export default function Nautentificado() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<LoginPersonal/>}/>
        <Route path="/cadastro/personal"  element={<CadastroPersonal/>}/>
      </Routes>
    </BrowserRouter>
  )
}