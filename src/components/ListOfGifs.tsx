/* eslint-disable @typescript-eslint/ban-ts-comment */
import { memo, useContext } from "react";
//@ts-ignore
import { Gif } from "../types/Gif";
import GifComponent from "./GifComponent";
import ContextState from "../assets/context/contextState";
import { State } from "../../types";

function ListOfGifsComponent() {
  const { state }: { state: State } = useContext(ContextState);

  return (
    <div className="mt-52 componentes-container sm:mt-40">
      {state.gifs
        ? state.gifs.map((gif: Gif) => {
            return (
              <GifComponent
                id={gif.id}
                url={gif.url}
                key={gif.id}
                children={""}
              />
            );
          })
        : null}
    </div>
  );
}

export const ListOfGifs = memo(ListOfGifsComponent);
