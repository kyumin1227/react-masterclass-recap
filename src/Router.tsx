import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Coins />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default Router;
