import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import ContextState from "./assets/context/contextState";
import Home from "./Pages/Home";
import MyGif from "./components/GifDetail";
import Perfil from "./Pages/Perfil";
import Login from "./Pages/Login";
import { Action, Dispatch } from "../types";
export default function MainRoutes() {
  const location = useLocation();
  const { dispatch }: { dispatch: Dispatch<Action> } = useContext(ContextState);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch({ type: "CLEAR_GIFS" });
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gif/:id" element={<MyGif />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
