import SearchBar from "./SearchBar";
import MyPerfil from "./MyPerfil";
import { useContext } from "react";
import ContextState from "../assets/context/contextState";
import PopularTerm from "./PopularTerm";

import { useNavigate } from "react-router-dom";
import { Action } from "../../types";

type Dispatch<A> = (action: A) => A;

export default function Navbar() {
  const { dispatch }: { dispatch: Dispatch<Action> } = useContext(ContextState);
  const navi = useNavigate();
  const handleClick = (e: MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    if (clickedElement) {
      dispatch({
        type: "SET_KEYWORD",
        payload: clickedElement.innerText,
      });
      navi("/");
    }
  };
  return (
    <div className="navbar">
      <section className="flex items-center justify-between flex-col w-full sm:flex-row ">
        <div className="flex items-center">
          <button
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: "RESTART",
              });
              navi("/");
            }}
          >
            <img src="/cat.png" alt="logo" className="w-20 h-20" />
            <p className="text-white">MyGif</p>
          </button>
        </div>
        <nav className="flex justify-between w-full">
          <ul className="hidden sm:flex gap-10 mx-auto text-white ">
            <PopularTerm handleClick={handleClick} keyword={"Artist"} />
            <PopularTerm handleClick={handleClick} keyword={"Music"} />
            <PopularTerm handleClick={handleClick} keyword={"Memes"} />
            <PopularTerm handleClick={handleClick} keyword={"Movies"} />
          </ul>
          <MyPerfil></MyPerfil>
        </nav>
      </section>
      <SearchBar />
    </div>
  );
}
