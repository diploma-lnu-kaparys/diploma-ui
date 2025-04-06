import React from "react";
import { Box } from "@mui/material";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

type LayoutHeaderProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LayoutHeader({
  isDarkMode,
  setIsDarkMode
}: LayoutHeaderProps) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Box display="flex">
        <ThemeSwitcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <LanguageSwitcher />
      </Box>
    </Box>
  );
}
