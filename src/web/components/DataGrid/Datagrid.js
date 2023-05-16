import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Datagrid = (props) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        sx={props.sx}
        rows={props.data}
        columns={props.columns}
        // hideFooter={true}
        // hideFooterPagination={true}
        // hideFooterSelectedRowCount={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Box>
  );
};

export default Datagrid;
