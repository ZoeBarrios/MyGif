import { ReactNode } from "react";
import ContextState from "../assets/context/contextState";
import { useReducer } from "react";
import { Action, State } from "../../types";

const initialState = {
  page: 0,
  gifs: [],
  loading: false,
  action: "trending",
  keyword: "",
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "SET_GIFS":
      if (Array.isArray(payload)) {
        return { ...state, ...payload };
      } else {
        return state;
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
      };
    case "SET_ACTION":
      return {
        ...state,
        action: payload,
        keyword: "",
        page: 0,
        gifs: [],
      };
    case "SET_KEYWORD":
      return {
        ...state,
        gifs: [],
        keyword: payload,
        page: 0,
        action: "search",
      };
    case "RESTART":
      if (state.gifs.length > 0)
        return {
          ...state,
          gifs: [],
          page: 0,
          action: "trending",
          keyword: "",
        };
      else return state;
    case "CLEAR_GIFS":
      return {
        ...state,
        gifs: [],
      };

    default:
      return state;
  }
};

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextState.Provider value={{ state, dispatch }}>
      {children}
    </ContextState.Provider>
  );
}
