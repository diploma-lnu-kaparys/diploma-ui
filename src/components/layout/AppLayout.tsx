import React from "react";
import { Box } from "@mui/material";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import Sidebar from "../siвebar/Sidebar";

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
  return (
    <Box display="flex" height="100vh">
      <Box
        component="aside"
        width="280px"
        sx={{
          backgroundColor: isDarkMode ? "#121212" : "#dfdfdf"
        }}
      >
        <Sidebar />
      </Box>

      <Box flex={1} p={2} overflow="auto">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <ThemeSwitcher
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <LanguageSwitcher />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
