import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  styled,
  useMediaQuery,
  useTheme
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import LayoutHeader from "./LayoutHeader";
import Sidebar from "../sidebar/Sidebar";

const drawerWidth = 280;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth"
})<{
  open?: boolean;
  drawerWidth?: number;
}>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),

  ...(open && {
    marginLeft: drawerWidth ?? 280
  }),

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0
  }
}));

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { authorized } = useAuth();
  const [open, setOpen] = React.useState(authorized);

  const toggleSidebar = () => setOpen((prev) => !prev);

  const drawerVariant = isMobile ? "temporary" : "persistent";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <LayoutHeader
        onMenuClick={toggleSidebar}
        open={!isMobile && open}
        drawerWidth={drawerWidth}
      />

      {authorized && (
        <Drawer
          variant={drawerVariant}
          open={open}
          onClose={toggleSidebar}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </Drawer>
      )}

      <Main open={authorized && open && !isMobile} drawerWidth={drawerWidth}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
}
