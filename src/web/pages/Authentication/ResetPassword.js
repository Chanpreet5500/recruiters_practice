import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from "recruitment-images/logo-recruiters.svg";
import LoginBg from "recruitment-images/portal.png";
import Input from "recruitment-components/Input/Input.js";
import { useStoreActions } from 'easy-peasy';
import { ERROR_INVALID_PASSWORD, ERROR_PASSWORD_NOT_MATCH } from 'recruitment-message';
import Button from "recruitment-components/Button/Button.js";
import { Grid } from '@material-ui/core';
import { LoginImgLeft, LogoImg, StyleGrid, StyledChildFormGrid, StyledLoginImageLeft, StyledLoginLogo, StyledParentResetGrid, FormTitle, StyledForgotPassword, StyledGoBack } from '../../styledComponent/StyledComponents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function ResetPassword(props) {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const resetPassword = useStoreActions((actions) => actions.authentication.resetPassword);

    const resetUser = async () => {
        setPasswordError(false);
        setConfirmPasswordError(false);
        if (password.trim() == '') {
            setPasswordError(true);
            return false;
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError(true);
            return false;
        }

        setDisableButton(true);
        let formData = { token: props.match.params.token, password: password }
        let response = await resetPassword(formData);
        setDisableButton(false);
        if (response) {
            history.push('/login');
        }
    }
    return (
        <React.Fragment>
            <StyledLoginLogo container>
                <LogoImg src={Logo} />
            </StyledLoginLogo>
            <StyleGrid container>
                <StyledParentResetGrid >
                    <StyledLoginImageLeft item>
                        <LoginImgLeft src={LoginBg} />
                    </StyledLoginImageLeft>
                    <StyledForgotPassword item>
                        <StyledChildFormGrid>
                            <form>
                                <FormTitle variant='h5'>Set a new password</FormTitle>
                                <Input
                                    label={"Password"}
                                    type={'password'}
                                    value={password}
                                    // placeholder={"Password"}
                                    handleInputChange={(e) => setPassword(e.target.value)}
                                    // handleInputKeyPress={(event)=>(event.key === 'Enter'|| !disableButton)?resetUser():''}
                                    error={passwordError}
                                    errorMessage={ERROR_INVALID_PASSWORD}
                                />
                                <Input
                                    label={"Confirm Password"}
                                    type={'password'}
                                    value={confirmPassword}
                                    // placeholder={"Password"}
                                    handleInputChange={(e) => setConfirmPassword(e.target.value)}
                                    // handleInputKeyPress={(event)=>(event.key === 'Enter'?resetUser():'')}
                                    error={confirmPasswordError}
                                    errorMessage={ERROR_PASSWORD_NOT_MATCH}
                                />
                                <Grid>
                                    <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : resetUser()} label={"Submit"} disableBtn={disableButton} />
                                </Grid>
                                <Grid>
                                    <StyledGoBack onClick={() => { history.goBack() }} variant='a'>
                                        <ArrowBackIcon fontSize='small' /> Go Back
                                    </StyledGoBack>
                                </Grid>
                            </form>
                        </StyledChildFormGrid>
                    </StyledForgotPassword>
                </StyledParentResetGrid>
            </StyleGrid>
        </React.Fragment>
    )
}

export default ResetPassword
