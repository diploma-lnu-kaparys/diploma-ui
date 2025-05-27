import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuth from "../hooks/useAuth";
import LanguageSwitcher from "../LanguageSwitcher";
import { LOGIN_ROUTE } from "../../routes/routes";
import { useLogout } from "../hooks/useLogout";

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

type Props = {
  onMenuClick?: () => void;
  open?: boolean;
  drawerWidth: number;
};

export default function LayoutHeader({
  onMenuClick,
  open,
  drawerWidth
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { authorized } = useAuth();
  const doLogout = useLogout({ returnUrl: LOGIN_ROUTE });

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    doLogout();
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
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

          <Box sx={{ flexGrow: 1 }} />

          <LanguageSwitcher />
          {authorized && (
            <IconButton onClick={handleLogoutClick} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          )}
        </Toolbar>
      </ShiftedAppBar>

      <Dialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
