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
    <div className="p-10 text-white w-full flex flex-col md:flex-row justify-center items-center min-h-screen mt-20">
      <div className="flex-1 flex items-center justify-center flex-col">
        <img
          src={details?.images.original.url}
          className="max-h-96 pt-5 pb-5 rounded mt-20 md:mt-auto w-9/12"
          alt={details?.title}
        />
        <h1 className="text-center">{details?.title}</h1>
        <p className="text-center">{details?.user?.display_name || null}</p>
      </div>

      <div className="flex flex-col items-center justify-between w-9/12 gap-4 flex-1">
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
