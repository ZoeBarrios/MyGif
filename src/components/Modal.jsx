import { createPortal } from "react-dom";

export default function Modal({ isShow, children, onClose }) {
  return createPortal(
    <div
      className={`${
        isShow ? "block" : "hidden"
      } w-screen h-screen flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 fixed top-0 left-0 transition-all duration-300`}
    >
      <div
        onClick={onClose}
        className="text-3xl text-white w-6/12 text-end font-bold cursor-pointer mb-5"
      >
        <span className="font-bold text-red-500">x</span>
      </div>
      {children}
    </div>,
    document.getElementById("root")
  );
}
