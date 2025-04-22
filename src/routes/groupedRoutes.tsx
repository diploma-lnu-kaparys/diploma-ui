import React from "react";
import { Navigate, Route } from "react-router-dom";
import { HttpError } from "found";
import {
  TERMS_ROUTE,
  PRIVACY_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  DEFAULT_ROUTE
} from "./routes";
import SignUpRoute from "./auth/signUp/SignUpRoute";
import LoginRoute from "./auth/login/LoginRoute";
import HomeRoute from "./default/HomeRoute";
import ErrorPage from "../pages/errors/ErrorPage";

export const NotFoundPage = () => <ErrorPage error={new HttpError(404)} />;
export const AccessDeniedPage = () => <ErrorPage error={new HttpError(403)} />;

export const loggedOutRoutes = (
  <>
    <Route
      path={DEFAULT_ROUTE}
      element={<Navigate to={LOGIN_ROUTE} replace />}
    />
    <Route path={LOGIN_ROUTE} element={<LoginRoute />} />
    <Route path={SIGNUP_ROUTE} element={<SignUpRoute />} />
  </>
);

export const loggedInRoutes = (
  <>
    <Route
      path={LOGIN_ROUTE}
      element={<Navigate to={DEFAULT_ROUTE} replace />}
    />
    <Route
      path={SIGNUP_ROUTE}
      element={<Navigate to={DEFAULT_ROUTE} replace />}
    />
    <Route path={DEFAULT_ROUTE} element={<HomeRoute />} />
  </>
);

export const publicRoutes = (
  <>
    <Route path={TERMS_ROUTE} element={<>TERMS_ROUTE</>} />
    <Route path={PRIVACY_ROUTE} element={<>PRIVACY_ROUTE</>} />
  </>
);
