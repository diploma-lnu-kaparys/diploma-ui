import React from "react";
import ErrorPage from "./ErrorPage";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import { AxiosError } from "axios";

export interface HttpError extends AxiosError {}

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  FallbackComponent?: React.ComponentType<{
    error?: HttpError | any;
    onReset?: () => void;
  }>;
}

export default function ErrorBoundary({
  children,
  FallbackComponent
}: ErrorBoundaryProps) {
  const location = useLocation();

  const onError = React.useCallback((error: any) => {
    reportError(error);
  }, []);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          resetKeys={[location.pathname]}
          onReset={reset}
          onError={onError}
          FallbackComponent={({ error, resetErrorBoundary }) =>
            FallbackComponent ? (
              <FallbackComponent error={error} onReset={resetErrorBoundary} />
            ) : (
              <ErrorPage error={error} onReset={resetErrorBoundary} />
            )
          }
        >
          {children || <Outlet />}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
