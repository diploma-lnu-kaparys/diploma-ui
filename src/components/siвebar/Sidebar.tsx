import React from "react";
import { useTranslation } from "react-i18next";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function Sidebar() {
  const { t } = useTranslation();

  const projects = [
    { id: 1, name: "Відео-аналіз 1" },
    { id: 2, name: "Відео-аналіз 2" },
    { id: 3, name: "Відео-аналіз 3" }
  ];

  return (
    <>
      <Typography variant="h6" p={2}>
        {t("myAnalyses")}
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItemButton key={project.id}>
            <ListItemText primary={project.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
