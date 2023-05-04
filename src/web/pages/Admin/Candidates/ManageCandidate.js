import React, { useState, useEffect } from "react";
import validator from "validator";
import { validateEmail } from "recruitment-utils/Validators.js";
import { Link, useHistory } from "react-router-dom";
import { apiDateFormat } from "recruitment-utils/Service.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Logo from "recruitment-images/logo-recruiters.svg";
import LoginBg from "recruitment-images/admin.svg";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import Select from 'react-select'
import { Route, useParams } from "react-router-dom";
import moment from "moment";
import { Text } from "../../../../context/provider"
import {
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
} from "recruitment-message";
import { ALL_COUNTRIES } from "recruitment-countries";

const ManageCandidates = (props) => {
  const history = useHistory();
  const userProfile = useStoreState(
    (state) => state.admin.userProfile
  );
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(0);
  const [saveCandidateId, setsaveCandidateId] = useState();
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstnameError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAdressError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [zipcodeError, setZipcodeerror] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [companyPhoneError, setCompanyPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const getCandidate = useStoreActions((actions) => actions.admin.getCandidate);
  const deleteCandidate = useStoreActions((actions) => actions.admin.deleteCandidate);
  const updateCandidate = useStoreActions((actions) => actions.admin.updateCandidate);
  const createCandidate = useStoreActions((actions) => actions.admin.createCandidate);



  const [email, setEmailAddress] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState({ "value": "US", "group": "U", "label": "United States" });
  const [zipcode, setZipcode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneWithCountryCode, setPhoneWithCountryCode] = useState("");

  const educationData = [{ name: "High School", id: "high-school" }, { name: "Undergraduate", id: "undergraduate" }, { name: "Masters", id: "masters" }, { name: "PhD", id: "phd" }]
  useEffect(() => {
    const init = async () => {
      setShowFullPageLoader(true);
      if (id) {

        let formData = { id: id };
        setsaveCandidateId(id);
        let candidate = await getCandidate(formData);
        setFirstname(candidate.first_name)
        setLastname(candidate.last_name)
        setEmailAddress(candidate.email)
        setPhoneNumber(candidate.phone)
        setProfession(candidate.profession)
        setExperience(candidate.experience)
        setEducation(candidate.education)
        setStreetAddress(candidate.street_address)
        setCity(candidate.city)
        setCountry(JSON.parse(candidate.country))
        setZipcode(candidate.zip_code)
      }
      setShowFullPageLoader(false);
    }
    init();
  }, []);


  // const [email, setEmailAddress] = useState(candidate.email);
  // const [lastname, setLastname] = useState(candidate.first_name);
  // const [lastname, setLastname] = useState(candidate.last_name);
  // setLastname('candidate.first_name');

  const saveCandidate = async () => {
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
    if (profession.trim() == "") {
      setProfessionError(true);
      return false;
    }
    if (experience.trim() == "") {
      setProfessionError(true);
      return false;
    }
    if (streetAddress.trim() == "") {
      setAdressError(true);
      return false;
    }
    if (city.trim() == "") {
      setCityError(true);
      return false;
    }
    // if (country.trim() == "" ) {
    //   setCountryError(true);
    //   return false;
    // }
    if (zipcode.trim() == "") {
      setZipcodeerror(true);
      return false;
    }

    if (phoneNumber != "" && phoneError) {
      setPhoneError(true);
      return false;
    }
    // if(address.trim() == '') {
    //   setAddressError(true);
    //   return false;
    // }

    setDisableButton(true);
    let formData = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone_number: phoneWithCountryCode,
      profession: profession,
      experience: experience,
      education: education,
      street_address: streetAddress,
      city: city,
      zip_code: zipcode,
      country: JSON.stringify(country),
      candidate_client_id: userProfile.id,
    };
    let response = false;
    if (saveCandidateId) {
      formData.id = saveCandidateId;
      response = await updateCandidate(formData);
    } else {
      response = await createCandidate(formData);
    }

    setDisableButton(false);
    if (response) {
      history.push("/candidates");
    }
  };

  const deleteCandidateCall = async () => {
    let formData = { id: deleteCandidateId };
    setDisableButton(true);

    await deleteCandidate(formData);
    setDisableButton(false);
    setShowDelete(false);
  };

  /*const handlePhoneChange = (event) => {
    var phoneRegExp = /^-?\d+$/;
    const value = event.target.value;
    if (value.match(phoneRegExp) || value === "") {
      setPhoneError(false);
      setPhoneNumber(value);
    } else {
      setPhoneNumber(value);
      setPhoneError(true);
    }
  };*/

  const handlePhoneChange = (a, b, c, d) => {
    //setCountryCode('+' + c.dialCode);
    setPhoneWithCountryCode(d)
    setPhoneNumber(b);
  };

  const handleChange = (selectedOption) => {
    setCountry(selectedOption)
  };
  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}

      <Link to="/candidates" className="goBack backToClass">
        <i className="uil uil-arrow-left" /> <Text tid="back-to-candidate-text" />
      </Link>
      {
        <h1 className="pageTitle mb-4">
          <div className="userImgOuter pt-3">
            {avatar != "" ? (
              <img
                id="user-profile-avatar"
                src={`data:image/svg+xml;base64,${btoa(
                  unescape(encodeURIComponent(avatar))
                )}`}
              />
            ) : (
              <span style={{ background: 'url("/images/user.jpg")' }} />
            )}
            <h2>
              {firstname} {lastname}
            </h2>
          </div>
          <Button
            type={"top-button"}
            extraClasses={`float-right mt-4 ${disableButton ? "loaderBtn disable" : ""
              }`}
            onClick={() => (disableButton ? "" : saveCandidate())}
            label={"Save Changes"}
            disableBtn={disableButton}
          />
        </h1>
      }

      <div className="row">
        <div className="col-sm-8">
          <div className="formTitle">
            <span> <Text tid="candidate-detail-text" /></span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={<Text tid="first-name" />}
                type={"text"}
                value={firstname}
                handleInputChange={(e) => setFirstname(e.target.value)}
                error={firstNameError}
                placeholder={"First Name"}
                errorMessage={FIRSTNAME_ERROR_MESSAGE}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="last-name" />}
                type={"text"}
                value={lastname}
                handleInputChange={(e) => setLastname(e.target.value)}
                error={lastnameError}
                placeholder={"Last Name"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Input
                label={<Text tid="email-address" />}
                type={"text"}
                value={email}
                handleInputChange={(e) => setEmailAddress(e.target.value)}
                error={emailError}
                placeholder={"Email address"}
                errorMessage={ERROR_INVALID_EMAIL}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={<Text tid="profession-text" />}
                type={"text"}
                value={profession}
                handleInputChange={(e) => setProfession(e.target.value)}
                error={professionError}
                placeholder={"Profession"}
                errorMessage={"Profession is required"}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="experience-text" />}
                type={"text"}
                value={experience}
                handleInputChange={(e) => setExperience(e.target.value)}
                error={experienceError}
                placeholder={"Experience"}
                errorMessage={LASTNAME_ERROR_MESSAGE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SingleSelect
                label={<Text tid="education-level-text" />}
                placeholder={'Education Level'}
                options={educationData ? educationData : []}
                changeOption={(id) => setEducation(id)}
                value={education}
              />
            </div>
            <div className="col-md-6">
              <CustomMobile
                label={<Text tid="phone-number-optional" />}
                value={phoneNumber}
                handlePhoneChange={(a, b, c, d) => handlePhoneChange(a, b, c, d)}
                error={phoneError}
                placeholder={"XXX XXX XXXX"}
                errorMessage={ERROR_INVALID_PHONE}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={<Text tid="street-address" />}
                type={"text"}
                value={streetAddress}
                handleInputChange={(e) => setStreetAddress(e.target.value)}
                error={addressError}
                placeholder={"Street Address"}
                errorMessage={"Street Address is required"}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="city-text" />}
                type={"text"}
                value={city}
                handleInputChange={(e) => setCity(e.target.value)}
                error={cityError}
                placeholder={"City"}
                errorMessage={"City is required"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div>
                <label className="fieldLabel"><Text tid="country-text" /></label>
                <div className={`formField`}>
                  <Select
                    options={ALL_COUNTRIES ? ALL_COUNTRIES : []}
                    value={country}
                    onChange={handleChange}
                    classNamePrefix={"cs-recruitment"}
                    className={"custom-select-box"}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <Input
                label={<Text tid="zip-code-text" />}
                type={"text"}
                value={zipcode}
                handleInputChange={(e) => setZipcode(e.target.value)}
                error={zipcodeError}
                placeholder={"Zip code"}
                errorMessage={"Zip Code is required"}
              />
            </div>
          </div>

        </div>
        <div className="col-sm-1 dividerOuter"></div>
      </div>

      {showDelete && (
        <Overlay
          title={"Are you sure?"}
          subTitle={"Are you sure you want to delete this year?"}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => deleteCandidateCall()}
          disableBtn={disableButton}
          isDelete={true}
        ></Overlay>
      )}
    </React.Fragment>
  );
};

export default ManageCandidates;
