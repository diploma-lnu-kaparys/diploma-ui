import React from "react";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  useTheme
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { useLocation, useNavigate } from "react-router-dom";
import { HttpError } from "found";
import { Error40X } from "./Error40X";

declare module "@mui/styles/defaultTheme" {
  // Розширюємо DefaultTheme типом з @mui/material/styles
  export interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    "@media only screen and (max-width: 280px)": {
      width: "95%"
    }
  },
  main: {
    paddingBottom: 80,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    "@media screen and (max-width: 1024px)": {
      padding: theme.spacing(0, 1)
    }
  },

  errorCode: {
    margin: 0,
    fontSize: "15em",
    fontWeight: 300,
    lineHeight: 1,
    color: theme.palette.text.secondary,
    letterSpacing: "0.02em",
    "@media screen and (max-width: 1024px)": {
      fontSize: "10em"
    }
  },
  title: {
    paddingBottom: "0.5em",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "2em",
    fontWeight: 400,
    lineHeight: "1em",
    color: theme.palette.text.secondary,
    letterSpacing: "0.02em",
    "@media only screen and (max-width: 280px)": {
      margin: "0 0 0.3em",
      fontSize: "1.5em"
    },
    "@media screen and (max-width: 1024px)": {
      fontSize: "1.5em"
    }
  },
  text: {
    color: `color(${theme.palette.text.secondary} alpha(50%))`,
    "@media only screen and (max-width: 280px)": {
      width: "95%"
    }
  },
  link: {
    color: theme.palette.primary.main
  }
}));

export interface ErrorPageProps {
  error: HttpError | any;
  onReset?: () => void;
}

function decodeError(error: HttpError): [string, string] {
  switch (error && error.status) {
    case 404:
      return ["Page not found", "That page does not exist."];

    case 403:
      return ["Access denied", "You don’t have access to this content."];

    default:
      return ["Whoops!", "Something went wrong."];
  }
}

function ErrorPage(props: ErrorPageProps) {
  const { error, onReset } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const s = useStyles();
  const theme = useTheme();

  const [title, message] = decodeError(error);

  React.useEffect(() => {
    if ([401].includes(error.status)) {
      navigate("/login?returnUrl=" + encodeURIComponent(location.pathname), {
        replace: true
      });
    } else if ([402].includes(error.status) || error.code === 402) {
      navigate("/");
    } else document.title = title;
  }, [error.status, error.code, title]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={s.container}>
          <main className={s.main}>
            {[403, 404].includes(error.status) ? (
              <Error40X message={message} />
            ) : (
              <div>{message}</div>
            )}
          </main>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ErrorPage;
