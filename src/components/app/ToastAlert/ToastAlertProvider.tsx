import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { useMediaQuery } from "@mui/material";
import { Id, ToastContainer, TypeOptions } from "react-toastify";
import {
  closeToastAlert as closeDefaultToastAlert,
  showToastAlert as showDefaultToastAlert,
  updateToastAlert as updateDefaultAlert,
  UpdateToastOptions,
  ToastAlertOptions,
  ToastSeverity
} from "../../utils/toast";
import {
  ToastAlertDesktopContainer,
  ToastAlertMobileContainer
} from "./ToastAlertContainer";
import ErrorToastAlertContent from "./ToastAlertContent";
import "./ToastAlert.styles.css";

interface ToastAlertProviderProps {
  children: ReactNode;
}

interface ToastAlertContextProps {
  showToastAlert: typeof showDefaultToastAlert;
  updateToastAlert: (id: Id, options: UpdateToastOptions) => void;
  closeToastAlert: typeof closeDefaultToastAlert;
}

const ToastAlertContext = createContext<ToastAlertContextProps | undefined>(
  undefined
);

export const ToastAlertProvider: React.FC<ToastAlertProviderProps> = ({
  children
}) => {
  // Breakpoint when app toolbar switches to mobile view
  const isMobile = useMediaQuery("(max-width: 900px)");

  const containerType = React.useMemo(() => {
    return isMobile ? "mobile" : "desktop";
  }, [isMobile]);

  const getCurrentContainerId = (type: "mobile" | "desktop") => {
    return `${type}-toast-alert-container`;
  };

  const getToastContent = (
    severity: TypeOptions | "loading",
    message: string,
    title?: string
  ) => {
    if (severity === "error") {
      return <ErrorToastAlertContent title={title} details={message} />;
    }

    return message;
  };

  const showToastAlert = (
    severity: ToastSeverity,
    options: ToastAlertOptions
  ) => {
    return showDefaultToastAlert(severity, {
      ...options,
      containerId: getCurrentContainerId(containerType),
      message:
        typeof options.message === "string"
          ? getToastContent(severity, options.message, options.title)
          : options.message
    });
  };

  const closeToastAlert = (id: Id) => {
    closeDefaultToastAlert(id);
  };

  const updateToastAlert = (id: Id, options: UpdateToastOptions) => {
    updateDefaultAlert(
      id,
      {
        ...options,
        containerId: getCurrentContainerId(containerType),
        message:
          typeof options.message === "string"
            ? getToastContent(options.severity, options.message, options.title)
            : options.message
      },
      containerType
    );
  };

  return (
    <ToastAlertContext.Provider
      value={{ showToastAlert, updateToastAlert, closeToastAlert }}
    >
      {children}
      <ToastAlertDesktopContainer
        containerId={getCurrentContainerId("desktop")}
      />
      <ToastAlertMobileContainer
        containerId={getCurrentContainerId("mobile")}
      />
    </ToastAlertContext.Provider>
  );
};

export const useToastAlert = (): ToastAlertContextProps => {
  const context = useContext(ToastAlertContext);
  if (!context) {
    throw new Error("useToastAlert must be used within a ToastAlertProvider");
  }
  return context;
};
