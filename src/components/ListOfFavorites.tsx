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
    <div className="componentes-container">
      {gifs.length != 0 ? (
        gifs.map((gif: Gif) => {
          return (
            <GifComponent id={gif.id} url={gif.url} key={gif.id}>
              <button
                onClick={() => deleteFavorite(gif.id)}
                className="bg-blue-500 px-5 py-2 rounded-md absolute top-2 w-11/12 left-2/4 transform -translate-x-2/4 "
              >
                Eliminar de favoritos
              </button>
            </GifComponent>
          );
        })
      ) : (
        <p className="text-xl col-start-2 text-center col-span-2 w-auto">
          No hay gifs favoritos
        </p>
      )}
    </div>
  );
};
