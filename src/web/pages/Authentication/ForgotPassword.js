import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Logo from "recruitment-images/logo-recruiters.svg";
import LoginBg from "recruitment-images/portal.png";
import Input from "recruitment-components/Input/Input.js";
import { useStoreActions } from 'easy-peasy';
import Button from "recruitment-components/Button/Button.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = (props) => {
  const [email, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const forgetPassword = useStoreActions((actions) => actions.authentication.forgetPassword);
  const history =  useHistory();
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
      <a className="loginLogo"><img src={Logo} /></a>
      <div className="container GuestOuter">
        <div className="row white-bg">
          <div className="col-md-7 col-lg-7  loginImgLeft">
            <img src={LoginBg} />
          </div>
          <div className="col-md-5 col-lg-5  loginForm">
            <form>
              <h1 className="formTitle">Forgot Password</h1>
              <Input
                label={"Email Address"}
                type={'text'}
                value={email}
                handleInputChange={(e) => setEmailAddress(e.target.value)}
                handleInputKeyPress={(event)=>(event.key === 'Enter'?forgetUser():'')}
                error={emailError}
                errorMessage={"Please enter valid email."}
              />
              <div className="row">
                <div className="col-sm-8">
                  <Button type={'theme-button'} extraClasses={`w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : forgetUser()} label={"Submit"} disableBtn={disableButton} />
                </div>
              </div>
              <a className="goBack" onClick={()=>{history.goBack()}}><i className="uil uil-arrow-left"></i> Go back</a>
            </form>
          </div>
        </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
