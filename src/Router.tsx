import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";

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
        path: "movie/:movieId",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "tv/:tvId",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default Router;
