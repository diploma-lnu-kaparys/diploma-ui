import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import { publicRoutes } from "./routes/groupedRoutes";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
                <HomePage />
              </AppLayout>
            }
          />
          {publicRoutes}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
