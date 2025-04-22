import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import {
  loggedInRoutes,
  loggedOutRoutes,
  NotFoundPage,
  publicRoutes
} from "./groupedRoutes";
import ErrorBoundary from "../pages/errors/ErrorBoundary";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <Routes>
      {publicRoutes}
      {isAuthenticated && loggedInRoutes}
      {!isAuthenticated && loggedOutRoutes}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const AppRouter = () => {
  const { authorized: isAuthenticated } = useAuth();

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/*"
            element={<AppRoutes isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
