import { useEffect, useCallback, useRef } from "react";
import { ListOfGifs } from "../components/ListOfGifs";
import useGifs from "../customHooks/useGifs";

export default function Home() {
  const { dispatch } = useGifs();
  const elementRef = useRef(document.documentElement);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = elementRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      dispatch({ type: "SET_PAGE" });
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <ListOfGifs />
    </>
  );
}
