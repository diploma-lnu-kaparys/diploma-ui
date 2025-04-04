import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";

export default function VideoUpload() {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1
  });

  if (file) {
    return (
      <Box mt={3} textAlign="center">
        <Box
          component="video"
          src={URL.createObjectURL(file)}
          controls
          sx={{
            width: "100%",
            maxWidth: 480,
            borderRadius: 1,
            boxShadow: 2,
            mt: 1
          }}
        >
          <track kind="captions" src="" label="No captions" />
        </Box>
      </Box>
    );
  }

  return (
    <Box position="relative">
      {isDragActive && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.5)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: "opacity 0.3s ease-in-out",
            pointerEvents: "none"
          }}
        >
          <Typography variant="h4" color="white">
            {t("dropYourVideo")}
          </Typography>
        </Box>
      )}

      <Box
        {...getRootProps()}
        sx={{
          p: 6,
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.400",
          borderRadius: 2,
          textAlign: "center",
          cursor: "pointer",
          transition:
            "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: 3
          },
          backgroundColor: "background.default"
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: isDragActive ? "primary.main" : "grey.500",
            mb: 1
          }}
        />
        <Typography variant="h6" mb={1}>
          {t("dragInstruction")}
        </Typography>
      </Box>
    </Box>
  );
}
