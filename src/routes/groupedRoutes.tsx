import React from "react";
import { Route } from "react-router-dom";
import {
  TERMS_ROUTE,
  NOT_FOUND_ROUTE,
  ACCESS_DENIED_ROUTE,
  LOGOUT_ROUTE,
  PRIVACY_ROUTE
} from "./routes";

export const publicRoutes = (
  <>
    <Route path={TERMS_ROUTE} element={<>TERMS_ROUTE</>} />
    <Route path={PRIVACY_ROUTE} element={<>PRIVACY_ROUTE</>} />
    <Route path={NOT_FOUND_ROUTE} element={<>NotFoundPage</>} />
    <Route path={ACCESS_DENIED_ROUTE} element={<>AccessDeniedPage </>} />
  </>
);
