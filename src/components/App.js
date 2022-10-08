import MoviesPage from "./MoviesPage";
import GlobalStyle from "../assets/css/GlobalStyle";
import ShowTimePage from "./ShowTimePage";
import SeatsPage from "./SeatsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SucessPage from "./SucessPage";
import { useState } from "react";

export default function App() {
  const [sucessData, setSucessData] = useState({
    title: "",
    date: "",
    time: "",
    name: "",
    seats: [],
    cpf: "",
  });

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/sessoes/:idFilme" element={<ShowTimePage />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <SeatsPage sucessData={sucessData} setSucessData={setSucessData} />
          }
        />
        <Route
          path="/sucesso"
          element={<SucessPage sucessData={sucessData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
