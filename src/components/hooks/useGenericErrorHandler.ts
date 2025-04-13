import React from "react";
import { Id } from "react-toastify";
import {
  BadRequestError,
  ErrorWithStatus,
  isBadRequestError,
  isErrorWithStatus
} from "../utils/errors";
import { SOMETHING_WENT_WRONG } from "../../constants";
import { useToastAlert } from "../app/ToastAlert/ToastAlertProvider";

export const getErrorMessage = (error: ErrorWithStatus) => {
  if (isBadRequestError(error)) {
    return (error as BadRequestError).errors;
  } else {
    return error.trace?.error || error.title;
  }
};

interface GenericErrorHandlerProps {
  disableDefaultSnackbar?: boolean;
  disableBadRequestSnackbar?: boolean;
  setFieldError?: (field: string, message: string) => void;
}

export const getErrorHandlerModel = (error: any): GenericErrorHandlerModel => {
  if (isErrorWithStatus(error.response) && error.response?.status === 401) {
    return "Axios";
  } else if (isErrorWithStatus(error.response)) {
    return "Generic";
  } else {
    return "Generic";
  }
};

export type GenericErrorHandlerModel = "Axios" | "Generic";

export function useGenericErrorHandler({
  disableDefaultSnackbar = false,
  disableBadRequestSnackbar = true,
  setFieldError
}: GenericErrorHandlerProps) {
  const handleToastMessage = (message: string, toastId?: Id) => {
    if (toastId) {
      return updateToastAlert(toastId, {
        message,
        severity: "error"
      });
    }
    return showToastAlert("error", {
      message
    });
  };

  const handlerResolvers: Record<
    GenericErrorHandlerModel,
    (error: any, toastId?: Id) => void
  > = {
    Axios: (_error: any) => {
      /*NOTE: Ignore error that should be handled by axios*/
    },
    Generic: (error: any, toastId?: Id) => {
      const message = getErrorMessage(error.response);
      let snackBarMessage = null;
      if (message instanceof Object) {
        Object.entries(message).forEach(([field, messages]) => {
          const fieldName = field[0].toLowerCase() + field.slice(1);
          setFieldError && setFieldError(fieldName, messages[0]);
          snackBarMessage = messages[0];
        });
      } else {
        snackBarMessage = message;
      }

      // always update alert if toastId is provided, since it may be used for custom loading
      if (toastId) {
        handleToastMessage(snackBarMessage || SOMETHING_WENT_WRONG, toastId);
        return;
      }

      if (disableDefaultSnackbar) return;
      else if (disableBadRequestSnackbar && isBadRequestError(error.response)) {
        return;
      }

      handleToastMessage(snackBarMessage || SOMETHING_WENT_WRONG, toastId);
    }
  };

  const { showToastAlert, updateToastAlert } = useToastAlert();

  return React.useCallback(
    (
      error: any,
      _variables?: any,
      _context?: any,
      toastId?: Id | undefined
    ) => {
      const handler = getErrorHandlerModel(error);
      handler && handlerResolvers[handler](error, toastId);

      reportError(error);
    },
    [disableDefaultSnackbar, disableBadRequestSnackbar]
  );
}
