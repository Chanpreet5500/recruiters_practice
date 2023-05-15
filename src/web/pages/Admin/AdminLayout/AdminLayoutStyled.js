import { Box, styled } from "@mui/material";

export const MainContainer=styled(Box)(({theme})=>({
    display: 'flex',
    // transition:"0.2s ease-in",
    // paddingLeft:'291px',
    [theme.breakpoints.down('md')]:{
        paddingLeft:'91px',

    }
}));

export const MainBody =styled(Box)(({theme})=>({
    width:'100%',
    [theme.breakpoints.down("sm")]:{
        padding:'60px 30px !important',
    }
}))