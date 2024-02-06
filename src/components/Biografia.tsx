import { useState, useEffect, useRef } from "react";
import UpdateForm from "./UpdateForm";
import { getOne } from "../DB/bdFunctions";
import Modal from "./Modal";

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
    <section className="p-5 w-full flex flex-col md:flex-row items-center justify-center gap-10">
      <img
        ref={avatar}
        className="rounded-full w-48 md:w-60 md:h-60 border-4 border-white"
      ></img>

      <div className="p-5 text-black bg-white w-8/12 rounded-lg flex flex-col items-start gap-10">
        <h2 className="mt-2 text-2xl font-semibold text-violet-500">
          Biografia
        </h2>
        {show ? null : (
          <p className="w-1/2 h-auto break-words text-xl" ref={bio}></p>
        )}
        {show && (
          <Modal isShow={show} onClose={() => setShow(false)}>
            <UpdateForm setShow={setShow} />
          </Modal>
        )}
        <button
          onClick={() => setShow(true)}
          className="bg-blue-500 px-5 py-2 rounded mb-5 self-center md:self-end boton"
        >
          Actualizar bio
        </button>
      </div>
    </section>
  );
}
