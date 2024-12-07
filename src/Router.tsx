import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tv from "./pages/Tv";

const base = import.meta.env.BASE_URL;

const Router = createBrowserRouter([
  {
    path: `${base}`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
    ],
  },
]);

export default Router;
