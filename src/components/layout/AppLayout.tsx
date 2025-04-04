import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../siвebar/Sidebar";
import LayoutHeader from "./LayoutHeader";
import {
  getSidebarStyles,
  getMainContentStyles
} from "../../styles/scrollbarStyles";

type AppLayoutProps = {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppLayout({
  children,
  isDarkMode,
  setIsDarkMode
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const theme = useTheme();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Box
        component="aside"
        sx={{
          width: "280px",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          overflow: "hidden",
          transition: "transform 0.3s ease",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-280px)",
          ...getSidebarStyles(isDarkMode, theme)
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          marginLeft: isSidebarOpen ? "280px" : "0px",
          transition: "margin-left 0.3s ease",
          height: "100vh",
          ...getMainContentStyles(isDarkMode, theme)
        }}
      >
        <LayoutHeader
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        {children}
      </Box>
    </Box>
  );
}
