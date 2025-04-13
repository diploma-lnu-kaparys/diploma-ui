import {
  toast,
  ToastOptions,
  TypeOptions,
  ToastContent,
  Bounce,
  Id
} from "react-toastify";

export type ToastSeverity = keyof typeof toasts;
export type ToastAlertOptions = ToastOptions & {
  message: string | ToastContent;
  title?: string;
};
export type ToastAlertContainerType = "mobile" | "desktop";

export const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: true,
  draggable: true,
  pauseOnHover: true,
  transition: Bounce,
  isLoading: false
};

export const mobileToastOptions: ToastOptions = {
  ...defaultToastOptions,
  position: "top-center",
  closeOnClick: false,
  closeButton: false
};

const toasts = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
  loading: toast.loading
};

export const showToastAlert = (
  severity: ToastSeverity,
  options: ToastAlertOptions
) => {
  return toasts[severity](options.message, {
    ...options
  });
};

export type UpdateToastOptions = Omit<ToastAlertOptions, "severity"> & {
  severity: TypeOptions;
};
export const updateToastAlert = (
  id: Id,
  options: UpdateToastOptions,
  containerType?: ToastAlertContainerType
) => {
  const { message, severity, ...other } = options;
  toast.update(id, {
    ...(containerType === "mobile" ? mobileToastOptions : defaultToastOptions),
    render: message,
    type: severity,
    ...other
  });
};

export const closeToastAlert = (id: Id) => {
  toast.dismiss(id);
};
