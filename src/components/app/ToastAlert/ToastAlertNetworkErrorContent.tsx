import { Box, Collapse, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

interface ToastAlertNetworkErrorContentProps {
  userOffline?: boolean;
  serverOffline?: boolean;
}

const ToastAlertNetworkErrorContent: React.FC<
  ToastAlertNetworkErrorContentProps
> = ({ userOffline, serverOffline }) => {
  const errorText = useMemo(() => {
    if (userOffline) {
      return "You are offline. Please check your connection.";
    } else if (serverOffline) {
      return "Server is not available. Please try again later.";
    } else return "Oops! Connection lost.";
  }, [userOffline, serverOffline]);

  return (
    <Typography
      sx={{
        paddingX: 1,
        lineHeight: 1.1
      }}
    >
      {errorText}
    </Typography>
  );
};

export default ToastAlertNetworkErrorContent;
