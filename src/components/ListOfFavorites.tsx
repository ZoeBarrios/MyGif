import GifComponent from "./GifComponent";
import { updateDB, getOne } from "../DB/bdFunctions";
import { useEffect, useState } from "react";
import { Gif } from "../../types";

export const ListOfFavorites = () => {
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  const [gifs, setGifs] = useState([]);

  const deleteFavorite = async (id: string) => {
    const myUser = await getOne(user.username);
    myUser[0].favorites = myUser[0].favorites.filter(
      (gif: Gif) => gif.id !== id
    );

    await updateDB("users", myUser[0]);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const myUser = await getOne(user.username);
      setGifs(myUser[0].favorites);
    };
    fetchFavorites();
  });
  return (
    <section className="w-full text-center mt-10 bg-violet-500 px-5 min-h-screen">
      <h1 className="text-4xl my-5 font-bold text-white">Mis gif favoritos</h1>
      <div className="componentes-container">
        {gifs.length != 0 ? (
          gifs.map((gif: Gif) => {
            return (
              <GifComponent id={gif.id} url={gif.url} key={gif.id}>
                <button
                  onClick={() => deleteFavorite(gif.id)}
                  className="boton absolute top-2 w-11/12 left-2/4 transform -translate-x-2/4 "
                >
                  Eliminar de favoritos
                </button>
              </GifComponent>
            );
          })
        ) : (
          <h1
            className=" text-center m-auto font-semibold text-3xl text-violet-800"
            style={{ columnSpan: "all" }}
          >
            Todavía no tienes gifs favoritos...
          </h1>
        )}
      </div>
    </section>
  );
};
