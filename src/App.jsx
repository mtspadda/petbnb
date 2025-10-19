import "./App.css";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        PetBnb
      </Typography>
    </Container>
  );
}

export default App;
