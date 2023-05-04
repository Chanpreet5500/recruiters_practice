import React, { useState, useEffect } from 'react';
import { Link , useHistory } from "react-router-dom";
import { isPhoneNumberValid } from 'recruitment-utils/Validators.js';
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import {ALL_COUNTRIES} from "recruitment-countries"; 

import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import ToggleSwitch from "recruitment-components/ToggleSwitch/ToggleSwitch.js";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import validator from "validator";
import Select from 'react-select'

import { apiDateFormat, logoutCompletely } from 'recruitment-utils/Service.js';
import { ERROR_INVALID_EMAIL, FIRSTNAME_ERROR_MESSAGE, LASTNAME_ERROR_MESSAGE, ERROR_ADDRESS, ERROR_INVALID_DOB, ERROR_INVALID_PHONE, ERROR_INVALID_CURRENT_PASSWORD, ERROR_INVALID_NEW_PASSWORD, ERROR_INVALID_CONFIRM_NEW_PASSWORD, ERROR_PASSWORD_MISMATCH, COMPANYNAME_ERROR_MESSAGE, COMPANYNUMBER_ERROR_MESSAGE, STREETADDRESS_ERROR_MESSAGE, CITY_ERROR_MESSAGE, COUNTRY_ERROR_MESSAGE, ZIPCODE_ERROR_MESSAGE, PROFESSION_ERROR_MESSAGE, EDUCATION_ERROR_MESSAGE, } from 'recruitment-message';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import moment from 'moment';
import EditPasswordImg from "recruitment-images/atoms-icons-system-pen-solid.svg"

import { Text } from '../../../context/provider';

const Profile = (props) => {
  const history = useHistory();
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
 //updated
  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [ein, setCompanyEIN] = useState('');
  // </>

  // const {localStorageData} = useLocalStorage();
  const [showLoader, setShowLoader] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  //updated
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyNumberError, setCompanyNumberError] = useState(false);
  const [streetAddressError, setStreetAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [educationError, setEducationError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);

  const [dobError, setDobError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  //const setShowProgressBar = useStoreActions((actions) => actions.classimize.setShowProgressBar);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const updateProfile = useStoreActions((actions) => actions.admin.updateProfile);
  const getUserProfile = useStoreActions((actions) => actions.admin.getUserProfile);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [disabledButton, setDisaledButton] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if(userProfile || loggedInUser) {
      let formData = {email: (userProfile?.email || loggedInUser?.email)};
      setShowLoader(true);
      getUserProfile(formData);
      setShowLoader(false);
    }
  }, [])
  useEffect(() => {
    if (userProfile) {
      setForename(userProfile?.firstname || loggedInUser?.firstname)
      setSurname(userProfile?.lastname || loggedInUser?.lastname)
      setEmail(userProfile?.email || loggedInUser?.email);

      setAddress(userProfile?.streetAddress);
      setCompanyName(userProfile?.companyName);
      setCompanyNumber(userProfile?.companyNumber);
      // setStreetAddress(userProfile?.street_address);
      setCity(userProfile?.city);
      if(userProfile.country) {
        setCountry(JSON.parse(userProfile?.country));
      }
      setZipCode(userProfile?.zipCode);
      setProfession(userProfile?.profession);
      setCompanyEIN(userProfile?.ein);
      setExperience(userProfile?.experience);
    }
  }, [userProfile])
  

  const saveProfile = async () => {
    setEmailError(false);
    setForenameError(false);
    setSurnameError(false);
    setAddressError(false);
    //updated
    setCompanyNameError(false);
    setCompanyNumberError(false);
    setStreetAddressError(false);
    setCityError(false);
    setCountryError(false);
    setZipCodeError(false);
    setProfessionError(false);
    setEducationError(false);
    setExperienceError(false);
    if (!forename || forename.trim() == '') {
      setForenameError(true);
      return false;
    }

    if (!surname || surname.trim() == '') {
      setSurnameError(true);
      return false;
    }

    if (!email || email.trim() == '' || !validator.isEmail(email)) {
      setEmailError(true);
      return false;
    }
    
    if (!address || address.trim() == '') {
      setAddressError(true);
      return false;
    }


    //updated
    if (!companyName || companyName.trim() == '') {
      setCompanyNameError(true);
      return false;
    }

    if (!companyNumber || companyNumber.trim() == '') {
      setCompanyNumberError(true);
      return false;
    }


    if (!city || city.trim() == '') {
      setCityError(true);
      return false;
    }

    if (!country ) {
      setCountryError(true);
      return false;
    }

    if (!zipCode || zipCode.trim() == '') {
      setZipCodeError(true);
      return false;
    }

    if (forename && forename.trim() != '') {
      let formData = {
        "first_name": forename,
        "last_name": surname,
        "email": email,        
        "street_address": address,
        "companyName": companyName,
        "companyNumber": companyNumber,
        "streetAddress":address,
        "city": city,
        "country": JSON.stringify(country),
        "zipCode": zipCode,
        "ein": ein,
      }
      setDisableButton(true)

      //  alert(editStudentId);
      let response = await updateProfile(formData);
      setDisableButton(false);
      if (response) {
        return response
        // history.push('/students');
      }
    }
  }
  const handleChange = (selectedOption) => {
    setCountry(selectedOption)
  };
  
  return (
    <React.Fragment>
      {showLoader &&
        <CustomLoader />
      }
      <h1 className="pageTitle"><Text tid="my-profile-text" />   <Button type={'top-button'} extraClasses={`float-right mt-3 ${disableButton ? "loaderBtn disable" : ""}`} onClick={() => disableButton ? "" : saveProfile()} label={"Save Changes"} disableBtn={disableButton} /></h1>
      <h1 className="pageTitle mb-4 mt-5"></h1>
      <div className="row">
        <div className="col-sm-7">
          <div className="profileTitle">
            <span><Text tid="my-details-text" /></span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={<Text tid="first-name" />}
                type={'text'}
                value={forename}
                handleInputChange={(e) => setForename(e.target.value)}
                error={forenameError}
                placeholder={"First Name"}
                errorMessage={FIRSTNAME_ERROR_MESSAGE}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="last-name" />}
                type={'text'}
                value={surname}
                handleInputChange={(e) => setSurname(e.target.value)}
                error={surnameError}
                placeholder={"Last Name"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <Input
                label={<Text tid="e-mail" />}
                type={'text'}
                value={email}
                handleInputChange={(e) => setEmail(e.target.value)}
                error={emailError}
                placeholder={"Email"}
                errorMessage={ERROR_INVALID_EMAIL}
              />
            </div>
          </div>
          
          
          <div className="row">
            <div className="col-md-12">
              <Textarea
                label={<Text tid="address" />}
                type={'text'}
                value={address}
                handleInputChange={(e) => setAddress(e.target.value)}
                error={addressError}
                placeholder={"Address"}
                errorMessage={ERROR_ADDRESS}
              />
            </div>
          </div>

          {/* updating */}
          <div className="row">
            <div className="col-md-6">
              <Input
                label={<Text tid="company-name-text" />}
                type={'text'}
                value={companyName}
                handleInputChange={(e) => setCompanyName(e.target.value)}
                error={companyNameError}
                placeholder={"Company Name"}
                errorMessage={COMPANYNAME_ERROR_MESSAGE} //need to do
              />
            </div>
          
            <div className="col-md-6">
              <Input
                label={<Text tid="company-id" />}
                type={'text'}
                value={companyNumber}
                handleInputChange={(e) => setCompanyNumber(e.target.value)}
                error={companyNumberError}
                placeholder={"Company ID"}
                errorMessage={COMPANYNUMBER_ERROR_MESSAGE} //to do
              />
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6">
              <Input
                label={"Street Address"}
                type={'text'}
                value={streetAddress}
                handleInputChange={(e) => setStreetAddress(e.target.value)}
                error={streetAddressError}
                placeholder={"Street Address"}
                errorMessage={STREETADDRESS_ERROR_MESSAGE} // to do
              />
            </div>
          </div> */}


          <div className="row">
            <div className="col-md-6">
              <Input
                label={<Text tid="city-text" />}
                type={'text'}
                value={city}
                handleInputChange={(e) => setCity(e.target.value)}
                error={cityError}
                placeholder={"city"}
                errorMessage={CITY_ERROR_MESSAGE} // to do
              />
            </div>
         
            <div className="col-md-6">
              <Input
                label={<Text tid="company-ein" />}
                type={'text'}
                value={ein}
                handleInputChange={(e) => setCompanyEIN(e.target.value)}
                error={educationError}
                placeholder={"Company EIN"}
                errorMessage={EDUCATION_ERROR_MESSAGE} // to do
              />
            </div>

          </div>


          {/* <div className="row">
            <div className="col-md-6">
              <Input
                label={"Profession"}
                type={'text'}
                value={profession}
                handleInputChange={(e) => setProfession(e.target.value)}
                error={professionError}
                placeholder={"profession"}
                errorMessage={PROFESSION_ERROR_MESSAGE}  // to do
              />
            </div>
          
            <div className="col-md-6">
              <Input
                label={"Experience"}
                type={'text'}
                value={experience}
                handleInputChange={(e) => setExperience(e.target.value)}
                error={experienceError}
                placeholder={"experience"}
                // errorMessage={EXPERIENCE_ERROR_MESSAGE} // to do
              />
            </div>
          </div> */}

          <div className="row">
          <div className="col-lg-6">
              <div>
                <label className="fieldLabel"><Text tid = "country-text" /></label>
                <div className={`formField`}>
                  <Select
                    options={ALL_COUNTRIES ? ALL_COUNTRIES : []}
                    onChange={handleChange}
                    classNamePrefix={"cs-recruitment"}
                    className={"custom-select-box"}
                    value={country}
                  /> 
                </div> 
              </div>
            </div>

            <div className="col-md-6">
              <Input
                label={<Text tid = "zip-code-text" />}
                type={'text'}
                value={zipCode}
                handleInputChange={(e) => setZipCode(e.target.value)}
                error={zipCodeError}
                placeholder={"Zipcode"}
                errorMessage={ZIPCODE_ERROR_MESSAGE} // to do
              />
            </div>
          </div>

        </div>
        
      </div>
      
      
    </React.Fragment>
  );
};

export default Profile;