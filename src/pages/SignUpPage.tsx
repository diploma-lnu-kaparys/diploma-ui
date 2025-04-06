import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SIGNIN_ROUTE } from "../routes/routes";

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
    setStep(2);
  };

  const handlePasswordSubmit = () => {
    console.log("Password submitted:", password);
    setStep(3);
  };

  const handleCodeSubmit = () => {
    console.log("Verification code submitted:", code);
    navigate("/signin");
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {t("signUp")}
      </Typography>
      {step === 1 && (
        <Box>
          <TextField
            label={t("email")}
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEmailSubmit}
          >
            {t("sendCode")}
          </Button>
        </Box>
      )}
      {step === 2 && (
        <Box>
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
            onClick={handlePasswordSubmit}
          >
            {t("continue")}
          </Button>
        </Box>
      )}
      {step === 3 && (
        <Box>
          <TextField
            label={t("code")}
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCodeSubmit}
          >
            {t("finishRegistration")}
          </Button>
        </Box>
      )}
      <Typography align="center" sx={{ mt: 2 }}>
        {t("backToSignIn")}{" "}
        <Link component="button" onClick={() => navigate(SIGNIN_ROUTE)}>
          {t("signIn")}
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
