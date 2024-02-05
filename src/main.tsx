/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
//@ts-ignore
import App from "./App.tsx";
import "./styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
