import { createContext, ReactNode, StrictMode, useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, theme } from "./theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const ThemeContext = createContext<{ toggleTheme: () => void; isDarkMode: boolean }>({
  toggleTheme: () => {},
  isDarkMode: true,
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={isDarkMode ? theme : lightTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <RouterProvider router={Router} />
      </CustomThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);

export const useThemeContext = () => useContext(ThemeContext);
