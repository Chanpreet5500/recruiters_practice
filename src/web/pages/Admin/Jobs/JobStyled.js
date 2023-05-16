import styled from "@emotion/styled";
import {
  Grid,
  Button,
  Typography,
  Box,
  TextField,
  Select,
  Autocomplete,
} from "@mui/material";

export const AddJobButton = styled(Button)(({ theme }) => ({
  float: "right",
  backgroundColor: "#91c6c8",
  color: "#fff",
  borderRadius: "50px",
  fontSize: "16px",
  padding: "10px 30px",
  display: "inline-block",
  border: "none",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#91c6c8",
  },
}));

export const PurchaseTestButton = styled(Button)(({ theme }) => ({
  float: "right",
  backgroundColor: "#91c6c8",
  color: "#fff",
  borderRadius: "50px",
  fontSize: "16px",
  padding: "10px 30px",
  display: "inline-block",
  border: "none",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#91c6c8",
  },
}));

export const JobsHeading = styled(Typography)(({ theme }) => ({
  display: "block",
  fontSize: "36px",
  fontFamily: "Jost-Medium",
  marginBottom: "5px",
  // span: {
  //   borderColor: " #979797 !important",
  //   lineHeight: "39px",
  //   maxHeight: "32px",
  //   display: "inline-block",
  // },
}));

export const JobHeadingChild = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  borderColor: " #979797 !important",
  lineHeight: "39px",
  maxHeight: "32px",
  display: "inline-block",
}));

export const TitleInfo = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  display: "block",
  marginBottom: "30px",
  marginLeft: "0px",
  maxWidth: "50%",
  color: "#fff",
}));

export const SearchText = styled(Box)(({ theme }) => ({
  marginLeft: "0px",
  width: "20% ",
}));

export const SearchJobInput = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  marginBottom: "20px",
}));

export const PageTitle = styled(Box)(({ theme }) => ({
  display: "block",
  fontSize: "36px",
  fontFamily: "$medium",
  color: "$whiteColor",
  marginBottom: "10px",
  div: { display: "inline" },
  span: {
    borderColor: "#979797 !important",
    lineHeight: "39px",
    maxHeight: "32px",
    display: "inline-block",
  },
  small: { fontSize: "20px", fontFamily: "$normal", marginTop: "-10px" },
  button: { marginRight: "10px" },
}));

export const UserImageOuter = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  span: {
    width: "74px",
    height: "74px",
    minHeight: "74px",
    display: "inline-block",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#e4f0f8",
    "@include border-radius(50px)": true,
    marginRight: "20px",
    svg: {
      width: "16px",
      height: "16px",
      margin: "auto",
      transform: "translateY(29px)",
      display: "none",
      color: "#fff",
    },
    "&:hover": {
      WebkitFilter: "brightness(50%) !important",
      cursor: "pointer",
      svg: { display: "block" },
    },
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  background: "#91c6c8 !important",
  borderRadius:"20px",
  float: "right",
  color: "#fff",
  fontFamily: "Jost-Regular !important",
  textTransform: "capitalize !important",
  fontSize: "18px !important",
  padding: "5px 15px !important",
}));

export const MuiButton = styled(Button)(({ theme }) => ({
  // background: "#91c6c8",
  color: "#fff",
  fontFamily: "Jost-Regular",
  textTransform: "capitalize",
  fontSize: "16px",
}));

export const SpinnerBorder = styled(Button)(({ theme }) => ({
  height: "20px",
  width: "20px",
  marginLeft: "10px",
  borderWidth: "2px !important",
}));

export const ManageJobsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginRight: "-15px",
  marginLeft: "-15px",
}));

export const ColSm7 = styled(Box)(({ theme }) => ({
  flex: "0 0 58.33333%",
  maxWidth: "58.33333%",
}));

export const ColMd6 = styled(Select)(({ theme }) => ({
  flex: " 0 0 50%",
  maxWidth: "50%",
}));
export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  color: "#ffffff",
  fontFamily: "Jost-Bold",
  marginBottom: "24px",
  span: { marginRight: "15px" },
  "a.hyperLink": {
    fontSize: "14px",
    color: "#0c0058",
    fontFamily: "Jost-Normal",
    textDecoration: "underline",
  },
  ".addField": {
    fontSize: "14px",
    fontFamily: "Jost-Medium",
    display: "flex",
    cssFloat: "right",
    alignItems: "center",
    marginTop: "15px",
    color: "#222e68",
    "i,\n    svg": { fontSize: "25px", marginRight: "12px", marginTop: "-3px" },
  },
}));

export const ColLg6 = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  maxWidth: "50%",
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));

export const OrganisationUnitSelect = styled(Select)(({ theme }) => ({
  background: "#fff",
  padding: "10px",
  padding: "10px",
  borderRadius: "8px",
  width: "388px",
  margin: "10px",
}));

export const EducationLevel = styled(Select)(({ theme }) => ({
  fontFamily: "Jost-Medium",
  color: "#fff",
  background: "#fff",
  borderRadius: "8px",
}));

export const AutocompleteCity = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  background: "#FFF",
  borderRadius: "8px",
}));

export const ColSm5 = styled(Box)(({ theme }) => ({
  flex: "0 0 41.66667%",
  maxWidth: "41.66667%",
}));

export const FormTitleRight = styled(Box)(({ theme }) => ({
  display: "block",
  fontFamily: '"Jost-Bold"',
  fontSize: "18px",
  margin: "11px",
  color: "#ffffff",
}));

export const ColLg12 = styled(Box)(({ theme }) => ({
  flex: " 0 0 100%",
  maxWidth: "100%",
}));

export const ProductRow = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "5px 10px",
  background: "#fff",
  borderRadius: "4px",
  fontSize: "1rem",
  color: "#0c0058",
  marginBottom: "5px",
  display: "flex",
  alignContent: "center",
  justifyContent: "space-around",
  cursor: "pointer"
}))