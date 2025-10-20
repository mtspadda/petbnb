import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

// menu
//import DrawerItem from "./DrawerItem";
// rotas
//import { Link } from "react-router-dom";

// personalizacao
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const ListMenu = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

//rotas
const itemList = [
  {
    text: "Become a minder",
    to: "/become-a-minder",
  },
  {
    text: "How it works?",
    to: "/help",
  },
];

const buttonList = [
  {
    text: "log in",
    to: "/auth",
    variant: "contained",
  },
  {
    text: "sign up",
    to: "/signup",
    variant: "outlined",
  },
];

const Navbar = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        backgroundColor: "white",
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Typography variant="h4" component="h2" color="primary">
          <PetsIcon
            color="primary"
            sx={{
              display: "inline",
              mx: 1,
            }}
          ></PetsIcon>
          PetMinder
        </Typography>
        <ListMenu
          sx={{
            width: "30%",
          }}
        >
          {itemList.map((item) => {
            const { text } = item;
            return (
              <ListItem key={text}>
                <ListItemButton
                  to={item.to}
                  sx={{
                    borderRadius: "16px",
                    justifyContent: "space-between",
                    color: "#276CF5",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#1B56C4",
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </ListMenu>
        <Stack direction="row" spacing={1}>
          {buttonList.map((item) => {
            const { text } = item;
            return (
              <Button
                variant={item.variant}
                elevation="3"
                color="primary"
                sx={{ borderRadius: "20px", fontStyle: "bold" }}
              >
                {text}
              </Button>
            );
          })}
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
