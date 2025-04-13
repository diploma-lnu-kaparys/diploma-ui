import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE } from "../routes/routes";

interface LoginScreenProps {
  returnUrl?: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ returnUrl }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Signing in with:", email, password);

    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {t("signIn")}
      </Typography>
      <TextField
        label={t("email")}
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label={t("password")}
        variant="outlined"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignIn}
        sx={{ mt: 2 }}
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
