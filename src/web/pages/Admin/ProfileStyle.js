import { Box, Typography, styled } from "@mui/material";

export const HeadingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down('sm')]:{
    flexDirection:'column',
  }
}));

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontFamily: "Jost-Medium",
  color: "#ffffff",
  [theme.breakpoints.down('sm')]:{
    fontSize: "30px",
  }
}));

export const HeadingText = styled(Typography)(({ theme }) => ({
  fontFamily: "Jost-Bold",
  fontSize: "22px",
  margin: "32px 0px",
  color: "#fff",
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  // width: "70%",
}));

export const ShortContainer = styled(Box)(({ theme }) => ({
  width: "58%",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    width: "57%",
  },
  [theme.breakpoints.down("md")]: {
    width: "56%",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const InputContainer = styled(Box)(({theme})=>({
  width:"48%",
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    // width: "100%",
  },
}))

export const LongContainer = styled(Box)(({ theme }) => ({
  width: "58%",
  [theme.breakpoints.down("lg")]: {
    width: "57%",
  },
  [theme.breakpoints.down("md")]: {
    width: "56%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const SelectLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontFamily: "Jost-Regular",
  color: "#fff",
  marginBottom: "7px",
}));

export const SelectBox = styled(Box)(({ theme }) => ({
//   width: "35%",
  // minWidth:'260px',
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    // minWidth:'212px',
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom:"30px",
  },
}));
