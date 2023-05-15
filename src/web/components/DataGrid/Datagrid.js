import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Datagrid = (props) => {
  return (
    <Box>
      <DataGrid sx={props.sx} rows={props.data} columns={props.columns} />
    </Box>
  );
};

export default Datagrid;
