import { Theme } from "@mui/material/styles";

export const getSidebarStyles = (theme: Theme) => ({
  backgroundColor: "#dfdfdf",
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px"
  }
});

export const getMainContentStyles = (theme: Theme) => ({
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
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px"
  }
});
