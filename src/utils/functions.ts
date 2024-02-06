import { toast } from "react-toastify";

export const validate = (inputValues: any, action: string) => {
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
