import { Navigate, Route } from "react-router-dom";
import { HttpError } from "found";
import {
  TERMS_ROUTE,
  PRIVACY_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  DEFAULT_ROUTE
} from "./routes";
import SignUpPage from "../pages/SignUpPage";
import ErrorPage from "../pages/errors/ErrorPage";
import LoginRoute from "./auth/login/LoginRoute";
import HomeRoute from "./default/HomeRoute";

export const NotFoundPage = () => {
  return <ErrorPage error={new HttpError(404)} />;
};

export const AccessDeniedPage = () => {
  return <ErrorPage error={new HttpError(403)} />;
};

export const loggedInRoutes = () => (
  <>
    <Route path={DEFAULT_ROUTE} element={<HomeRoute />} />
  </>
);

export const loggedOutRoutes = () => (
  <>
    <Route path={LOGIN_ROUTE} element={<LoginRoute />} />
    <Route path={SIGNUP_ROUTE} element={<SignUpPage />} />
  </>
);

export const publicRoutes = (
  <>
    <Route path={TERMS_ROUTE} element={<>TERMS_ROUTE</>} />
    <Route path={PRIVACY_ROUTE} element={<>PRIVACY_ROUTE</>} />
  </>
);
