import { Box, Container, styled, Typography } from "@mui/material";
import cover from "../assets/images/cachorro-header.png";
import SearchBar from "./Search";

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "block",
    minHeight: "60vh",
    // tamanho
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
            color: "white",
          }}
        >
          Find a sitter for your furry friend
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 1,
            lineHeight: 2,
            fontWeight: 500,
            color: "white",
          }}
        >
          Discover trusted sitters near you who'll treat your pet like family.
        </Typography>
        <SearchBar />
        <Box></Box>
      </BoxText>

      <Box></Box>
    </CustomBox>
  );
};

export default Header;
