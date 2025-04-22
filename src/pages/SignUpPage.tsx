// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UserService from "../services/UserService";
import SignupSessionTokenService from "../components/utils/signUpToken";
import TokenService from "../components/utils/token";
import { AuthBaseDto } from "@diploma-lnu-kaparys/diploma-api-client";
import useAuth from "../components/hooks/useAuth";
import { useToastAlert } from "../components/app/ToastAlert/ToastAlertProvider";

interface FormState {
  email: string;
  password: string;
  code: string;
}

const steps = ["signup.enter", "signup.code", "signup.done"] as const;
type StepKey = (typeof steps)[number];

export default function SignUpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setState } = useAuth();
  const { showToastAlert } = useToastAlert();

  const [activeStep, setActiveStep] = useState<StepKey>(steps[0]);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    code: ""
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const popperPlacement = isMobile ? "top-start" : "right-start";

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // --- Email validation ---
  const emailRegex = /^\S+@\S+\.\S+$/;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setForm((f) => ({ ...f, email }));
    setIsEmailValid(emailRegex.test(email));
  };

  // --- Password validation ---
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setForm((f) => ({ ...f, password: pw }));
    setPasswordCriteria({
      minLength: pw.length >= 8,
      hasLetter: /[A-Za-z]/.test(pw),
      hasNumber: /\d/.test(pw),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pw)
    });
  };
  const handlePwFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    setAnchorEl(e.currentTarget);
  const handlePwBlur = () => setTimeout(() => setAnchorEl(null), 100);

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const preSignUpMut = useMutation({
    mutationFn: () =>
      UserService.preCoachSignUp({
        email: form.email,
        password: form.password
      }),
    onSuccess: (data: any) => {
      if (data?.sessionToken) {
        SignupSessionTokenService.updateSessionToken(data.sessionToken);
      }
      showToastAlert("success", { message: t("signup.codeSent") });
      setActiveStep(steps[1]);
    },
    onError: (err: any) =>
      showToastAlert("error", {
        message: err?.response?.data?.detail ?? err?.message
      })
  });

  const completeMut = useMutation<AuthBaseDto, any, void>({
    mutationFn: () =>
      UserService.completeCoachSignUp({
        email: form.email,
        code: form.code,
        timeZone
      }),
    onSuccess: (data) => {
      const token = data.accessToken;
      if (token) {
        TokenService.updateLocalAccessToken(token);
        SignupSessionTokenService.removeSessionToken();
        setState(token);
      }
      showToastAlert("success", { message: t("signup.completed") });
      setActiveStep(steps[2]);
      setTimeout(() => navigate("/", { replace: true }), 800);
    },
    onError: (err: any) =>
      showToastAlert("error", {
        message: err?.response?.data?.detail ?? err.message
      })
  });

  return (
    <Box maxWidth={480} mx="auto" mt={4} px={2}>
      <Typography variant="h4" gutterBottom>
        {t("signup.title")}
      </Typography>

      <Stepper activeStep={steps.indexOf(activeStep)} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps[0] && (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            preSignUpMut.mutate();
          }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {/* Email */}
          <TextField
            label={t("email")}
            type="email"
            value={form.email}
            onChange={handleEmailChange}
            error={form.email !== "" && !isEmailValid}
            helperText={
              form.email !== "" && !isEmailValid
                ? t("signup.invalidEmail")
                : " "
            }
            required
            fullWidth
          />

          <TextField
            label={t("password")}
            type="password"
            value={form.password}
            onChange={handlePasswordChange}
            onFocus={handlePwFocus}
            onBlur={handlePwBlur}
            required
            fullWidth
          />

          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement={popperPlacement}
            modifiers={[
              {
                name: "offset",
                options: { offset: [0, 8] }
              }
            ]}
            sx={{ zIndex: 1200 }}
          >
            <Paper elevation={3} sx={{ p: 1, maxWidth: 240 }}>
              <List dense>
                {(
                  [
                    ["minLength", passwordCriteria.minLength],
                    ["hasLetter", passwordCriteria.hasLetter],
                    ["hasNumber", passwordCriteria.hasNumber],
                    ["hasSpecial", passwordCriteria.hasSpecial]
                  ] as const
                ).map(([key, ok]) => (
                  <ListItem key={key}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {ok ? (
                        <CheckCircleIcon fontSize="small" color="success" />
                      ) : (
                        <CancelIcon fontSize="small" color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={t(`passwordCriteria.${key}`)} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Popper>

          <Button
            type="submit"
            variant="contained"
            disabled={
              preSignUpMut.isPending || !isEmailValid || !isPasswordValid
            }
            endIcon={
              preSignUpMut.isPending ? <CircularProgress size={18} /> : null
            }
          >
            {t("signup.sendCode")}
          </Button>
        </Box>
      )}

      {activeStep === steps[1] && (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            completeMut.mutate();
          }}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography>
            {t("signup.codePrompt", { email: form.email })}
          </Typography>
          <TextField
            label={t("signup.code")}
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            inputProps={{ maxLength: 6 }}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={completeMut.isPending}
            endIcon={
              completeMut.isPending ? <CircularProgress size={18} /> : null
            }
          >
            {t("signup.verify")}
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={preSignUpMut.isPending}
            onClick={() => preSignUpMut.mutate()}
          >
            {t("signup.resend")}
          </Button>
        </Box>
      )}

      {activeStep === steps[2] && (
        <Typography variant="h6" textAlign="center">
          {t("signup.success")}
        </Typography>
      )}
    </Box>
  );
}
