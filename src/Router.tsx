import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";

const base = import.meta.env.BASE_URL;

const Router = createBrowserRouter([
  {
    path: `${base}`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Index />,
      },
    ],
  },
]);

export default Router;
