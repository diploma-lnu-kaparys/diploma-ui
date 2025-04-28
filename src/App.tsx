import React, { Suspense } from "react";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider
} from "@mui/material";
import { AuthContextProvider } from "./components/hooks/useAuth";
import { createBrowserHistory } from "history";
import AppRouter from "./routes/route";
import { LoadingPage } from "./components/loading/loadingPage";
import ReactQueryClient from "./api/ReactQueryClient";
import { ToastAlertProvider } from "./components/app/ToastAlert/ToastAlertProvider";
import { HistoryContext } from "./components/hooks/useHistory";
import AppLayout from "./components/layout/AppLayout";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import AxiosInterceptor from "./api/AxiosInterceptor";
import { BrowserRouter } from "react-router-dom";

function App() {
  const history = createBrowserHistory();
  const defaultTheme = createTheme();

  return (
    <HistoryContext.Provider value={history}>
      <CssBaseline />
      <ToastAlertProvider>
        <StyledEngineProvider injectFirst>
          <StylesThemeProvider theme={defaultTheme}>
            <ThemeProvider theme={defaultTheme}>
              <Suspense fallback={<LoadingPage />}>
                <ReactQueryClient>
                  <AuthContextProvider>
                    <AxiosInterceptor>
                      <BrowserRouter>
                        <AppLayout>
                          <AppRouter />
                        </AppLayout>
                      </BrowserRouter>
                    </AxiosInterceptor>
                  </AuthContextProvider>
                </ReactQueryClient>
              </Suspense>
            </ThemeProvider>
          </StylesThemeProvider>
        </StyledEngineProvider>
      </ToastAlertProvider>
    </HistoryContext.Provider>
  );
}

export default App;
