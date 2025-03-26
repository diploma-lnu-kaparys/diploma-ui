import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    },
    background: {
      default: "#f5f5f5"
    }
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
        }
      }
    }
  }
});

export default theme;
