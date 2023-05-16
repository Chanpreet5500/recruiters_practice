import {
  Box,
  Button,
  Typography,
  styled,
  TableRow,
  TableCell,
} from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  paddingLeft: "50px",
  paddingTop: "50px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0px !important",
    paddingTop:'0px',
  },
}));

export const HeadingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontFamily: "Jost-Medium",
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    "& .css-1dwez62-MuiTypography-root": {
      fontSize: "30px",
    },
  },
}));

export const HeadingText = styled(Typography)(({ theme }) => ({
  fontFamily: "Jost-Bold",
  fontSize: "22px",
  margin: "32px 0px",
  color: "#fff",
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const Buttons = styled(Button)(({ theme }) => ({
  background: "#91c6c8",
  fontFamily: "Jost-Medium",
  height: "48px",
  borderRadius: "50px",
  display: "flex",
  color: "#ffffff",
  border: "none",
  fontSize: "16px",
  padding: "0px 35px",
  textTransform: "inherit",
  "&:hover": {
    boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.35)",
    background: "#91c6c8",
  },
  [theme.breakpoints.down("md")]: {
    height: "42px",
    padding: "0px 22px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "38px",
    padding: "0px 18px",
  },
}));

export const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#ffffff",
  display: "block",
  marginBottom: "30px",
  marginTop: "20px",
  maxWidth: "50%",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

export const TableHeader = styled(Box)(({ theme }) => ({}));

export const ButtonPurchaseContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "5px 10px",
  // background: "#fff",
  // backgroundColor:"#0c0058",
  borderRadius: "4px",
  fontSize: "1rem",
  color: "#0c0058",
  marginBottom: "5px",
  display: "flex",
  alignContent: "center",
  justifyContent: "space-around",
  cursor: "pointer",
}));

export const CustomRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  padding: "0px 10px",
  background: "#fff",
  fontSize: "1rem",
  color: "#0c0058",
  marginBottom: "5px !important",
  borderRadius: "5px !important",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  "&:hover": {
    color: "#fff",
    background: "#91c6c8",
  },
  "& .MuiDataGrid-root": {
    borderRadius: "50px",
  },
}));

export const CustomCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  textAlign: "left",
  fontFamily: "inherit",
  fontSize: "inherit",
  // paddingLeft:'0px',
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const Image = styled("img")(({ theme }) => ({
  height: "4rem",
  flexBasis: "30%",
}));

export const ProductDetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-evenly",
}));

export const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
}));

export const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
}));

export const ProductPrice = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  width: "20%",
}));
