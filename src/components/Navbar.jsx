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
// menu
//import DrawerItem from "./DrawerItem";
// rotas
//import { Link } from "react-router-dom";

// personalizacao
const StyledToolbar = styled(Toolbar)({
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
    text: "Become a host",
    to: "/become-a-host",
  },
  {
    text: "How it works?",
    to: "/help",
  },
];

const buttonList = [
  {
    text: "sign in",
    to: "/auth",
    color: "#8b5cf6",
  },
  {
    text: "sign up",
    to: "/signup",
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
          PetMinder
        </Typography>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}></Box>
        <ListMenu>
          {itemList.map((item) => {
            const { text } = item;
            return (
              <ListItem key={text}>
                <ListItemButton
                  to={item.to}
                  sx={{
                    alignSelf: "center",
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
        <Stack direction="row" spacing={2}>
          {buttonList.map((item) => {
            const { text } = item;
            return (
              <Button variant="contained" elevation="3" color="primary">
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
