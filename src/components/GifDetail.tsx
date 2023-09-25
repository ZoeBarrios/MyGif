import { useParams } from "react-router-dom";
import useDetails from "../customHooks/useDetails";
import ShareCard from "./ShareCard";
import { useState } from "react";
import { updateDB, getOne } from "../DB/bdFunctions";
import { toast } from "react-toastify";

type Params = {
  id: string;
};

export default function MyGif() {
  const { id } = useParams<string>();
  const { details } = useDetails({ id: id ?? "defaultId" });
  const [isShareMenuOpen, setShareMenuOpen] = useState(false);
  const saveUser = JSON.parse(localStorage.getItem("user") || "[]");

  const addFavoriteGif = async () => {
    if (saveUser == "[]") {
      toast.error("Debes estar logueado para añadir a favoritos");
      return;
    }

    const myUser = await getOne(saveUser.username);
    if (myUser[0].favorites.find((fav: Params) => fav.id == id) != undefined) {
      toast.error("Ya tienes este gif en favoritos");
      return;
    }

    myUser[0].favorites.push({
      id,
      title: details?.title,
      url: details?.images.original.url,
      username: details?.user?.display_name || null,
    });
    toast.success("Gif añadido a favoritos");

    await updateDB("users", myUser[0]);

    return;
  };

  const setAvatar = async () => {
    if (saveUser == "[]") {
      toast.error("Debes estar logueado para añadir a favoritos");
      return;
    }

    const myUser = await getOne(saveUser.username);
    myUser[0].avatar = details?.images.original.url;

    updateDB("users", myUser[0]);
    toast.success("Avatar actualizado");
  };

  return (
    <div className="text-white w-full flex flex-col justify-center items-center h-screen mt-40">
      <h1 className="mb-5">{details?.title}</h1>
      <img
        src={details?.images.original.url}
        className="max-h-96"
        alt={details?.title}
      />

      <p>{details?.user?.display_name || null}</p>
      <div className="flex flex-col items-center justify-between  w-9/12 mt-16 sm:flex-row sm:gap-4 ">
        <button onClick={addFavoriteGif} className="boton">
          Favorite
        </button>
        <button
          onClick={() => setShareMenuOpen(!isShareMenuOpen)}
          className="boton"
        >
          Share
        </button>
        {isShareMenuOpen && <ShareCard url={details.images.original.url} />}
        <button onClick={setAvatar} className="boton">
          Set as avatar
        </button>
      </div>
    </div>
  );
}
