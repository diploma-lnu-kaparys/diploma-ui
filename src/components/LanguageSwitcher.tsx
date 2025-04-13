import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  toggleGroup: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "2px",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)"
  },
  toggleButton: {
    fontWeight: 500,
    minWidth: "40px",
    padding: "4px 12px"
  }
}));

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.language || "en");
  const s = useStyles();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string | null
  ) => {
    if (newLang) {
      setLang(newLang);
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={handleChange}
      size="small"
      className={s.toggleGroup}
    >
      <ToggleButton value="uk" className={s.toggleButton}>
        UA
      </ToggleButton>
      <ToggleButton value="en" className={s.toggleButton}>
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
