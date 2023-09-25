import { useCallback, useContext, useEffect, useMemo } from "react";
import ContextState from "../assets/context/contextState";
import { Action, Dispatch, State } from "../../types";
const API_URL: string = import.meta.env.VITE_API_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

function useGifs() {
  const { state, dispatch }: { state: State; dispatch: Dispatch<Action> } =
    useContext(ContextState);

  const fetchData = useCallback(() => {
    if (state.loading) return;
    if (state.action == "trending" && state.gifs.length >= 75) return;
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    fetch(
      `${API_URL}${state.action}?api_key=${API_KEY}${
        state.keyword ? `&q=${state.keyword}` : ""
      }${state.page !== 0 ? `&offset=${state.page * 25}` : ""}&limit=25`
    )
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        const { data: responseData } = response;
        const imgObj = responseData.map((gif) => ({
          id: gif.id,
          url: gif.images.fixed_height_small.url,
        }));
        dispatch({
          type: "SET_GIFS",
          payload: imgObj,
        });
      });
  }, [state.action, state.keyword, state.page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => ({ state, dispatch }), [state, dispatch]);
}

export default useGifs;
