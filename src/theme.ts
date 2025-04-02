import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    },
    background: {
      default: "#1d1d1d",
      paper: "#121212"
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
          backgroundColor: "#1d1d1d",
          color: "#fff"
        },
        "*": {
          boxSizing: "border-box"
        },
        a: {
          textDecoration: "none"
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#121212"
        }
      }
    }
  }
});

const lightTheme = createTheme({
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
