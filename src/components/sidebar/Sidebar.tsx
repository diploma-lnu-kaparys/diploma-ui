import React from "react";
import { useTranslation } from "react-i18next";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ScrollableContainer = styled("div")({
  height: "90%",
  overflowY: "auto"
});

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  margin: "4px 8px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

export default function Sidebar() {
  const { t } = useTranslation();

  const projects = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Відео-аналіз ${i + 1}`
  }));

  return (
    <>
      <Typography variant="h6" p={2}>
        {t("myAnalyses")}
      </Typography>
      <ScrollableContainer>
        <List>
          {projects.map((project) => (
            <StyledListItem key={project.id}>
              <ListItemText primary={project.name} />
            </StyledListItem>
          ))}
        </List>
      </ScrollableContainer>
    </>
  );
}
