import { useState } from "react";
import { pushDB, getOne } from "../DB/bdFunctions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validate } from "../utils/functions";

export default function Form() {
  const [show, setShow] = useState(true);
  const navi = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate(inputValues, "login")) return;

    //OBTENEMOS EL USUARIO Y VALIDAMOS QUE EXISTA
    const user = await getOne(inputValues.username);

    if (Array.isArray(user) && user.length === 0)
      return toast.error("El usuario no existe");

    if (user[0].password !== inputValues.password)
      return toast.error("Contraseña incorrecta");
    else localStorage.setItem("user", JSON.stringify(user[0]));

    navi("/perfil");
  };

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate(inputValues, "register")) return;
    const user = await getOne(inputValues.username);
    if (Array.isArray(user) && user.length > 0)
      return toast.error("El usuario ya existe");
    pushDB("users", {
      username: inputValues.username,
      password: inputValues.password,
      avatar: null,
      bio: null,
      favorites: [],
    });
    handleClick();
  };
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="flex flex-col items-center justify-center w-full h-full">
      {show ? (
        <div className="flex flex-col items-center justify-center gap-5 w-full md:w-9/12">
          <h1 className="text-3xl text-white font-bold">Inicia sesion</h1>
          <input
            className="input"
            type="text"
            placeholder="Nombre de usuario"
            value={inputValues.username}
            name="username"
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={inputValues.password}
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />
          <button className="button-submit" type="submit" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 w-full md:w-9/12">
          <h1 className="text-3xl text-white font-bold">Registrate</h1>
          <input
            className="input"
            type="text"
            placeholder="Nombre de usuario"
            value={inputValues.username}
            onChange={handleChange}
            name="username"
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={inputValues.password}
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />

          <input
            className="input"
            type="password"
            placeholder="Confirma la contraseña"
            value={inputValues.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <button
            className="button-submit"
            type="submit"
            onClick={handleRegister}
          >
            Registrarse
          </button>
        </div>
      )}

      <a onClick={handleClick} className="mt-5 text-white cursor-pointer">
        {show
          ? "¿No tienes una cuenta? Registrate"
          : "¿Ya tienes una cuenta? Inicia sesion"}
      </a>
    </form>
  );
}
