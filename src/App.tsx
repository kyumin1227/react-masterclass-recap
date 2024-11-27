import { Outlet } from "react-router-dom";
import "./assets/reset.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Noto Sans", serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
};

export default App;
