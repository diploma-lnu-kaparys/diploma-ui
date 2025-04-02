import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
    accept: {
      "video/*": []
    }
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        p: 4,
        border: "2px dashed #ccc",
        borderRadius: 2,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>{t("dragInstruction")}</Typography>
      ) : (
        <Typography>{t("dragInstruction")}</Typography>
      )}

      {file && (
        <Box mt={2}>
          <Typography>{t("selectedFile", { fileName: file.name })}</Typography>
          <video
            src={URL.createObjectURL(file)}
            controls
            width="480"
            style={{ marginTop: 8 }}
          >
            <track kind="captions" src="" label="No captions" />
          </video>
        </Box>
      )}
    </Box>
  );
}
