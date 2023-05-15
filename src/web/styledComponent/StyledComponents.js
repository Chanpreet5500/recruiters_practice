import { Grid, TextField, Typography, Box, Modal, Button } from "@mui/material";
import { styled } from "@mui/material";


/************************* login styled components*********************/

export const StyledLoginLogo = styled(Grid)(({ theme }) => ({
    left: "40px",
    top: "40px",
    [theme.breakpoints.down("sm")]: {
        marginLeft: "18px"
    },
}))

export const LogoImg = styled("img")(({ theme }) => ({
    marginLeft: "30px",
    marginTop: "30px",
    height: "90px",
    width: "330px",
    [theme.breakpoints.down("sm")]: {
        height: "90px",
        width: "330px",
    },
    [theme.breakpoints.down("md")]: {
        height: "90px",
        width: "330px",
    },
}))

export const StyledLoginParent = styled(Grid)(({ theme }) => ({
    height: "130px",
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        height: "145px",
        justifyContent: "center"
    },
    [theme.breakpoints.up("sm")]: {
        justifyContent: "space-between !important"
    },
    [theme.breakpoints.down("md")]: {
        justifyContent: "center"

    },
}))

export const StyleGrid = styled(Grid)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "auto !important",
    display: "grid",
    marginTop: "10px",
    placeItems: "center",
    justifyContent: "center",
    "& .MuiGrid-container": {
        height: "auto"
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "20px",
        height: "225px"
    }
}))

export const StyledParentGrid = styled(Grid)(({ theme }) => ({
    top: "0px",
    borderRadius: " 10px",
    bottom: "0px",
    width: "80%",
    height: "560px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#91c6c8",
    [theme.breakpoints.down("sm")]: {
        height: "750px",
        width: "100% !important",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
        height: "750px",
        width: "100%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
    },

}))

export const StyledLoginImageLeft = styled(Grid)(({ theme }) => ({
    display: "flex",
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingTop: "20px"
    },
    [theme.breakpoints.down("md")]: {
        width: "100%",
        paddingTop: "20px"
    }
}))

export const LoginImgLeft = styled("img")({
    maxWidth: "100%",
    maxHeight: "435px"
})

export const StyledChildFormGrid = styled(Grid)(({ theme }) => ({
    padding: "20px",
    margin: '0px 40px',
    [theme.breakpoints.down("sm")]: {
        padding: "0px"
    },
    [theme.breakpoints.down("md")]: {
        padding: "0px"
    }

}))

export const StyledLoginForm = styled(Grid)(({ theme }) => ({
    width: "45%",
    paddingTop: "120px",
    [theme.breakpoints.down("sm")]: {
        paddingTop: "0px",
        width: "100%"
    },
    [theme.breakpoints.down("md")]: {
        paddingTop: "0px",
        width: "100%"
    },
}))

export const StyledButtonGrid = styled(Grid)({
    borderRadius: "20px"
})


/************************* forgotPassword styled components*********************/


export const StyleParentGrid = styled(Grid)(({ theme }) => ({
    top: "25px",
    borderRadius: " 10px",
    bottom: "0px",
    width: "70%",
    height: "400px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#91c6c8",
    [theme.breakpoints.down("sm")]: {
        height: "595px",
        width: "100% !important",
        display: "flex",
        flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
        height: "650px",
        width: "100%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
    },
}))

export const StyledForgotPassword = styled(Grid)(({ theme }) => ({
    width: "45%",
    paddingTop: "80px",
    [theme.breakpoints.down("sm")]: {
        paddingTop: "10px",
        width: "100%"
    },
    [theme.breakpoints.down("md")]: {
        paddingTop: "10px",
        width: "100%"
    },
}))

export const FormTitle = styled(Typography)({
    display: "block",
    fontFamily: "Jost-Bold !important",
    fontSize: " 30px",
    fontWeight: "600",
    color: "white",
    marginBottom: '20px !important'
})

export const StyledForgetPassword = styled(Grid)({
    textAlign: "right",
    marginTop: "-10px",
    marginBottom: " 25px"
})

export const ForgotPassword = styled(Typography)({
    color: "#0c0058",
    cursor: "pointer",
    fontFamily: "Jost-Medium",
    fontSize: "13px"
})


/************************* register styled components*********************/

export const StyledRegister = styled(Grid)({
    color: "#0c0058",
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "Jost-Medium",
    fontSize: "13px"
})

export const StyledGoBack = styled(Grid)({
    color: "#0c0058",
    cursor: "pointer",
    fontFamily: "Jost-Medium",
    padding: "20px",
    fontSize: "13px"
})

export const StyledRegisterParentGrid = styled(Grid)(({ theme }) => ({
    borderRadius: " 10px",
    width: "80%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    backgroundColor: "#91c6c8",
    [theme.breakpoints.down("sm")]: {
        height: "auto",
        width: "100% !important",
        display: "flex",
        padding: "20px 40px 20px 40px",
        marginTop: "30px",
        flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
        height: "auto",
        padding: "20px 40px 20px 40px",
        width: "100%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
    },
}))

export const StyledFlagGrid = styled(Grid)(({ theme }) => ({
    marginTop: "50px",
    marginRight: "60px",
    height: "100px",
    [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
    },
    [theme.breakpoints.up("sm")]: {
        marginTop: "44px !important",
    },
    [theme.breakpoints.down("md")]: {
        marginTop: "20px",
    }
}))

export const StyledImg = styled("img")({
    width: "32px",
    height: "32px",
    opacity: "0.5",
    transition: "all 0.5s",
    margin: "auto 3px",
    marginRight: "1rem",
    "&:hover": {
        cursor: "pointer",
        opacity: "1"
    },
})

export const StyledMainGrid = styled(Grid)({
    width: "70%",
    height: "800px",

})

export const StyledRowGrid = styled(Grid)({
    width: "100%",
    height: "100px",
    marginTop: "10px",

})

export const StyledColGrid = styled(Grid)(({ theme }) => ({
    width: "50%",
    height: "100px",
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingRight: "0px",
    },
    [theme.breakpoints.down("md")]: {
        width: "100%"
    },
    [theme.breakpoints.down("lg")]: {
        width: "100%"
    }
}))

export const StyledColumnGrid = styled(Grid)(({ theme }) => ({
    width: "33.3%",
    height: "100px",
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingRight: "0px",
    }
}))


export const StyledRegisterButtonGrid = styled(Grid)(({ theme }) => ({
    width: "40%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
        marginTop: "0px",
    },
    [theme.breakpoints.down("md")]: {
        marginTop: "0px",
    }
}))

export const StyleChildRegisterGrid = styled(Grid)(({ theme }) => ({
    width: "70%",

}))

/************************* resetPassword styled components*********************/

export const StyledParentResetGrid = styled(Grid)(({ theme }) => ({
    top: "25px",
    borderRadius: " 12px",
    bottom: "0px",
    width: "70%",
    height: "550px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#91c6c8",
    [theme.breakpoints.down("sm")]: {
        height: "745px",
        width: "100%",
        display: "flex",
        padding: "20px 40px 20px 40px",
        marginTop: "30px",
        flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
        height: "800px",
        padding: "20px 40px 20px 40px",
        width: "80%",
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
    },
}))

/************************* results styled components*********************/

export const StyledResultParentBox = styled(Box)({
    width: "100%",
    marginTop: "35px",
    paddingTop: "10px"
})

export const StyledResultChildBox = styled(Box)({
    width: "80%",
    marginLeft: "50px",
    height: "95px",
})

export const StyledPageTitle = styled(Typography)({
    display: "block",
    fontSize: "36px",
    fontWeight: "550",
    fontFamily: "Jost-Medium",
    color: "white",
    marginBottom: "10px"
})

export const StyledSpan = styled(Typography)({
    borderColor: "#979797 !important",
    lineHeight: "39px",
    maxHeight: "32px",
    display: "inline-block"
})

export const StyledTitleInfo = styled(Typography)({
    fontSize: "16px",
    color: "white",
    display: "block",
    marginBottom: "30px",
    maxWidth: " 50%"
})

export const StyledInputBox=styled(Box)({
    marginLeft: "50px",
    width: "20%"
})

/************************* overLay styled components*********************/

export const StyledModal = styled(Modal)(({theme})=>({
    width: "100%",
    height: "100%",
    position: "fixed",
    left: "0px",
    top: "0px",
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: " 10",
    display: "flex",
    alignItems: " center",
    justifyContent: "center",
}))

export const StyledBoxOverlay = styled(Box)(({theme})=>({
    width: "45%",
    maxHeight: " 550px !important",
    minHeight: "250px !important",
    background: " #e1f1f1",
    borderRadius: "16px",
    padding: "50px 36px",
    position: "relative",
    overflow: "auto",
    "&.mediumWrapper": {
        width: "50vw"
    },
    [theme.breakpoints.down("sm")]:{
        width:"95% !important",
        maxHeight: " 550px !important",
        padding: "30px 36px",
    },
  
}))

export const StyledCross = styled(Typography)({
    position: "absolute",
    right: "25px",
    top: "15px",
    color: "#0c0058",
    fontSize: "24px",
    zIndex: " 1"
})

export const StyledTitle = styled(Typography)({
    fontSize: "30px",
    fontFamily: "Jost-Bold",
    color: "#0c0058",
    display: " block",
    textAlign: "center",
    marginBottom: "10px"
})

export const StyledPopupSubTitle = styled(Typography)(({theme})=>({
    fontSize: "15px",
    color: "#0c0058",
    display: "block",
    textAlign: "center",
    marginBottom: "20px",
    width: "315px !important",
    margin: "10px 30px 20px 120px !important",
    [theme.breakpoints.down("lg")]:{
        margin: "0 auto !important",
        marginBottom:"20px !important"
    },
}))

export const StyledButtonBox = styled(Box)({
    textAlign: "center"
})

export const StyledHyperlink = styled(Typography)({
    color: "#0c0058",
})

export const StyledPopupFooter = styled(Box)({
    color: "#0c0058",
})

export const UnStyledButton = styled(Button)({
    background: " #ffffff",
    fontFamily: "Jost-Medium",
    height: "40px",
    bordeRadius: "50px",
    border: "1px solid #b6bbc1",
    color: "#485465",
    fontSize: "16px",
    display: " inline-block",
    padding: "0px 20px",
    minWidth: " 128px"
})

/************************* emailOverLay styled components*********************/

export const StyledSelectBox=styled(Box)({
    marginBottom: "20px"
})

export const StyledLable=styled(Typography)({
    fontSize:" 16px",
    fontFamily: "Jost-Regular",
    fontWeight: "500",
    color: "#0c0058",
    marginBottom: "7px",
    display: "block",
    "& .invite-label ":{
      color: "#0c0058"
    }
})