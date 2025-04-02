import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.language || "en");

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
      color="primary"
    >
      <ToggleButton value="uk">UA</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
