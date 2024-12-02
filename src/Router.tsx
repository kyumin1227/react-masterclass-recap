import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const base = import.meta.env.BASE_URL;

const Router = createBrowserRouter([
  {
    path: `${base}`,
    element: <App />,
  },
]);

export default Router;
