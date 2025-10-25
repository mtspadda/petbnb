import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

function LocationSearch() {
  const [location, setLocation] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.length < 3) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=5`,
        );
        const data = await response.json();
        setOptions(
          data.map((item) => ({
            label: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          })),
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
      setLoading(false);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <Autocomplete
      fullWidth
      options={options}
      loading={loading}
      onInputChange={(event, newValue) => setLocation(newValue)}
      onChange={(event, newValue) => {
        if (newValue) {
          console.log("Selected coordinates:", newValue.lat, newValue.lng);
          // Save coordinates here
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          variant="outlined"
          placeholder="Enter location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default LocationSearch;
