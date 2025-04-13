import React, { useEffect, useState } from "react";
import { ToastContainer, Id } from "react-toastify";
import "./ToastAlert.styles.css";
import clx from "classnames";
import { defaultToastOptions, mobileToastOptions } from "../../utils/toast";

export type ToastAlertContainerType = "mobile" | "desktop";
type ToastAlertContainerProps = {
  containerId: Id;
};

export const ToastAlertDesktopContainer = ({
  containerId
}: ToastAlertContainerProps) => {
  return (
    <ToastContainer
      containerId={containerId}
      limit={3}
      {...defaultToastOptions}
      className={clx("toast", "desktop-toast-container")}
    />
  );
};

export const ToastAlertMobileContainer = ({
  containerId
}: ToastAlertContainerProps) => {
  return (
    <ToastContainer
      containerId={containerId}
      limit={3}
      stacked={true}
      theme="colored"
      {...mobileToastOptions}
      className={clx("toast", "mobile-toast")}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}
      toastStyle={{
        width: "70%",
        borderRadius: "8px",
        padding: "8px"
      }}
    />
  );
};
