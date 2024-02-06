import { useRef } from "react";
import { updateDB, getOne } from "../DB/bdFunctions";

export default function UpdateForm({ setShow }) {
  const ref = useRef(null);
  const handleUpdate = async () => {
    const usuario = JSON.parse(localStorage.getItem("user") || "[]");
    const myUser = await getOne(usuario.username);
    myUser[0].bio = ref.current.value || null;

    await updateDB("users", myUser[0]);
    setShow(false);
  };
  return (
    <div className="flex flex-col items-center rounded bg-violet-500 p-5 w-10/12 sm:w-1/2 ">
      <p className="mb-5 text-2xl font-bold text-white">¿Como estas hoy?</p>
      <textarea
        ref={ref}
        className="rounded w-10/12 h-24 p-2 outline-none bg-white text-violet"
      ></textarea>
      <button
        onClick={handleUpdate}
        className=" mt-10 bg-white p-3 rounded text-violet-800 font-bold hover:bg-violet-800 hover:text-white transicion duration-300 ease-in-out"
      >
        Actualizar
      </button>
    </div>
  );
}
