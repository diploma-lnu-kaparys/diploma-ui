import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    background: { default: "#1d1d1d", paper: "#121212" }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box"
        },
        a: {
          textDecoration: "none"
        },
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#1d1d1d",
          color: "#fff"
        },
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px"
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent"
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#A9A9A9",
          borderRadius: "4px"
        },
        "*::-webkit-scrollbar-corner": {
          background: "transparent"
        },
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: "#A9A9A9 transparent"
        }
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f5f5f5" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#f5f5f5",
          color: "#333"
        },
        "*": {
          boxSizing: "border-box"
        },
        a: {
          textDecoration: "none"
        },
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px"
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent"
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#909090",
          borderRadius: "4px"
        },
        "*::-webkit-scrollbar-corner": {
          background: "transparent"
        },
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: "#909090 transparent"
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#d0d0d0"
        }
      }
    }
  }
});

export { lightTheme, darkTheme };
