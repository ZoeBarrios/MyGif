import { useState, useEffect, useRef } from "react";
import UpdateForm from "./UpdateForm";
import { getOne } from "../DB/bdFunctions";

export default function Biografia() {
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  const avatar = useRef(null);
  const bio = useRef(null);

  useEffect(() => {
    async function getInfo() {
      const myUser = await getOne(user.username);

      avatar.current.src =
        myUser[0].avatar == undefined ? "/public/cat.png" : myUser[0].avatar;
      bio.current.textContent =
        myUser[0].bio == undefined ? "No hay biografia" : myUser[0].bio;
    }
    getInfo();
  }, [user]);

  const [show, setShow] = useState(false);

  return (
    <section className="w-full">
      <img
        ref={avatar}
        className="rounded-full w-60 h-60 border-4 border-white mx-auto  mb-5"
      ></img>

      <div className="text-black bg-white w-full rounded flex flex-col items-center gap-10">
        <h2 className="mt-2 text-xl font-semibold">Biografia</h2>
        {show ? null : (
          <p className="w-1/2 text-center h-auto break-words" ref={bio}></p>
        )}
        {show && <UpdateForm setShow={setShow} />}
        <button
          onClick={() => setShow(!show)}
          className="bg-blue-500 px-5 py-2 rounded mb-5"
        >
          {show ? "Cerrar" : "Actualizar bio"}
        </button>
      </div>
    </section>
  );
}
