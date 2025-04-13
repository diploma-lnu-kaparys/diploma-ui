import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  styled,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../hooks/useAuth";
import LanguageSwitcher from "../LanguageSwitcher";

type Props = {
  onMenuClick?: () => void;
  open?: boolean;
  drawerWidth: number;
};

const ShiftedAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth"
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: theme.shadows[1],

  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function LayoutHeader({
  onMenuClick,
  open,
  drawerWidth
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { authorized } = useAuth();

  return (
    <ShiftedAppBar
      position="fixed"
      color="default"
      open={open && !isMobile}
      drawerWidth={drawerWidth}
    >
      <Toolbar>
        {authorized && (!open || isMobile) && (
          <IconButton onClick={onMenuClick} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap>
          My Awesome App
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <LanguageSwitcher />
      </Toolbar>
    </ShiftedAppBar>
  );
}
