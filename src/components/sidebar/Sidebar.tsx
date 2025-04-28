import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";

const ScrollableContainer = styled("div")({
  height: "75vh",
  overflowY: "auto"
});

type SidebarProps = { toggleSidebar: () => void };

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, currentUserLoading: isLoading } = useUserInfo();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box p={2} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const videoIdFromUrl = location.pathname.startsWith("/video/")
    ? location.pathname.split("/")[2]
    : null;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6">{t("myAnalyses")}</Typography>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </Box>

      {user && (
        <Box px={2} pb={2}>
          <Typography variant="subtitle2">{user.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email} • {user.timeZone}
          </Typography>
        </Box>
      )}

      <Divider />

      <ScrollableContainer>
        <List>
          {user?.videos?.map((video) => {
            const isSelected =
              video.id !== undefined && video.id.toString() === videoIdFromUrl;

            return (
              <ListItem
                key={video.id}
                disablePadding
                component={RouterLink}
                to={`/video/${video.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit"
                }}
                onClick={() => {
                  if (isMobile) toggleSidebar();
                }}
              >
                <ListItemButton selected={isSelected}>
                  <ListItemText
                    primary={video.fileName}
                    secondary={new Date(video.uploadedAt!).toLocaleDateString()}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {(!user || user.videos?.length === 0) && (
            <Box p={2}>
              <Typography color="textSecondary" variant="body2">
                {t("sidebar.noVideos", "У вас ще немає відео")}
              </Typography>
            </Box>
          )}
        </List>
      </ScrollableContainer>
    </>
  );
}
