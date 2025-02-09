import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import debounce from "lodash.debounce";

export default function Searchbar({ query, setQuery }) {
  const debounceSetQuery = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 100),
    [setQuery]
  );
  return (
    <div>
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => debounceSetQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
    </div>
  );
}
