import React, { useState } from "react";
import { useFarmData } from "../../mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {
  StyledContainer,
  StyledTitle,
  StyledSummarySection,
  StyledTableContainer,
  StyledTableCell,
} from "../Styles/Styles";
import Searchbar from "../Searchbar/Searchbar";

export default function Problem() {
  const { data, isLoading, error } = useFarmData();
  const [query, setQuery] = useState("");

  const filterFarmData = Array.isArray(data)
    ? data.filter((row) =>
        Object.values({
          farm: row.farm || "",
          variety: row.variety || "",
          yield: row.yield || "",
          date: row.date || "",
          harvestedBy: row.harvestedBy || "",
        }).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      )
    : [];

  if (isLoading) {
    return (
      <StyledTitle align="center" variant="h6" role="status" aria-live="polite">
        Loading data...
      </StyledTitle>
    );
  }

  if (error) {
    return (
      <StyledTitle align="center" variant="h6" color="error" role="alert" sx={{ color: "red" }}>
        {error}
      </StyledTitle>
    );
  }

  const totalYield = data.reduce((acc, curr) => acc + curr.yield, 0);
  const yieldByVariety = data.reduce((acc, curr) => {
    acc[curr.variety] = (acc[curr.variety] || 0) + curr.yield;
    return acc;
  }, {});

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
        {Object.entries(yieldByVariety).map(([variety, yieldAmount]) => (
          <Typography key={variety}>
            {variety}: {yieldAmount} kg
          </Typography>
        ))}
      </StyledSummarySection>

      {/* Pass query state to Searchbar */}
      <Searchbar query={query} setQuery={setQuery} />

      <StyledTableContainer>
        <TableContainer component={Paper}>
          <Table aria-labelledby="table-caption">
            <caption
              id="table-caption"
              style={{ textAlign: "left", padding: "8px" }}
            >
              Detailed harvest data for different farms, including variety,
              yield, and harvesters.
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell scope="col">Farm</StyledTableCell>
                <StyledTableCell scope="col">Variety</StyledTableCell>
                <StyledTableCell scope="col">Yield (kg)</StyledTableCell>
                <StyledTableCell scope="col">Date</StyledTableCell>
                <StyledTableCell scope="col">Harvested By</StyledTableCell>
                <StyledTableCell scope="col">Category</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterFarmData.map(
                ({ id, farm, variety, yield: yieldAmount, date, harvestedBy, category }) => (
                  <TableRow key={id}>
                    <StyledTableCell>{farm}</StyledTableCell>
                    <StyledTableCell>{variety}</StyledTableCell>
                    <StyledTableCell>{yieldAmount}</StyledTableCell>
                    <StyledTableCell>{date}</StyledTableCell>
                    <StyledTableCell>{harvestedBy}</StyledTableCell>
                    <StyledTableCell>{category}</StyledTableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTableContainer>
    </StyledContainer>
  );
}
