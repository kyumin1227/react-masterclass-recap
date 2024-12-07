import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme } from "./theme";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Noto Sans", serif;
    color: black;
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
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Header />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
