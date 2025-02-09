import React, { useState } from "react";
import { useFarmData } from "../../mockData";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  StyledContainer,
  StyledTitle,
  StyledSummarySection,
  StyledTableContainer,
  StyledTableCell,
} from "../Styles/Styles";
import Searchbar from "../Searchbar/Searchbar";

export default function Summaries() {
  const { data, isLoading, error } = useFarmData();
  const [query, setQuery] = useState("");

  const filterFarmData = Array.from(data).filter((row) => {
    const regex = new RegExp(
      query.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"),
      "i"
    );

    return Object.values({
      farm: row.farm || "",
      variety: row.variety || "",
      yield: row.yield || "",
      date: row.date || "",
      harvestedBy: row.harvestedBy || "",
    }).some((value) => regex.test(value.toString()));
  });

  const totalYield = filterFarmData.reduce((acc, curr) => acc + curr.yield, 0);
  const yieldByVariety = filterFarmData.reduce((acc, curr) => {
    acc[curr.variety] = (acc[curr.variety] || 0) + curr.yield;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <StyledContainer component="section">
        <StyledTitle align="center" variant="h6" role="status" aria-live="polite">
          <CircularProgress size={24} /> Loading farm data, please wait...
        </StyledTitle>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer component="section">
        <StyledTitle align="center" variant="h6" color="error" role="alert">
          {error}
        </StyledTitle>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer component="section">
      <StyledTitle variant="h4" gutterBottom component="h1">
        Farm Harvest Data
      </StyledTitle>

      <StyledSummarySection component="section">
        <StyledTitle variant="h6" component="h2">
          Summary
        </StyledTitle>
        <Typography>Total Yield: {totalYield} kg</Typography>
        <ul>
          {Object.entries(yieldByVariety).map(([variety, yieldAmount]) => (
            <li key={variety}>
              <Typography>{variety}: {yieldAmount} kg</Typography>
            </li>
          ))}
        </ul>
      </StyledSummarySection>

      <Searchbar query={query} setQuery={setQuery} aria-label="Search farm data" />

      {query && (
        <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
          {filterFarmData.length} result(s) found
        </Typography>
      )}

      {filterFarmData.length === 0 && query ? (
        <StyledTitle align="center" variant="h6" color="error">
          No search results found
        </StyledTitle>
      ) : (
        <StyledTableContainer>
          <TableContainer component={Paper}>
            <Box sx={{ overflowX: "auto" }}>
              <Table aria-labelledby="table-caption" role="table">
                <caption
                  id="table-caption"
                  style={{ textAlign: "left", padding: "8px" }}
                >
                  Detailed harvest data for different farms, including variety,
                  yield, and harvesters.
                </caption>
                <TableHead>
                  <TableRow role="row">
                    <StyledTableCell scope="col" role="columnheader">Farm</StyledTableCell>
                    <StyledTableCell scope="col" role="columnheader">Variety</StyledTableCell>
                    <StyledTableCell scope="col" role="columnheader">Yield (kg)</StyledTableCell>
                    <StyledTableCell scope="col" role="columnheader">Date</StyledTableCell>
                    <StyledTableCell scope="col" role="columnheader">Harvested By</StyledTableCell>
                    <StyledTableCell scope="col" role="columnheader">Category</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterFarmData.map(
                    ({
                      id,
                      farm,
                      variety,
                      yield: yieldAmount,
                      date,
                      harvestedBy,
                      category,
                    }) => (
                      <TableRow key={id} role="row">
                        <StyledTableCell role="cell">{farm}</StyledTableCell>
                        <StyledTableCell role="cell">{variety}</StyledTableCell>
                        <StyledTableCell role="cell">{yieldAmount}</StyledTableCell>
                        <StyledTableCell role="cell">{date}</StyledTableCell>
                        <StyledTableCell role="cell">{harvestedBy}</StyledTableCell>
                        <StyledTableCell role="cell">{category}</StyledTableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </StyledTableContainer>
      )}
    </StyledContainer>
  );
}
