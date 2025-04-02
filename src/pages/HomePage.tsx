import React from "react";
import { Box, Typography } from "@mui/material";
import VideoUpload from "../components/video/VideoUpload";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {t("videoTitle")}
      </Typography>
      <VideoUpload />
    </Box>
  );
}
