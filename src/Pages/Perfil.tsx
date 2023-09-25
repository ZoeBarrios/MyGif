import Biografia from "../components/Biografia";
import { ListOfFavorites } from "../components/ListOfFavorites";

export default function Perfil() {
  return (
    <div className="mt-52 text-white w-full flex flex-col items-center">
      <Biografia />
      <h1 className="text-4xl my-5 font-semibold">Mis gif favoritos</h1>
      <ListOfFavorites />
    </div>
  );
}
