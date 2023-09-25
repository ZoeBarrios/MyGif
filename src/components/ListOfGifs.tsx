import { memo, useContext } from "react";
import { Gif } from "../types/Gif";
import GifComponent from "./GifComponent";
import ContextState from "../assets/context/contextState";

function ListOfGifsComponent() {
  const { state } = useContext(ContextState);
  return (
    <div className="mt-52 componentes-container sm:mt-40">
      {state.gifs
        ? state.gifs.map((gif: Gif) => {
            return <GifComponent id={gif.id} url={gif.url} key={gif.id} />;
          })
        : null}
    </div>
  );
}

export const ListOfGifs = memo(ListOfGifsComponent);
