import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";
import ListaAlunos from "../pages/ListaAlunos/ListaAlunos";

export default function Autentificado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal/>}/>
        <Route path="/" element={<DashBoardPersonal/>}/>
        <Route path="/cliente/lista" element={<ListaAlunos/>}/>
      </Routes>
    </BrowserRouter>
  )
}