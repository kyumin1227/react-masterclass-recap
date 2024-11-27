import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coin from "./pages/coin";
import Coins from "./pages/coins";

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
