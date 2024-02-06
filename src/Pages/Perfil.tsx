import Biografia from "../components/Biografia";
import { ListOfFavorites } from "../components/ListOfFavorites";

export default function Perfil() {
  return (
    <div className="mt-52 text-white w-full flex flex-col items-center min-h-screen">
      <Biografia />
      <ListOfFavorites />
    </div>
  );
}
