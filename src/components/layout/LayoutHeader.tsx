import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

type LayoutHeaderProps = {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LayoutHeader({
  toggleSidebar,
  isDarkMode,
  setIsDarkMode
}: LayoutHeaderProps) {
  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Box display="flex">
        <ThemeSwitcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <LanguageSwitcher />
      </Box>
    </Box>
  );
}
