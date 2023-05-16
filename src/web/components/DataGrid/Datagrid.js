import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Datagrid = (props) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        sx={{
          border: "none",
          backgroundColor: "#fff",
          fontSize: "16px",
          fontFamily: "Jost-Regular",
          display: "flex",
          justifyContent: "center",
          "& .bg-color": {
            color: "#fff",
            backgroundColor: "#91c6c8",
            fontSize: "20px",
            fontFamily: "Jost-Regular",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "flex",
            justifyContent: "center",
          },
        }}
        rows={props.data}
        columns={props.columns}
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
