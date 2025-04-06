import { Theme } from "@mui/material/styles";

export const getSidebarStyles = (isDarkMode: boolean, theme: Theme) => ({
  backgroundColor: isDarkMode ? "#121212" : "#dfdfdf",
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: isDarkMode
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
    borderRadius: "4px"
  }
});

export const getMainContentStyles = (isDarkMode: boolean, theme: Theme) => ({
  overflow: "auto",
  p: 2,
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: isDarkMode
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
    borderRadius: "4px"
  }
});
