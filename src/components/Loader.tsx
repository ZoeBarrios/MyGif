import { useContext } from "react";
import ContextState from "../assets/context/contextState";
export default function Loader() {
  const { state } = useContext(ContextState);
  return (
    <>
      {state.loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : null}
    </>
  );
}
