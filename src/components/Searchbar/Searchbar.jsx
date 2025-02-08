import React from "react";
import { Typography, TextField } from "@mui/material";

export default function Searchbar({ query, setQuery }) {
  return (
    <div>
      <Typography variant="h6">Filterbar</Typography>
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
    </div>
  );
}
