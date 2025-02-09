import React, { useState } from "react";
import { useFarmData } from "../../mockData";
import { Typography } from "@mui/material";
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

  // Filter farm data using regex directly in the filter method
  const filterFarmData = Array.from(data).filter((row) => {
    const regex = new RegExp(
      query.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"),
      "i"
    );

    // Check if any field in the row matches the regex
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
      <StyledTitle align="center" variant="h6" role="status" aria-live="polite">
        Loading data...
      </StyledTitle>
    );
  }

  if (error) {
    return (
      <StyledTitle
        align="center"
        variant="h6"
        color="error"
        role="alert"
        sx={{ color: "red" }}
      >
        {error}
      </StyledTitle>
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
        <Typography>
          Total of each Yield:
          {Object.entries(yieldByVariety).map(([variety, yieldAmount]) => (
            <Typography key={variety}>
              {variety}: {yieldAmount} kg
            </Typography>
          ))}
        </Typography>
      </StyledSummarySection>

      <Searchbar query={query} setQuery={setQuery} />

      {filterFarmData.length === 0 && query ? (
        <StyledTitle align="center" variant="h6" color="error">
          No search results found
        </StyledTitle>
      ) : (
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
                  ({
                    id,
                    farm,
                    variety,
                    yield: yieldAmount,
                    date,
                    harvestedBy,
                    category,
                  }) => (
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
      )}
    </StyledContainer>
  );
}
