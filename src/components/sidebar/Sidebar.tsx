import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

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

type SidebarProps = {
  toggleSidebar: () => void;
};

export default function Sidebar({ toggleSidebar }: SidebarProps) {
  const { t } = useTranslation();

  const projects = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Відео-аналіз ${i + 1}`
  }));

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6">{t("myAnalyses")}</Typography>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </Box>
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
