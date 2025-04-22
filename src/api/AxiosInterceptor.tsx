import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../components/hooks/useAuth";
import TokenService from "../components/utils/token";
import { useToastAlert } from "../components/app/ToastAlert/ToastAlertProvider";
import { UpdateToastOptions } from "../components/utils/toast";
import ToastAlertNetworkErrorContent from "../components/app/ToastAlert/ToastAlertNetworkErrorContent";
import { WifiOffIcon } from "lucide-react";
import { SOMETHING_WENT_WRONG } from "../constants";

export interface AxiosInstanceProps {
  children: React.ReactNode;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const SIGN_IN_URL = "api/users/signin";
const REFRESH_URL = "api/users/refresh";
const SERVER_HEALTH_CHECK_URL = "/health";
const HEALTH_CHECK_DELAY = 60000;
const NETWORK_ALERT_ID = "network-toast-alert";

const compareUrls = (url?: string, urlToCompare?: string) => {
  if (!url || !urlToCompare) return false;
  return url.toLowerCase().endsWith(urlToCompare.toLowerCase());
};

const AxiosInterceptor = ({ children }: AxiosInstanceProps) => {
  const [isSet, setIsSet] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(navigator.onLine);
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const { logout } = useAuth();
  const { showToastAlert, updateToastAlert, closeToastAlert } = useToastAlert();

  const showNetworkAlert: typeof showToastAlert = (severity, options) => {
    return showToastAlert(severity, {
      toastId: NETWORK_ALERT_ID,
      ...options
    });
  };

  const updateNetworkAlert = (options: UpdateToastOptions) => {
    return updateToastAlert(NETWORK_ALERT_ID, {
      ...options,
      toastId: NETWORK_ALERT_ID
    });
  };

  const closeNetworkAlert = () => {
    closeToastAlert(NETWORK_ALERT_ID);
  };

  const healthCheckEnabled =
    process.env.REACT_APP_SERVER_HEALTH_CHECK_ENABLED === "true";

  const networkAlert = (
    <ToastAlertNetworkErrorContent
      userOffline={!isUserOnline}
      serverOffline={!isServerOnline}
    />
  );

  useEffect(() => {
    if (!healthCheckEnabled) return;
    const interval = setInterval(async () => {
      if (isUserOnline) {
        try {
          await axiosInstance.get(SERVER_HEALTH_CHECK_URL);
          setIsServerOnline(true);
        } catch (error) {
          setIsServerOnline(false);
        }
      }
    }, HEALTH_CHECK_DELAY);

    return () => clearInterval(interval);
  }, [isUserOnline, healthCheckEnabled]);

  // Слухач змін статусу мережі у веб-додатку
  useEffect(() => {
    const updateOnlineStatus = () => setIsUserOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const isOffline = !isUserOnline || !isServerOnline;

    const networkAlertOptions = {
      autoClose: false as const,
      message: networkAlert,
      theme: "colored",
      closeButton: false,
      draggable: false,
      icon: <WifiOffIcon />
    };

    if (isOffline) {
      if (alertVisible) {
        updateNetworkAlert({
          severity: "error",
          ...networkAlertOptions
        });
      } else {
        showNetworkAlert("error", {
          ...networkAlertOptions
        });
        setAlertVisible(true);
      }
    } else if (alertVisible) {
      closeNetworkAlert();
      setAlertVisible(false);
    }
  }, [
    isUserOnline,
    isServerOnline,
    alertVisible,
    networkAlert,
    showNetworkAlert,
    updateNetworkAlert,
    closeNetworkAlert
  ]);

  useEffect(() => {
    const responseOnFulfilledInterceptor = (response: AxiosResponse) => {
      setIsServerOnline(true);
      return response;
    };

    const responseOnRejectedInterceptor = async (err: AxiosError) => {
      let sendErrorReport = true;
      const requestUrl = err?.config?.url;

      if (!navigator.onLine || !isServerOnline) {
        !isServerOnline && reportError(err);
        return Promise.reject(err);
      }

      if (
        err?.response?.status === 401 &&
        !compareUrls(requestUrl, SIGN_IN_URL)
      ) {
        showToastAlert("error", {
          message: "Your session has timed out, please login once again."
        });
        sendErrorReport = false;
        logout();
      } else if (!err.response && err.code === AxiosError.ERR_NETWORK) {
        setIsServerOnline(false);
      } else if (!err.response) {
        showToastAlert("error", {
          message: SOMETHING_WENT_WRONG
        });
      }
      sendErrorReport && reportError(err);
      return Promise.reject(err);
    };

    const requestOnFulfilledInterceptor = async (config: any) => {
      if (
        compareUrls(config.url, SIGN_IN_URL) ||
        compareUrls(config.url, REFRESH_URL) ||
        compareUrls(config.url, SERVER_HEALTH_CHECK_URL)
      )
        return config;

      try {
        const token = await TokenService.getAccessToken();

        if (token) {
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`
          };
        }
      } catch (e) {
        console.error("Error in getting token", e);
      }

      return config;
    };

    const requestOnRejectedInterceptor = (err: AxiosError) => {
      return Promise.reject(err);
    };

    const responseInterceptor = axiosInstance.interceptors.response.use(
      responseOnFulfilledInterceptor,
      responseOnRejectedInterceptor
    );

    const requestInterceptor = axiosInstance.interceptors.request.use(
      requestOnFulfilledInterceptor,
      requestOnRejectedInterceptor
    );

    setIsSet(true);
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [isServerOnline, logout, showToastAlert]);

  return <>{isSet && children}</>;
};

export { axiosInstance, REFRESH_URL, SIGN_IN_URL };
export default AxiosInterceptor;
