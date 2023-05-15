import React from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



export const CustomDrawer =styled(Drawer)(({theme})=>({
  "& .MuiPaper-root":{
    padding:'0px 20px',
    overflowY:'inherit',
    backgroundColor: "#5b5ba5 !important",
    // transition:"0.3s ease-in",
    [theme.breakpoints.down("md")]:{
      width:"90px",
    }
  },
}))

export const LogoSmall = styled(Box)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  margin: "20px 0px 40px",
  background: "#281d60",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const SmallLogoImage = styled("img")(({ theme }) => ({
  height: "45px",
}));

export const LargeLogoImage = styled("img")(({ theme }) => ({
  // height:'45px',
}));

export const LogoLarge = styled(Box)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  margin: "20px 0px 40px",
  background: "#281d60",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const LogoLarge2 = styled(Box)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  margin: "20px 0px 40px",
  background: "#281d60",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const TestText = styled(Typography)(({ theme }) => ({
  fontFamily: "Jost-Regular",
  color: "#fff !important",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  flex: "1",
  display: "flex",
  alignItems: "center",
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontFamily: "Jost-Bold !important",
  color: "#0c0058",
  display: "block",
  width: "100%",
}));

export const UserImage = styled(Avatar)(({ theme }) => ({
  width: "50px",
  height: "50px",
  border: "2px solid #5b7585 !important",
  display:"inline-block",
  borderRadius:'50px',
}));

export const UserBox = styled(Box)(({ theme }) => ({
  padding: "10px",
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}));

export const UserSection = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  paddingLeft: "65px",
  paddingTop: "6px",
  paddingRight: "20px",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "left",
  minHeight: "50px",
  padding: "10px 20px 10px 65px",
  cursor: "pointer",
}));

export const OnlineBadge = styled(Badge)(({ theme }) => ({
  "& .css-1llwt7-MuiBadge-badge":{
    backgroundColor: "#4ad294",
    width:'10px',
    height:"10px"
  }
}));

export const ButtonInform = styled("button")(({ theme }) => ({
  width: "100%",
  border: "0px",
  backgroundColor: "transparent",
}));

export const ListContainer = styled(List)(({ theme }) => ({
  display: "flex",
  listStyle: "none",
  flexDirection: "column",
  width: "100%",
  marginTop: "40px",
  marginBottom:'1.1rem',
  "& .css-ud9ssv-MuiList-root":{
    paddingTop:"0px",
  }
}));

export const Listitems = styled(ListItem)(({ theme }) => ({
  display: "block",
  marginBottom: "25px",
  padding: "0px",
}));

export const Links = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 10px 10px 20px",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "12px",
  maxHeight: "50px",
  "&:hover": {
    background: "rgba(206, 223, 233, 0.4)",
    // fontFamily: "Jost-Bold !important",
    color: "#fff",
  },
  "&.active": {
    background: "rgba(206, 223, 233, 1)",
    fontFamily: "Jost-Bold !important",
    fontWeight: "700 !important",
    color: "#0c0058",
  },
  [theme.breakpoints.down("md")]: {
    paddingLeft: "13px !important",
    // maxHeight:'40px'
  },
}));

export const ListText = styled(Typography)(({ theme }) => ({
  marginLeft: "10px",
  fontFamily: "inherit !important",
  fontSize: "18px",
  color: "#0c0058",
  // '&:hover'
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const LanguageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const LanguageImage = styled("img")(({ theme }) => ({
  width: "32px",
  height: "32px",
  opacity: "0.5",
  transition: "all 0.5s",
  margin: "auto 3px",
  marginRight: "1rem",
  "&:hover": {
    cursor: "pointer",
    opacity: 1,
  },
  [theme.breakpoints.down("md")]: {
    // flexDirection:"column",
  },
}));

export const ModalBox = styled(Menu)(({ theme }) => ({
  borderRadius: "8px",
  boxShadow: "(0, 2px, 18px, 0, rgba(0, 0, 0, 0.08))",
  padding: "10px !important",
  top:"52px",
  "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
    width: "200px !important",
    borderRadius: "8px",
    boxShadow:"none",
  },
  "& .css-6hp17o-MuiList-root-MuiMenu-list":{
    padding:'10px',
  },
}));

export const ModalBoxLinks = styled(Link)(({ theme }) => ({
  display: "block",
  padding: "12px 23px !important",
  fontSize: "15px",
  color: "#000000",
  borderRadius: "8px",
  margin: "5px 0px",
  width: "100%",
  "&:hover": {
    background: "#cedee8",
    color: "#000000",
    cursor: "pointer",
  },
}));

export const LogoutContainer = styled(Box)(({ theme }) => ({
  // height: "20px",
  width: "100%",
  // marginLeft: "10px",
  // borderWidth: "2px !important",
  display:'flex',
  justifyContent:'start',
  gap:'5px',
}));

export const LeftRightarrow = styled("img")(({ theme }) => ({
  width: "25px",
  height: "25px",
  margin: "7px",
}));

export const MinimizeArrow = styled(Box)(({ theme }) => ({
  background: "#281d60",
  borderRadius: "10px",
  width: "40px",
  height: "40px",
  position: "absolute",
  left: "252px",
  bottom: "0px",
  color: "#5b7585",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  display: "block !important",
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}));

export const MaximizeArrow = styled(Box)(({ theme }) => ({
  background: "#e4f0f8",
  borderRadius: "0px 10px 0px 0px",
  width: "40px",
  height: "40px",
  position: "absolute",
  right: "-39px",
  bottom: "0px",
  color: "#5b7585",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  display: "block !important",
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}));

export const DownArrowIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  color: "#281d60",
  fontSize: "27px",
  fontFamily:'Jost-Bold !important',
  marginLeft:'22px',
  marginTop:'5px',
  [theme.breakpoints.down("md")]:{
    display:'none',
  }
}));

export const UpArrowIcon = styled(KeyboardArrowUpIcon)(({ theme }) => ({
  color: "#281d60",
  fontSize: "27px",
  fontFamily:'Jost-Bold',
  marginLeft:'22px',
  marginTop:'5px',
  [theme.breakpoints.down("md")]:{
    display:'none',
  }
}));
