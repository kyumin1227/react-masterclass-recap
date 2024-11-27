import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import Chart from "./pages/Chart";
import Price from "./pages/Price";

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
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default Router;
