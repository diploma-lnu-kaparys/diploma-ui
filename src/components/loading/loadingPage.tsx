import clsx from "clsx";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: grey[400]
  },
  spinner: {
    width: 20,
    height: 20,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: -10,
    marginLeft: -10
  }
}));

export interface LoadingPageProps extends BoxProps {}

export function LoadingPage(props: LoadingPageProps) {
  const { className, ...other } = props;
  const s = useStyles();

  return (
    <Box className={clsx(s.root, className)} {...other}>
      <CircularProgress color="inherit" className={s.spinner} size="20" />
    </Box>
  );
}
