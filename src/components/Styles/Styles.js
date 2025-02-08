import { styled } from "@mui/material/styles";
import { Box, TableCell, Typography } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
}));

export const StyledTitle = styled(Typography)({
  fontWeight: "bold",
});

export const StyledSummarySection = styled(Box)({
  marginBottom: "16px",
});

export const StyledTableContainer = styled(Box)({
  overflowX: "auto",
});

export const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  whiteSpace: "nowrap",
});
