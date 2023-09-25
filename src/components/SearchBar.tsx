import { useContext, useState } from "react";
import ContextState from "../assets/context/contextState";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { dispatch } = useContext(ContextState);
  const navi = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_KEYWORD",
      payload: searchTerm,
    });
    navi("/");
  };
  return (
    <form className="w-11/12 mx-auto " onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
        placeholder="Search for gifs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
