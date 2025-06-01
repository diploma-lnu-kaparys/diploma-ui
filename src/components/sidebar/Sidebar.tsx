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
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks/useUserInfo";
import { DEFAULT_ROUTE } from "../../routes/routes";
import HomeIcon from "@mui/icons-material/Home";

const ScrollableContainer = styled("div")({
  height: "75vh",
  overflowY: "auto"
});

const Logo = styled("img")({
  width: 24,
  height: 24,
  marginRight: 8
});

type SidebarProps = { toggleSidebar: () => void };

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, currentUserLoading: isLoading } = useUserInfo();
  const location = useLocation();
  const navigate = useNavigate();

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
        <Box display="flex" alignItems="center">
          <Logo src="/logo.png" alt="Logo" />
          <Typography variant="h6">{t("myAnalyses")}</Typography>
        </Box>
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

      <Box
        display="flex"
        alignItems="center"
        width="100%"
        minHeight={64}
        px={2}
        py={1.5}
        mb={1}
        sx={{
          "&:hover": {
            backgroundColor: (theme) => theme.palette.action.hover
          }
        }}
      >
        <IconButton
          size="small"
          onClick={() => {
            navigate(DEFAULT_ROUTE);
            if (isMobile) toggleSidebar();
          }}
          sx={{ mr: 1 }}
        >
          <HomeIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(DEFAULT_ROUTE);
            if (isMobile) toggleSidebar();
          }}
        >
          {t("home")}
        </Typography>
      </Box>

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
