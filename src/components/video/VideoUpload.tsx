import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import makeStyles from "@mui/styles/makeStyles";
import { useUploadVideo } from "../hooks/useUploadVideo";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease-in-out",
    pointerEvents: "none"
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      paddingRight: theme.spacing(4)
    }
  },
  uploadBox: {
    width: "100%",
    padding: theme.spacing(6),
    border: "2px dashed",
    borderColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    backgroundColor: theme.palette.background.default,

    "&:hover": {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[3]
    }
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(1)
  },
  videoContainer: {
    marginTop: theme.spacing(3),
    textAlign: "center"
  },
  video: {
    width: "100%",
    maxWidth: 480,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    marginTop: theme.spacing(1)
  }
}));

export default function VideoUpload() {
  const s = useStyles();
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { upload } = useUploadVideo((p) => setProgress(p));
  const navigate = useNavigate();

  const onDrop = useCallback(
    async (files: File[]) => {
      const f = files[0];
      try {
        setFile(f);
        const { videoId } = await upload(f);
        setFile(null);
        setProgress(0);
        navigate(`/video/${videoId}`);
      } catch (e: any) {
        alert(e.message ?? "Upload failed");
        setFile(null);
        setProgress(0);
      }
    },
    [upload, navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/mp4": [] },
    maxFiles: 1
  });

  return (
    <Box className={s.root}>
      <Box className={s.contentWrapper}>
        <Typography variant="h4" mb={3}>
          {t("videoTitle")}
        </Typography>

        {!file && (
          <Box {...getRootProps()} className={s.uploadBox}>
            <input {...getInputProps()} />
            <CloudUploadIcon
              className={s.icon}
              color={isDragActive ? "primary" : "disabled"}
            />
            <Typography variant="h6">{t("dragInstruction")}</Typography>
          </Box>
        )}

        {file && (
          <>
            <Box className={s.videoContainer}>
              <video
                src={URL.createObjectURL(file)}
                controls
                className={s.video}
              >
                <track kind="captions" />
              </video>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 2 }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
