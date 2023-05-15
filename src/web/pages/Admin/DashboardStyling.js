import { Box, TextField, Typography, styled } from "@mui/material";

export const DateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#ffffff",
  padding: "0px 3px",
  fontFamily: "Jost-Regular",
  display: "block",
  margin: "-20px 0px 20px",
}));

export const GreetingHeading = styled(Typography)(({ theme }) => ({
  display: "block",
  fontSize: "36px",
  fontFamily: "Jost-Medium",
  color: "#ffffff",
  marginBottom: "5px",
}));

export const TittleInfo = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#ffffff !important ",
  display: "block",
  fontFamily: "Jost-Regular",
  marginBottom: "30px",
  maxWidth: "100%",
}));

export const FormField = styled(Box)(({ theme }) => ({
  // position: "relative",
  // height: "40px",
}));

export const InputField = styled(TextField)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0, 2px, 18px, 0, rgba(0, 0, 0, 0.08)",
  minWidth:'280px',
  height: "40px",
  fontSize: "16px",
  "& .MuiOutlinedInput-root:hover":{
    "&>fieldset":{
      cursor:"pointer",
      borderColor:'transparent',
      borderRadius:"8px",
    },
    "&:hover":{
      cursor:"pointer"
    }
  },
  [theme.breakpoints.down('sm')]:{
    minWidth:'220px',
  },
}));

export const MainContainer = styled(Box)(({ theme }) => ({
    display:"flex",
    flexWrap:"wrap",
    padding:0,
    margin:0,
    justifyContent:'space-between'
}));

export const ChartContainer = styled(Box)(({ theme }) => ({
    width:"49%",
    [theme.breakpoints.down('sm')]: {
      width:"100%",
    },
}));

export const RangePickerContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 999,
}));