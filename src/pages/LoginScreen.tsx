import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SIGNUP_ROUTE } from "../routes/routes";
import UserService from "../services/UserService";
import TokenService from "../components/utils/token";
import useAuth from "../components/hooks/useAuth";
import { useToastAlert } from "../components/app/ToastAlert/ToastAlertProvider";

interface Props {
  returnUrl?: string | null;
}

const LoginScreen: React.FC<Props> = ({ returnUrl }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setState } = useAuth();
  const { showToastAlert } = useToastAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInMut = useMutation({
    mutationFn: () => UserService.signIn({ email, password }),
    onSuccess: ({ accessToken }) => {
      if (accessToken) {
        TokenService.updateLocalAccessToken(accessToken);
        setState(accessToken);
      }
      navigate(returnUrl ?? "/", { replace: true });
    },
    onError: (err: any) =>
      showToastAlert("error", {
        message: err?.response?.data?.detail ?? err?.message
      })
  });

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t("signIn")}
      </Typography>

      <TextField
        label={t("email")}
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label={t("password")}
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={signInMut.isPending}
        endIcon={signInMut.isPending && <CircularProgress size={18} />}
        onClick={() => signInMut.mutate()}
      >
        {t("continue")}
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        {t("noAccount")}{" "}
        <Link component="button" onClick={() => navigate(SIGNUP_ROUTE)}>
          {t("signUp")}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginScreen;
