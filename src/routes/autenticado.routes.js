import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPersonal from "../pages/personal/DashBoardPersonal/DashBoardPersonal";

export default function Autentificado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DashBoardPersonal" element={<DashBoardPersonal/>}/>
        <Route path="/" element={<DashBoardPersonal/>}/>
      </Routes>
    </BrowserRouter>
  )
}