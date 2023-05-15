import { styled } from '@mui/material'
import { Box, MenuItem, Select, Typography } from '@mui/material'

export const MenuOptions = styled(MenuItem)(({ theme }) => ({
  display: "block",
  padding: "6px 10px",
  fontSize: "15px",
  color: "#0c0058",
  borderRadius: "5px",
  margin: "0px 0px",

  "&:hover": {
    background: "#e4f0f8",
    color: "#0c0058",
    cursor: "pointer",
  },
}));

export const BoxErrorMessage = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  fontFamily: "Jost-Medium",
  color: "#ed6363",
  display: "flex",
  position: "absolute",
  paddingTop: "2px",
}));

export const TypographyErrorSpan = styled(Typography)(({ theme }) => ({
  background: "#ff7d6b",
  width: "16px",
  minWidth: "16px",
  height: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  borderRadius: "50%",
  paddingTop: "2px",
  marginRight: "8px",
}));

export const SelectBarSingleSelect = styled(Select)(({ theme }) => ({
  height: "48px",
  width: "450px",
  background: "white",
  color: "#0c0058",
  borderRadius: "8px",
  boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.08)",
  paddingRight: "35px",
  padding: "15px",
}));

export const TypographySelectLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontFamily: "Jost-Regular",
  color: "#fff",
  marginBottom: "7px",
  display: "block",
}));
