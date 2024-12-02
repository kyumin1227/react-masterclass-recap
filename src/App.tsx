import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

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
  const isDarkMode = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
