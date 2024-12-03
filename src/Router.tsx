import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ToDoList from "./components/ToDoList";

const base = import.meta.env.BASE_URL;

const Router = createBrowserRouter([
  {
    path: `${base}`,
    element: <App />,
    children: [
      {
        path: "",
        element: <ToDoList />,
      },
    ],
  },
]);

export default Router;
