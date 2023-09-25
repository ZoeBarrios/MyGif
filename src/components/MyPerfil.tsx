import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyPerfil() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = localStorage.getItem("user");

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative mx-auto w-11/12 mb-5 sm:m-0 sm:w-auto ">
      <button
        onClick={toggleMenu}
        ref={ref}
        className="p-2 bg-white rounded focus:outline-none w-full sm:w-auto sm:mr-5"
      >
        Mi cuenta
      </button>

      {isMenuOpen ? (
        <div className="menu">
          {user ? (
            <Link
              to="/perfil"
              className="block rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Mi perfil
            </Link>
          ) : null}
          <button onClick={user ? handleLogout : () => {}}>
            <Link
              to={user ? "/perfil" : "/login"}
              className="block rounded w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {user ? "Cerrar sesión" : "Iniciar sesión"}
            </Link>
          </button>
        </div>
      ) : null}
    </div>
  );
}
