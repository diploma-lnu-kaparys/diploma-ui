import clsx from "clsx";
import React from "react";
import { Box, BoxProps, Typography, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContemt: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  notFoundTitle: {
    fontSize: 32,
    fontWeight: "normal",
    color: theme.palette.common.black,
    marginBottom: theme.spacing(6),
    textAlign: "center"
  },
  homeButton: {
    fontSize: 13,
    fontWeight: "bold",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1.125, 4)
  },
  split: {
    border: 0,
    margin: theme.spacing(5, 0, 3)
  }
}));

export interface Error40XProps extends BoxProps {
  message: React.ReactNode;
}

export function Error40X(props: Error40XProps) {
  const { className, message, ...other } = props;
  const s = useStyles();

  return (
    <Box className={clsx(s.root, className)} {...other}>
      <Typography
        className={s.notFoundTitle}
        variant="h2"
        children={
          <>
            Woops!
            <br />
            {message}
          </>
        }
      />
      <Button
        className={s.homeButton}
        variant="contained"
        href="/"
        children="Back to Home"
      />
      <hr className={s.split} />
    </Box>
  );
}
