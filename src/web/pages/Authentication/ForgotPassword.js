import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Logo from "recruitment-images/logo-recruiters.svg";
import LoginBg from "recruitment-images/portal.png";
import Input from "recruitment-components/Input/Input.js";
import { useStoreActions } from 'easy-peasy';
import Button from "recruitment-components/Button/Button.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoginImgLeft, LogoImg, StyleGrid, StyledChildFormGrid, StyledLoginImageLeft, StyledLoginLogo, StyleParentGrid, FormTitle, StyledForgotPassword, StyledGoBack } from '../../styledComponent/StyledComponents';
import { Grid } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = (props) => {
  const [email, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const forgetPassword = useStoreActions((actions) => actions.authentication.forgetPassword);
  const history = useHistory();
  const forgetUser = async () => {
    setEmailError(false);

    if (email.trim() == '') {
      setEmailError(true);
      return false;
    }

    setDisableButton(true);
    let formData = { email: email, roleType: 'client' }
    let response = await forgetPassword(formData);
    setDisableButton(false);
  }
  return (
    <React.Fragment>
      <StyledLoginLogo container>
        <LogoImg src={Logo} />
      </StyledLoginLogo>
      <StyleGrid>
        <StyleParentGrid >
          <StyledLoginImageLeft item>
            <LoginImgLeft src={LoginBg} />
          </StyledLoginImageLeft>
          <StyledForgotPassword item>
            <StyledChildFormGrid>
              <form>
                <FormTitle variant='h5'>Forgot Password</FormTitle>
                <Input
                  label={"Email Address"}
                  type={'text'}
                  value={email}
                  handleInputChange={(e) => setEmailAddress(e.target.value)}
                  handleInputKeyPress={(event) => (event.key === 'Enter' ? forgetUser() : '')}
                  error={emailError}
                  errorMessage={"Please enter valid email."}
                />
                <Grid>
                  <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : forgetUser()} label={"Submit"} disableBtn={disableButton} />
                </Grid>
                <Grid>
                  <StyledGoBack onClick={() => { history.goBack() }} variant='a'>
                    <ArrowBackIcon fontSize='small' /> Go Back
                  </StyledGoBack>
                </Grid>
              </form>
            </StyledChildFormGrid>
          </StyledForgotPassword>
        </StyleParentGrid>
      </StyleGrid>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
    </React.Fragment>
  );
};

export default ForgotPassword;
