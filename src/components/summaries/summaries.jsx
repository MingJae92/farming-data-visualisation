import { useFarmData } from "../../mockData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function Problem() {
  const { data, isLoading } = useFarmData();

  if (isLoading) {
    return <Typography align="center" variant="h6">Loading data...</Typography>;
  }

  const totalYield = data.reduce((acc, curr) => acc + curr.yield, 0);
  const yieldByVariety = data.reduce((acc, curr) => {
    acc[curr.variety] = (acc[curr.variety] || 0) + curr.yield;
    return acc;
  }, {});

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>Farm Harvest Data</Typography>

      <div style={{ marginBottom: "16px" }}>
        <Typography variant="h6">Summary</Typography>
        <Typography>Total Yield: {totalYield} kg</Typography>
        {Object.entries(yieldByVariety).map(([variety, yieldAmount]) => (
          <Typography key={variety}>{variety}: {yieldAmount} kg</Typography>
        ))}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Farm</TableCell>
              <TableCell>Variety</TableCell>
              <TableCell>Yield (kg)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Harvested By</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, farm, variety, yield: yieldAmount, date, harvestedBy, category }) => (
              <TableRow key={id}>
                <TableCell>{farm}</TableCell>
                <TableCell>{variety}</TableCell>
                <TableCell>{yieldAmount}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{harvestedBy}</TableCell>
                <TableCell>{category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
