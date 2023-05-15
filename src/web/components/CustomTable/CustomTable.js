import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomTable = (props) => {
  console.log(props);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple-table">
        <TableHead>
          <TableRow sx={props.rowSx}>
            {props.columns.map((obj) => {
              {
                /* console.log(obj) */
              }
              return <TableCell sx={props.rowCellSx}>{obj}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((obj) => {
            return (
              <TableRow>
                {obj.map((val) => {
                  return <TableCell sx={props.bodyCellSx}>{val}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
