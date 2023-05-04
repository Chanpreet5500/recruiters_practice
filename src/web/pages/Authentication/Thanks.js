import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Logo from "recruitment-images/h4.png";
import LoginBg from "recruitment-images/portal.png";
import { Text } from "../../../context/provider.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Thanks = (props) => {

  const history = useHistory();
  
 
  return (
    <React.Fragment>
      <Link to="/login" className="loginLogo"><img src={Logo} /></Link>
      {/*<h2 className="loginLogo formTitle">Recruitment AI</h2>*/}
      <div className="container GuestOuter">
        <div className="row white-bg text-center thanks-container">
          <div className="col-md-12 col-lg-12 ">
            <h2 className="title"><Text tid="verification-text"/></h2>
            <p className="thanks-subtitle"> <Text tid="click-on-link-text" /></p>
            <Link to="/login" className="themeBtn  w-100 theme-button m-t-20"><Text tid="logIn-text" /></Link>  
          </div>            
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
    </React.Fragment>
  );
};

export default Thanks;
