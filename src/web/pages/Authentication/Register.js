import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Logo from "recruitment-images/h4.png";
import LoginBg from "recruitment-images/portal.png";
import Input from "recruitment-components/Input/Input.js";
import Button from "recruitment-components/Button/Button.js";
import Cookies from 'js-cookie';
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import { validateEmail } from "recruitment-validation";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import { ALL_COUNTRIES } from "recruitment-countries";
import { FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select'

import { useStoreActions } from 'easy-peasy';
import {
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  PHONE_NUMBER_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
  ERROR_INVALID_PASSWORD,
  PASSWORD_VALIDATION
} from "recruitment-message";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext, Text } from '../../../context/provider'
import { languageOptions } from '../../../locales/localization';
import { Grid } from '@material-ui/core';
import { LogoImg, StyleGrid, StyledLoginLogo, StyledRegisterParentGrid, StyledFlagGrid, StyledImg, StyledMainGrid, StyledRowGrid, StyledColGrid, StyledColumnGrid, StyledFormFieldGrid, StyledRegisterButtonGrid, StyledLogo, StyledLoginParent, StyleChildRegisterGrid, StyledLable } from '../../styledComponent/StyledComponents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const Register = (props) => {

  const history = useHistory();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [MFA, setMFA] = useState(false)
  const [otp, setOtp] = useState("")
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const loginUser = useStoreActions((actions) => actions.authentication.loginUser);
  const browserData = useStoreActions((actions) => actions.authentication.browserDATA);
  const setUserProfile = useStoreActions((actions) => actions.admin.setUserProfile);
  const submitOTP = useStoreActions((actions) => actions.authentication.submitOTP);
  const resendOTP = useStoreActions((actions) => actions.authentication.resendOTP);
  const [needMFA, setNeedMFA] = useState(true)
  const [userData, setUserData] = useState("")
  const [ein, setCompanyEIN] = useState('');


  const COMPANY_ID = Math.random().toString(36).slice(2).toUpperCase();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(0);
  const [saveClientId, setsaveClientId] = useState();
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstnameError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [zipcodeError, setZipcodeerror] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [companyIdError, setCompanyIdError] = useState(false);
  const [companyPhoneError, setCompanyPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const getClient = useStoreActions((actions) => actions.admin.getClient);
  const deleteClient = useStoreActions((actions) => actions.admin.deleteClient);
  const updateClient = useStoreActions((actions) => actions.admin.updateClient);
  const registerUser = useStoreActions((actions) => actions.admin.createClient);

  const [email, setEmailAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState(COMPANY_ID);
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState({
    "value": "US",
    "group": "U",
    "label": "United States"
  });
  const [preferredLanguage, setLanguage] = useState({
    "value": "en",
    "label": "English"
  });
  const [zipcode, setZipcode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneWithCountryCode, setPhoneWithCountryCode] = useState("");
  const [companyPhoneWithCountryCode, setCompanyPhoneWithCountryCode] = useState("");

  const allLanguages = [{ value: "es", label: "Spanish" }, { value: "en", label: "English" }]
  const secretKeyAdmin = "JdfvibauJbvVkwgKGY41864GCgvbufsdjvb5fsv4wguvHFFfbu5269"

  const checkCookie = async () => {
    const cookiee = Cookies.get('__MFToken')
    if (cookiee) {
      if (cookiee === secretKeyAdmin) {
        await setNeedMFA(false)
        return
      }
    }
    await setNeedMFA(true)
  }
  useEffect(() => {
    checkCookie()
  }, [])


  const handlePhoneChange = (a, b, c, d) => {
    setPhoneWithCountryCode(d);
    setPhoneNumber(b);
  };

  const handleCompanyPhoneChange = (a, b, c, d) => {
    setCompanyPhoneWithCountryCode(d);
    setCompanyPhoneNumber(b);
  };

  const saveClient = async () => {
    setEmailError(false);
    setLastnameError(false);
    setLastnameError(false);
    setPhoneError(false);
    if (firstname.trim() == "") {
      setFirstnameError(true);
      return false;
    }
    if (lastname.trim() == "") {
      setLastnameError(true);
      return false;
    }
    if (email.trim() == "" || !validateEmail(email)) {
      setEmailError(true);
      return false;
    }
    // if (password.trim() == "" ) {
    //   setPasswordError(true);
    //   return false;
    // } else {
    //   // let isPasswordValid = password.match(/^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g);
    //   // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    //   let isPasswordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/g);


    //   if (!isPasswordValid) {
    //    setPasswordError(true);
    //    return false;
    //   }
    // }

    if (phoneNumber.trim() == "") {
      setPhoneNumberError(true);
      return false;
    }

    // if (phoneNumber != "" && phoneError ) {
    //   setPhoneError(true);
    //   return false;
    // }
    // if(address.trim() == '') {
    //   setAddressError(true);
    //   return false;
    // }

    setDisableButton(true);
    let formData = {
      first_name: firstname,
      last_name: lastname,
      password: password,
      email: email,
      phone: phoneWithCountryCode,
      company_name: companyName,
      company_number: companyId,
      company_phone_number: companyPhoneWithCountryCode,
      street_address: streetAddress,
      city: city,
      zip_code: zipcode,
      country: JSON.stringify(country),
      preferredLanguage: preferredLanguage.value
    };
    let response = await registerUser(formData);
    if (response) {
      history.push('/thanks');
    }
    setDisableButton(false);
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword)
  }
  const handleChange = (selectedOption) => {
    setCountry(selectedOption)
  };


  const handleLanguageChange = (id) => userLanguageChange(id);


  const handlePasswordChange = (event) => {
    let password = event.target.value;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (strongRegex.test(password)) {
      setPasswordError(false)
    } else {
      setPasswordError(true);
    }
    setPassword(password)
    // let isPasswordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/g);
    // if (!isPasswordValid) {

    // } else{
    //   setPasswordError(false)
    // }

  }

  return (
    <React.Fragment>
      <StyledLoginParent container>
        <Grid items>
          <LogoImg src={Logo} />
        </Grid>
        <StyledFlagGrid items>
          {Object.entries(languageOptions).map(([id, name]) => {
            return (
              <StyledImg style={{ opacity: userLanguage === id ? 1 : 0.5 }} src={`./images/${id}.png`} onClick={() => handleLanguageChange(id)} alt={name} />
            )
          })}
        </StyledFlagGrid>
      </StyledLoginParent>
      <StyleGrid container>
        < StyledRegisterParentGrid >
          <StyleChildRegisterGrid>
            <StyledMainGrid container >
              <StyledColGrid items xs={12} md={6}>
                <Input
                  label={<Text tid="first-name" />}
                  type={"text"}
                  value={firstname}
                  handleInputChange={(e) => setFirstname(e.target.value)}
                  error={firstNameError}
                  placeholder={"First Name"}
                  errorMessage={FIRSTNAME_ERROR_MESSAGE}
                />
              </StyledColGrid>
              <StyledColGrid items xs={12} md={6} >
                <Input
                  label={<Text tid="last-name" />}
                  type={"text"}
                  value={lastname}
                  handleInputChange={(e) => setLastname(e.target.value)}
                  error={lastnameError}
                  placeholder={"Last Name"}
                  errorMessage={LASTNAME_ERROR_MESSAGE}
                />
              </StyledColGrid>
              <StyledColGrid items>
                <Input
                  label={<Text tid="email-address" />}
                  type={"text"}
                  value={email}
                  handleInputChange={(e) => setEmailAddress(e.target.value)}
                  error={emailError}
                  placeholder={"Email address"}
                  errorMessage={ERROR_INVALID_EMAIL}
                />
              </StyledColGrid>
              <StyledColGrid items xs={12} md={6}>
                <Input
                  label={<Text tid="password-text" />}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  handleInputChange={(event) => handlePasswordChange(event)}
                  error={passwordError}
                  errorMessage={PASSWORD_VALIDATION}
                  showIcon={true}
                  iconName={showPassword ? 'fa-eye-slash' : 'fa-eye'}
                  iconClickHandler={() => handlePasswordShow()}
                />
              </StyledColGrid>
              <Grid container>
                <StyledColumnGrid items xs={12} md={4}>
                  <Input
                    label={<Text tid="company-name-text" />}
                    type={"text"}
                    value={companyName}
                    handleInputChange={(e) => setCompanyName(e.target.value)}
                    error={companyNameError}
                    placeholder={"Company Name"}
                    errorMessage={""}
                  />
                </StyledColumnGrid>
                <StyledColumnGrid items xs={12} md={4}>
                  <Input
                    label={<Text tid="company-id" />}
                    type={"text"}
                    value={companyId}
                    handleInputChange={(e) => setCompanyId(e.target.value)}
                    error={companyIdError}
                    placeholder={"Company ID"}
                    errorMessage={LASTNAME_ERROR_MESSAGE}
                    disabled={true}
                  />
                </StyledColumnGrid>
                <StyledColumnGrid items xs={12} md={4}>
                  <Input
                    label={<Text tid="company-ein" />}
                    type={"text"}
                    value={ein}
                    handleInputChange={(e) => setCompanyEIN(e.target.value)}
                    error={companyIdError}
                    placeholder={"Company EIN"}
                    errorMessage={LASTNAME_ERROR_MESSAGE}
                    disabled={false}
                  />
                </StyledColumnGrid>
              </Grid>
              <StyledColGrid items xs={12} md={6}>
                <CustomMobile
                  label={<Text tid="company-phone-number" />}
                  value={companyPhoneNumber}
                  handlePhoneChange={(a, b, c, d) => handleCompanyPhoneChange(a, b, c, d)}
                  error={phoneError}
                  placeholder={"XXX XXX XXXX"}
                  errorMessage={ERROR_INVALID_PHONE}
                />
              </StyledColGrid>
              <StyledColGrid items>
                <CustomMobile
                  label={<Text tid="phone-number-optional" />}
                  value={phoneNumber}
                  handlePhoneChange={(a, b, c, d) => handlePhoneChange(a, b, c, d)}
                  error={phoneNumberError}
                  placeholder={"XXX XXX XXXX"}
                  errorMessage={PHONE_NUMBER_MESSAGE}
                />
              </StyledColGrid>

              <StyledColGrid items xs={12} md={6}>
                <Input
                  label={<Text tid="street-address" />}
                  type={"text"}
                  value={streetAddress}
                  handleInputChange={(e) => setStreetAddress(e.target.value)}
                  error={companyNameError}
                  placeholder={"Street Address"}
                  errorMessage={""}
                />
              </StyledColGrid>
              <StyledColGrid items xs={12} md={6}>
                <Input
                  label={<Text tid="city-text" />}
                  type={"text"}
                  value={city}
                  handleInputChange={(e) => setCity(e.target.value)}
                  error={cityError}
                  placeholder={"City"}
                  errorMessage={""}
                />
              </StyledColGrid>
              <Grid container>
                <StyledColumnGrid items xs={12} md={4}>
                  <StyledLable ><Text tid="country-text" /></StyledLable>
                  <Grid >
                    <Select
                      options={ALL_COUNTRIES ? ALL_COUNTRIES : []}
                      value={country}
                      onChange={handleChange}
                      classNamePrefix={"cs-recruitment"}
                      className={"custom-select-box"}
                    />
                  </Grid>
                </StyledColumnGrid>
                <StyledColumnGrid items xs={12} md={4}>

                  <Input
                    label={<Text tid="zip-code-text" />}
                    type={"text"}
                    value={zipcode}
                    handleInputChange={(e) => setZipcode(e.target.value)}
                    error={zipcodeError}
                    placeholder={"Zip code"}
                    errorMessage={""}
                  />

                </StyledColumnGrid>
                <StyledColumnGrid items xs={12} md={4}>
                  <StyledLable >Prefered Language</StyledLable>
                  <Grid >

                    <Select
                      options={allLanguages ? allLanguages : []}
                      value={preferredLanguage}
                      onChange={(e) => setLanguage(e)}
                      classNamePrefix={"cs-recruitment"}
                      className={"custom-select-box"}
                    />
                  </Grid>
                </StyledColumnGrid>
              </Grid>
              <Grid container>
                <StyledRegisterButtonGrid items xs={12} md={12}>
                  <Button type={'theme-button'} extraClasses={` w-100 theme-button ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : saveClient()} label={<Text tid="submit-bttn-text" />} disableBtn={disableButton} />
                </StyledRegisterButtonGrid>
              </Grid>

              <Link to="/login" className="goBack" ><ArrowBackIcon fontSize='small' /><Text tid="go-back-button" /></Link>
            </StyledMainGrid>
          </StyleChildRegisterGrid>
        </ StyledRegisterParentGrid>
      </StyleGrid>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
    </React.Fragment>
  );
};

export default Register;
