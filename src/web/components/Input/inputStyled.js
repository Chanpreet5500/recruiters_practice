import { Box, TextField, Typography ,styled} from "@mui/material";

export const InputBoxMain = styled(Box)(({ theme }) => ({
    display: 'block',
    marginBottom: '35px',
    width: '100%',
    // maxWidth:'376px',
}))

export const TypographyLabel = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontFamily: "Jost-Regular",
    color: '#fff',
    marginBottom: '7px !important',
    display: 'block',
    margin: '0px',
}))

export const IconBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '12px',
    right: '15px',
    cursor: 'pointer',
    color: '#b9b2b2',
    fontSize: '16px',
}))

export const TypographySpan = styled(Typography)(({ theme }) => ({
    background: '#ff7d6b',
    width: '16px',
    minWidth: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    borderRadius: '50%',
    marginTop: '4px',
    paddingTop: '2px',
    marginRight: '8px',
}))

export const ErrorMessageBox = styled(Box)(({ theme }) => ({
    fontSize: '12px',
    fontFamily: 'Jost-Medium',
    color: '#ed6363',
    display: 'flex',
    position: 'absolute',
    paddingTop: '2px',
    marginTop:'4px'
}))

export const InputTextField = styled(TextField)(({ theme }) => ({
   
    width: "100%",
    color: "#0c0058",
    input: {
        background: '#ffffff !important',
        borderRadius: "8px",
        boxShadow: '0 2px 18px 0 rgba(0, 0, 0, 0.08)',
        width: '100%',
        border: 'none',
        paddingRight: '35px',
        fontSize: '16px',
        color: '#0c0058',
        display: 'block',
        padding: '15px',
        border:"1px solid #0c0058",
        height: '48px',
        padding:0,
        paddingLeft: '15px'       
       
    },
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
          borderColor:'transparent',
           
        }
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
            borderColor:'transparent',
           
        }
      }

}))