import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import VideoService from "../services/VideoService";
import StorageService from "../services/StorageService";
import React from "react";

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const vid = Number(id);

  const {
    data: meta,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["video", vid],
    queryFn: () => VideoService.getVideoById(vid)
  });

  const transcribeMut = useMutation({
    mutationFn: () => VideoService.transcribeVideo({ videoId: vid }),
    onSuccess: () => refetch()
  });

  const { data: signedUrl } = useQuery({
    enabled: !!meta?.storagePath,
    queryKey: ["play", meta?.storagePath],
    queryFn: () => StorageService.getSignedUrl(meta!.storagePath!)
  });

  React.useEffect(() => {
    if (meta && !meta.subtitle && !transcribeMut.isPending) {
      transcribeMut.mutate();
    }
  }, [meta]);

  if (isLoading || !meta) return <CircularProgress />;

  return (
    <Box maxWidth={720} mx="auto" p={3}>
      <Typography variant="h5" mb={2}>
        {meta.fileName}
      </Typography>

      {signedUrl && (
        <video src={signedUrl} controls width="100%">
          <track kind="captions" default />
        </video>
      )}

      {transcribeMut.isPending && (
        <>
          <Typography mt={2}>Transcribing…</Typography>
          <LinearProgress sx={{ mt: 1 }} />
        </>
      )}

      {meta.subtitle && (
        <Box mt={3}>
          <Typography variant="h6">Subtitles</Typography>
          <Typography whiteSpace="pre-wrap">{meta.subtitle.rawText}</Typography>
        </Box>
      )}
    </Box>
  );
}
