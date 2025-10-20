import React from "react";
import { Box, styled, Typography } from "@mui/material";
import cover from "../assets/images/cachorro-sorridente-sentado-no-sofa.jpg";

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "block",
    minHeight: "80vh",
    // tamanhos
    gap: theme.spacing(2),
    paddingTop: theme.spacing(35),
    // cor de fundo
    backgroundColor: "secondary",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    backgroundImage: `url(${cover})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  return (
    <CustomBox component="header">
      {/*  Box text  */}
      <BoxText component="center">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "primary",
          }}
        >
          Find a sitter for your furry friend
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: "primary",
          }}
        >
          Discover trusted sitters near you who'll treat your pet like family.
        </Typography>

        <Box></Box>
      </BoxText>

      <Box></Box>
    </CustomBox>
  );
};

export default Header;
