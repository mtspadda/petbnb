import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Paper, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import LocationSearch from "./ui/LocationSearch";

const pets = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Guinea Pig",
  "Reptile",
];

export default function SearchBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");
  const [petType, setPetType] = useState("");

  const handleSearch = () => {
    console.log({
      startDate,
      endDate,
      location,
      petType,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{ p: 3, maxWidth: 1400, mx: "auto", mt: 4, borderRadius: "16px" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="stretch"
        >
          <DatePicker
            label="Check in"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
              },
            }}
            sx={{ flex: 1 }}
          />

          <DatePicker
            label="Check out"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
              },
            }}
            sx={{ flex: 1 }}
          />

          <LocationSearch />

          <TextField
            select
            fullWidth
            label="Pet Type"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            variant="outlined"
            sx={{ flex: 1 }}
          >
            <MenuItem value="">
              <em>Select pet</em>
            </MenuItem>
            {pets.map((pet) => (
              <MenuItem key={pet} value={pet}>
                {pet}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              borderRadius: "2opx",
              flex: { xs: 1, md: 0 },
              minWidth: { md: "120px" },
              height: "56px",
            }}
          >
            Search
          </Button>
        </Stack>
      </Paper>
    </LocalizationProvider>
  );
}
