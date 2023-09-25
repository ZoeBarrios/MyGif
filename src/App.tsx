import MainRoutes from "./MainRoutes";
import ContextProvider from "./components/ContextProvider";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

function App() {
  return (
    <ContextProvider>
      <MainRoutes />
      <Navbar />
      <Loader />
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
