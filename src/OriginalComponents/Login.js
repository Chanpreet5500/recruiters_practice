import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Logo from "recruitment-images/h4.png";
import LoginBg from "recruitment-images/portal.png";
import Input from "recruitment-components/Input/Input.js";
import Button from "recruitment-components/Button/Button.js";
import { validateEmail } from "recruitment-validation";
import { useStoreActions } from 'easy-peasy';
import { ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD } from 'recruitment-message';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {

    const history = useHistory();
    const [email, setEmailAddress] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const loginUser = useStoreActions((actions) => actions.authentication.loginUser);
    const browserData = useStoreActions((actions) => actions.authentication.browserDATA);
    const setUserProfile = useStoreActions((actions) => actions.admin.setUserProfile);
    const secretKeyAdmin = "JdfvibauJbvVkwgKGY41864GCgvbufsdjvb5fsv4wguvHFFfbu5269"


    const authenticateUser = async () => {
        setEmailError(false);
        setPasswordError(false);

        if (email.trim() == '' || !validateEmail(email)) {
            setEmailError(true);
            return false;
        }
        if (password.trim() == '') {
            setPasswordError(true);
            return false;
        }

        setDisableButton(true);
        let formData = { email: email, password: password, roleType: 'client' }
        let response = await loginUser(formData);
        console.log(response, "responselogin")
        setDisableButton(false);
        if (response && response.user) {
            browserData(response.user);

            setUserProfile(response.user);
            history.push('/dashboard');
        }
    }


    return (
        <React.Fragment>
            <a className="loginLogo"><img src={Logo} /></a>
            <div className="container GuestOuter">
                <div className="row white-bg">
                    <div className="col-md-7 col-lg-7  loginImgLeft">
                        <img src={LoginBg} />
                    </div>
                    <>
                        <div className="col-md-5 col-lg-5  loginForm">
                            <form>
                                <h1 className="formTitle">Log In</h1>
                                <Input
                                    label={"Email Address"}
                                    type={'text'}
                                    value={email}
                                    handleInputChange={(e) => setEmailAddress(e.target.value)}
                                    handleInputKeyPress={(event) => (event.key === 'Enter' ? authenticateUser() : '')}
                                    error={emailError}
                                    placeholder={"Email address"}
                                    errorMessage={ERROR_INVALID_EMAIL}
                                />
                                <Input
                                    label={"Password"}
                                    type={'password'}
                                    value={password}
                                    placeholder={"Password"}
                                    handleInputChange={(e) => setPassword(e.target.value)}
                                    handleInputKeyPress={(event) => (event.key === 'Enter' ? authenticateUser() : '')}
                                    error={passwordError}
                                    errorMessage={ERROR_INVALID_PASSWORD}
                                />
                                <div className="formFieldOuter forgotPwd">
                                    <a onClick={() => history.push("/forgot-password")}>Forgot Password?</a>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : authenticateUser()} label={"Log In"} disableBtn={disableButton} />
                                    </div>
                                </div>
                                <div className="row register">
                                    <div className="col-sm-8">
                                        <a onClick={() => history.push("/register")}>Not a member? Register</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                </div>
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
        </React.Fragment>
    );
};

export default Login;
zzS