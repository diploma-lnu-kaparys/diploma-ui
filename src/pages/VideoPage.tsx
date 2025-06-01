import React from "react";
import {
  Box,
  Stack,
  Chip,
  Typography,
  CircularProgress,
  LinearProgress
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import VideoService from "../services/VideoService";
import StorageService from "../services/StorageService";
import {
  VideoDto,
  SentimentResultDto
} from "@diploma-lnu-kaparys/diploma-api-client";
import { useToastAlert } from "../components/app/ToastAlert/ToastAlertProvider";
import useAuth from "../components/hooks/useAuth";
import { CURRENT_USER_QUERY_KEY } from "../components/hooks/useUserInfo";
import { useTranslation } from "react-i18next";

export const VIDEO_QUERY_KEY = "video";
export const SIGNED_URL_QUERY_KEY = "signed-url";

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const vid = Number(id);
  const queryClient = useQueryClient();
  const { showToastAlert, updateToastAlert } = useToastAlert();
  const { t } = useTranslation();

  const { data: meta, isLoading: metaLoading } = useQuery<VideoDto>({
    queryKey: [VIDEO_QUERY_KEY, vid],
    queryFn: () => VideoService.getVideoById(vid),
    refetchOnWindowFocus: false,
    gcTime: 0,
    refetchOnMount: true
  });

  const [sentiment, setSentiment] = React.useState<SentimentResultDto | null>(
    null
  );

  React.useEffect(() => {
    setSentiment(null);
  }, [vid]);

  const { mutate: transcribeVideo, isPending: isTranscribing } = useMutation({
    mutationFn: () => VideoService.transcribeVideo({ videoId: vid }),
    onSuccess: (rawText: string) => {
      queryClient.setQueryData<VideoDto>([VIDEO_QUERY_KEY, vid], (old) => {
        if (!old) return old as any;
        return {
          ...old,
          subtitle: {
            ...(old.subtitle ?? { id: 0, videoId: vid }),
            rawText
          }
        };
      });
      showToastAlert("success", { message: t("transcriptionCompleted") });
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
        refetchType: "all"
      });
    },
    onError: (err: any) =>
      showToastAlert("error", {
        message: err?.message ?? t("transcriptionFailed")
      })
  });

  const { mutate: analyzeSentiment, isPending: isAnalyzing } = useMutation({
    mutationFn: () => VideoService.analyzeSentiment({ videoId: vid }),
    onMutate: () => ({
      toastId: showToastAlert("loading", { message: t("analyzingSentiment") })
    }),
    onSuccess: (result, _vars, ctx: any) => {
      setSentiment(result);
      updateToastAlert(ctx.toastId, {
        severity: "success",
        message: t("sentimentAnalysisDone")
      });
      queryClient.setQueryData<VideoDto>([VIDEO_QUERY_KEY, vid], (old) => {
        if (!old) return old as any;
        return { ...old, sentimentAnalysisResult: result };
      });
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY]
      });
    },
    onError: (err: any) =>
      showToastAlert("error", { message: err?.message ?? t("analysisFailed") })
  });

  // Update sentiment from meta when available
  React.useEffect(() => {
    if (meta?.sentimentAnalysisResult && !sentiment) {
      setSentiment(meta.sentimentAnalysisResult);
    }
  }, [meta, sentiment]);

  const { data: signedUrl } = useQuery<string>({
    enabled: !!meta?.storagePath,
    queryKey: [SIGNED_URL_QUERY_KEY, meta?.storagePath],
    queryFn: () => StorageService.getSignedUrl(meta!.storagePath!),
    refetchOnWindowFocus: false
  });

  React.useEffect(() => {
    if (!meta) return;

    const hasText = !!meta.subtitle?.rawText?.trim();
    const hasSentiment = !!meta.sentimentAnalysisResult;

    if (!hasText && !isTranscribing) {
      transcribeVideo();
      return;
    }

    if (hasText && !hasSentiment && !isAnalyzing) {
      analyzeSentiment();
    }
  }, [
    meta,
    sentiment,
    isTranscribing,
    isAnalyzing,
    transcribeVideo,
    analyzeSentiment
  ]);

  const sentimentChip = (res: SentimentResultDto | null) => {
    if (!res || !res.overallSentiment) return null;

    const getSentimentConfig = (sentiment: string) => {
      switch (sentiment) {
        case "Positive":
          return {
            color: "success" as const,
            icon: <EmojiEmotionsIcon fontSize="small" sx={{ mr: 0.5 }} />
          };
        case "Negative":
          return {
            color: "error" as const,
            icon: (
              <SentimentDissatisfiedIcon fontSize="small" sx={{ mr: 0.5 }} />
            )
          };
        default:
          return {
            color: "warning" as const,
            icon: <SentimentSatisfiedIcon fontSize="small" sx={{ mr: 0.5 }} />
          };
      }
    };

    const config = getSentimentConfig(res.overallSentiment);
    const sentimentKey = res.overallSentiment.toLowerCase() as
      | "positive"
      | "negative"
      | "neutral";

    return (
      <Chip
        sx={{ mt: 2 }}
        color={config.color}
        icon={config.icon}
        label={`${t(`sentiment.${sentimentKey}`)} • ${(res.score! * 100).toFixed(1)} %`}
      />
    );
  };

  if (metaLoading || !meta)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box maxWidth={720} mx="auto" p={3}>
      <Typography variant="h5" mb={2}>
        {meta.fileName}
      </Typography>

      <Box
        sx={{
          aspectRatio: "16/9",
          backgroundColor: "black",
          borderRadius: 1,
          overflow: "hidden",
          maxHeight: "70vh"
        }}
      >
        {signedUrl && (
          <video
            src={signedUrl}
            controls
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              display: "block"
            }}
          >
            <track kind="captions" default />
          </video>
        )}
      </Box>

      {(isTranscribing || isAnalyzing) && (
        <Stack mt={2} spacing={1}>
          {isTranscribing && (
            <>
              <Typography>{t("transcribing")}</Typography>
              <LinearProgress />
            </>
          )}
          {meta.subtitle?.rawText && isAnalyzing && (
            <>
              <Typography>{t("analyzingSentiment")}</Typography>
              <LinearProgress />
            </>
          )}
        </Stack>
      )}

      {meta.subtitle?.rawText && (
        <Box mt={3}>
          <Typography variant="h6">Subtitles</Typography>
          <Typography whiteSpace="pre-wrap">{meta.subtitle.rawText}</Typography>
        </Box>
      )}

      {sentimentChip(sentiment)}
    </Box>
  );
}
