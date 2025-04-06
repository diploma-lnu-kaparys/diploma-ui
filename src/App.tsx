import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { publicRoutes } from "./routes/groupedRoutes";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DEFAULT_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "./routes/routes";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            path={DEFAULT_ROUTE}
            element={
              isAuthenticated ? (
                <AppLayout
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  isRegistered={true}
                >
                  <HomePage />
                </AppLayout>
              ) : (
                <Navigate to={SIGNIN_ROUTE} />
              )
            }
          />
          <Route
            path={SIGNIN_ROUTE}
            element={
              <AppLayout
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isRegistered={false}
              >
                <SignInPage onSignInComplete={() => setIsAuthenticated(true)} />
              </AppLayout>
            }
          />
          <Route
            path={SIGNUP_ROUTE}
            element={
              <AppLayout
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isRegistered={false}
              >
                <SignUpPage />
              </AppLayout>
            }
          />
          {publicRoutes}
          <Route path="*" element={<Navigate to={SIGNIN_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
