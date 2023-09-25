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
    <div className="flex flex-col items-center rounded bg-blue-500 p-5 w-10/12 sm:w-1/2 ">
      <p className="mb-5">¿Como estas hoy?</p>
      <textarea ref={ref} className="rounded w-10/12 h-24 p-2"></textarea>
      <button onClick={handleUpdate} className="mt-5 bg-white p-2 rounded">
        Actualizar
      </button>
    </div>
  );
}
