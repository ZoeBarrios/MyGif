import { useState } from "react";
import { pushDB, getOne } from "../DB/bdFunctions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validate = (inputValues: any, action: string) => {
  if (inputValues.username === "" || inputValues.password === "") {
    toast.error("Por favor ingrese todos los campos");
    return false;
  }

  if (action === "register") {
    if (inputValues.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (inputValues.password !== inputValues.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }
  }

  return true;
};

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
        <div className="flex flex-col items-center justify-center gap-5 w-11/12 h-1/2 sm:w-1/2">
          <h1 className="text-3xl text-white">Inicia sesion</h1>
          <input
            className="w-full h-8 p-2 border-2 border-gray-200 rounded-md"
            type="text"
            placeholder="Username"
            value={inputValues.username}
            name="username"
            onChange={handleChange}
          />
          <input
            className="w-full h-8 p-2 border-2 border-gray-200 rounded-md"
            type="password"
            placeholder="Password"
            value={inputValues.password}
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />
          <button
            className="w-full h-8 mt-2 text-center text-white bg-blue-500 rounded-md"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 w-1/2 h-1/2 w-11/12 h-1/2 sm:w-1/2">
          <h1 className="text-3xl text-white">Registrate</h1>
          <input
            className="w-full h-8 p-2 border-2 border-gray-200 rounded-md"
            type="text"
            placeholder="Username"
            value={inputValues.username}
            onChange={handleChange}
            name="username"
          />
          <input
            className="w-full h-8 p-2 border-2 border-gray-200 rounded-md"
            type="password"
            placeholder="Password"
            value={inputValues.password}
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />

          <input
            className="w-full h-8 p-2 border-2 border-gray-200 rounded-md"
            type="password"
            placeholder="Confirm password"
            value={inputValues.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <button
            className="w-full h-8  mt-2 text-white text-center bg-blue-500 rounded-md"
            type="submit"
            onClick={handleRegister}
          >
            Registrarse
          </button>
        </div>
      )}

      <a onClick={handleClick} className="mt-5 text-white">
        {show ? "Registrate" : "Inicia sesion"}
      </a>
    </form>
  );
}
