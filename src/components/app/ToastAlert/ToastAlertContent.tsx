import { Box, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";

interface ToastAlertContent {
  title?: string;
  details?: string;
}

const ErrorToastAlertContent: React.FC<ToastAlertContent> = ({
  title = "Oops!",
  details
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box
      onClick={toggleExpanded}
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography
        sx={{
          display: "inline-block",
          lineHeight: 1.1
        }}
      >
        {title}
        {details && (
          <Typography
            sx={{
              display: "inline-block",
              marginLeft: 0.5,
              cursor: "pointer"
            }}
          >
            {expanded ? "Show less" : "Show more..."}
          </Typography>
        )}
      </Typography>
      {details && (
        <Box>
          <Collapse in={expanded}>
            <Typography variant="body2">{details}</Typography>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default ErrorToastAlertContent;
