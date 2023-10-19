import { useParams } from "react-router-dom";
import useDetails from "../customHooks/useDetails";
import { updateDB, getOne } from "../DB/bdFunctions";
import { toast } from "react-toastify";
import { useCallback } from "react";

type Params = {
  id: string;
};

export default function MyGif() {
  const { id } = useParams<string>();
  const { details } = useDetails({ id: id ?? "defaultId" });
  const saveUser = JSON.parse(localStorage.getItem("user") || "[]");
  const addFavoriteGif = async () => {
    if (saveUser.length == 0) {
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
    if (saveUser.length == 0) {
      toast.error("Debes estar logueado para añadir como avatar");
      return;
    }

    const myUser = await getOne(saveUser.username);
    myUser[0].avatar = details?.images.original.url;

    updateDB("users", myUser[0]);
    toast.success("Avatar actualizado");
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(details?.images.original.url);
    toast.success("Enlace copiado");
  }, [details?.images.original.url]);

  return (
    <div className="text-white w-full flex flex-col justify-center items-center h-screen mt-40">
      <h1 className="mb-5 mt-16 text-center">{details?.title}</h1>
      <img
        src={details?.images.original.url}
        className="max-h-96"
        alt={details?.title}
      />

      <p className="text-center">{details?.user?.display_name || null}</p>
      <div className="flex flex-col items-center justify-between  w-9/12 mt-16 sm:flex-row sm:gap-4 ">
        <button onClick={addFavoriteGif} className="boton">
          Añadir a favoritos
        </button>
        <button onClick={handleCopy} className="boton">
          Copiar al portapapeles
        </button>
        <button onClick={setAvatar} className="boton">
          Añadir como avatar
        </button>
      </div>
    </div>
  );
}
