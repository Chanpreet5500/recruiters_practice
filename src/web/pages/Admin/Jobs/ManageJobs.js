import React, { useState, useEffect,useContext } from "react";
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
import ToolTip from "recruitment-components/Tooltip/Tooltip.js";

import Input from "recruitment-components/Input/Input.js";
import CustomDatepicker from "recruitment-components/CustomDatepicker/CustomDatepicker.js";
import CustomMobile from "recruitment-components/CustomMobile/CustomMobile.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import Button from "recruitment-components/Button/Button.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import Multiselect from "recruitment-components/MultiSelectDropDown/MultiSelectDropDown.js";
import { FaEdit, FaTrashAlt, FaLock, FaLockOpen } from "react-icons/fa";

import { Route, useParams } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import AddParamsOverlay from "./AddParamsOverlay.js";
import { LanguageContext, Text } from "../../../../context/provider.js";
import {
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
} from "recruitment-message";
import { ALL_COUNTRIES } from "recruitment-countries";
import { changingLanguageText } from "../../../../lib/utils/Service.js";
const ManageJobs = (props) => {
  const { userLanguage } = useContext(LanguageContext);

  const history = useHistory();
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(0);
  const [saveJobId, setsaveJobId] = useState();
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [jobNameError, setJobnameError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAdressError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [jobIdError, setJobIderror] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [companyPhoneError, setCompanyPhoneError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const parameters = useStoreState((state) => state.admin.parameters);
  const getJob = useStoreActions((actions) => actions.admin.getJob);
  const deleteJob = useStoreActions((actions) => actions.admin.deleteJob);
  const updateJob = useStoreActions((actions) => actions.admin.updateJob);
  const createJob = useStoreActions((actions) => actions.admin.createJob);
  const getParams = useStoreActions((actions) => actions.admin.getParams);
  const getActiveParams = useStoreActions(
    (actions) => actions.admin.getActiveParams
  );

  const JOB_ID = Math.random().toString(36).slice(2).toUpperCase();
  const [email, setEmailAddress] = useState("");
  const [education, setEducation] = useState("");
  const [jobType, setJobType] = useState("sales");
  const [profession, setProfession] = useState("");
  const [jobId, setJobId] = useState(JOB_ID);
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState({
    value: "US",
    group: "U",
    label: "United States",
  });
  const [zipcode, setZipcode] = useState("");
  const [jobname, setJobname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [paramName, setParamName] = useState("");
  const [paramsData, setParamsData] = useState([]);
  const [parametersAdded, setParametersAdded] = useState([]);
  const [enData, setEnData] = useState([]);
  const [esData, setEsData] = useState([]);
  const [phoneWithCountryCode, setPhoneWithCountryCode] = useState(""); 

  //params overlay
  const [showParamsToAdd, setShowParamsToAdd] = useState(false);

  const educationData = [
    { name: "High School", id: "high-school" },
    { name: "Undergraduate", id: "undergraduate" },
    { name: "Masters", id: "masters" },
    { name: "PhD", id: "phd" },
  ];
  const organisationUnit = [
    { name: "Sales", id: "sales" },
    { name: "Marketing", id: "marketing" },
    { name: "Human Resources", id: "hr" },
    { name: "IT", id: "it" },
    { name: "Finance", id: "finance" },
    { name: "Operations", id: "operations" },
  ];
  const gradeSystem = [
    { name: "Present", id: "Present" },
    { name: "Not Present", id: "Not Present" },
  ];
  const newGradeSystemEn = [
    { name: "Moderate", id: "Moderate" },
    { name: "Limited", id: "Limited" },
    { name: "Adequate", id: "Adequate" },
    { name: "High", id: "High" }
  ];
  const newGradeSystemEs = [
    { name: "Moderado", id: "Moderado" },
    { name: "Limitado", id: "Limitado" },
    { name: "Adecuado", id: "Adecuado" },
    { name: "Alto", id: "Alto" }
  ];

  useEffect(() => {
    const init = async () => {
      setShowFullPageLoader(true);
      getActiveParams();

        if (id) {
          let formData = { id: id };
        setsaveJobId(id);
        let job = await getJob(formData);


        console.log(job, "ABCDEFGH")
        setJobname(job.name);
        setEducation(job.education);
        setJobId(job.job_id);
        setCity(job.city);
        setCountry(JSON.parse(job.country));
        if (job.parameters) {
          setParametersAdded(job.parameters);
        }
      }
      setShowFullPageLoader(false);
    };
    init();
  }, [userLanguage]);
  
  


  useEffect(() => {
    if (parameters) {
      let tempArr = [];
      if (parameters.length) {
        parameters.map((obj, idx) => {
          // tempArr.push({ name: obj.name + "-" + obj.description, id: obj._id });
          tempArr.push({
            name: obj.name,
            // description: obj?.description,
            id: obj._id,
            lang: obj.language,
          });
        });
        setEnData(tempArr?.filter(e => e?.lang === 'en'))
        setEsData(tempArr?.filter(e => e?.lang === 'es'))
      }
      // tempArr.push({ name: "Create New Parameter", id: "create" });
      setParamsData(tempArr);
    }
  }, [parameters]);

  const handleChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  const saveJob = async () => {
    setEmailError(false);
    setLastnameError(false);
    setLastnameError(false);
    setPhoneError(false);
    if (jobname.trim() == "") {
      setJobnameError(true);
      return false;
    }
    if (city.trim() == "") {
      setCityError(true);
      return false;
    }
    // if(address.trim() == '') {
    //   setAddressError(true);
    //   return false;
    // }

    setDisableButton(true);
    let formData = {
      name: jobname,
      job_id: jobId,
      type: jobType,
      education: education,
      city: city,
      country: JSON.stringify(country),
      client_id: userProfile.id,
      parameters: parametersAdded,
    };
    let response = false;
    if (saveJobId) {
      formData.id = saveJobId;
      response = await updateJob(formData);
    } else {
      response = await createJob(formData);
    }

    setDisableButton(false);
    if (response) {
      history.push("/jobs");
    }
  };

  const deleteJobCall = async () => {
    let formData = { id: deleteJobId };
    setDisableButton(true);

    await deleteJob(formData);
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
    setPhoneWithCountryCode(d);
    setPhoneNumber(b);
  };

  //working on it
  const addParams = (id) => {

    // console.log(id, "IDD")
    if (id == "create") {
      //here set ovevrlay to true
      setShowParamsToAdd(true);
      return false;
    }

    let arr = parametersAdded.length ? [...parametersAdded] : [];

    let paramFound = parameters.find((e) => {  
      return e._id == id 
       
      });

      console.log(paramFound, "FOUND")

    if (arr.length) {
      if (!arr.find((e) => e.id == id)) {
        arr.push({
          id: id,
          name: paramFound?.name,
          // percentage: 1,
          description: paramFound?.description,  
        });
      }
    } else {
      arr.push({
        id: id,
        name: paramFound?.name,
        // percentage: "",
        description: paramFound?.description,
      });
    }
    setParametersAdded(arr);
  };

  const deleteParameter = (id) => {
    let index = parametersAdded.findIndex((e) => e.id == id);
    let tmpParams = [...parametersAdded];
    tmpParams.splice(index, 1);
    setParametersAdded(tmpParams);
  };

  const updatePercentage = (val, id) => {
    let tmpArr = [...parametersAdded];
    tmpArr.map((obj, idx) => {
      if (obj.id == id) {
        console.log(val, "VA:LLL")
        obj.value = val;
      }
    });
    setParametersAdded(tmpArr);
  };

  const paramColumns = [
    {
      name: <Text tid="job-name-description-text" />,
      sortable: false,
      cell: (data) => {
        return data.name ;
      },
    },

    {
      name: <Text tid="job-value-text" />,
      sortable: false,
      cell: (data) => {
        console.log(data, "CELL DATA")
        return (
          <SingleSelect
            extraClasses={"gradeBox"}
            value={data.value}
            options={(userLanguage === 'en' ? newGradeSystemEn : newGradeSystemEs )}
            changeOption={(id) => updatePercentage(id, data.id)}
            placeholder={"Value"}
          />
        );
      },
    },
    {
      name: "Action",
      sortable: false,
      cell: (data) => {
        return (
          <Button
            type="icon-button"
            // type="trash-button"
            label={
              <ToolTip note="Delete Skill">
                <FaTrashAlt />
              </ToolTip>
            }
            onClick={() => deleteParameter(data.id)}
          />
        );
      },
    },
  ];
  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}

      <Link to="/jobs" className="goBack backToClass">
        <i className="uil uil-arrow-left" /> <Text tid="back-to-jobs-text" />
      </Link>
      {
        <div className="pageTitle mb-4">
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
            <Button
              type={"top-button"}
              extraClasses={`float-right ${
                disableButton ? "loaderBtn disable" : ""
              }`}
              onClick={() => (disableButton ? "" : saveJob())}
              label={<Text tid="save-change-button-text" />}
              disableBtn={disableButton}
            />
            <h2>
              {jobname} {lastname}
            </h2>
          </div>
        </div>
      }

      <div className="row">
        <div className="col-sm-7">
          <div className="formTitle">
            <span>
              <Text tid="job-details-text" />
            </span>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                label={<Text tid="job-name-text" />}
                type={"text"}
                value={jobname}
                handleInputChange={(e) => setJobname(e.target.value)}
                error={jobNameError}
                placeholder={changingLanguageText("job-name-text")} // shows object
                errorMessage={FIRSTNAME_ERROR_MESSAGE}
              />
            </div>
            <div className="col-lg-6">
              <SingleSelect
                label={<Text tid="organisation-unit-text" />}
                placeholder={<Text tid="organisation-unit-text" />} //works fine
                options={organisationUnit ? organisationUnit : []}
                changeOption={(id) => setJobType(id)}
                value={jobType}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SingleSelect
                label={<Text tid="education-level-text" />}
                placeholder={<Text tid="education-level-text" />}
                options={educationData ? educationData : []}
                changeOption={(id) => setEducation(id)}
                value={education}
              />
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="job-id-text" />}
                type={"text"}
                value={jobId}
                handleInputChange={(e) => setJobId(e.target.value)}
                error={jobIdError}
                placeholder={<Text tid="job-id-text" />}
                errorMessage={LASTNAME_ERROR_MESSAGE}
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div>
                <label className="fieldLabel">
                  <Text tid="country-text" />
                </label>
                <div className={"formField"}>
                  <Select
                    label={<Text tid="country-text" />}
                    placeholder={<Text tid="country-text" />}
                    options={ALL_COUNTRIES ? ALL_COUNTRIES : []}
                    onChange={handleChange}
                    classNamePrefix={"cs-recruitment"}
                    className={"custom-select-box"}
                    value={country}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Input
                label={<Text tid="city-text" />}
                type={"text"}
                value={city}
                handleInputChange={(e) => setCity(e.target.value)}
                error={cityError}
                placeholder={changingLanguageText("city-text")} // shows object
                errorMessage={"City is required"}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="formTitle-right">
            <span>
              <Text tid="add-parameter-text" />
            </span>
          </div>
          <div className="row parameters-row">
            <div className="col-lg-12">
              <SingleSelect
                label={<Text tid="parameters-text" />}
                placeholder={<Text tid="parameters-text" />}
                options={(userLanguage === 'en' ? enData : esData) }
                changeOption={(id) => addParams(id)}
                value={paramName}
                classNamePrefix={"cs-recruitment"}
                className={"custom-select-box"}
              />
            </div>

            {parametersAdded.length > 0 && (
              <TableOne
                extraClass={"maxWidth"}
                columns={paramColumns}
                data={parametersAdded}
                pagination={false}
              />
            )}
          </div>
        </div>
        <div className="col-sm-1 dividerOuter"></div>
      </div>

      {showDelete && (
        <Overlay
          title={<Text tid="delete-year-text" />}
          subTitle={<Text tid="delete-year-confirm-text" />}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => deleteJobCall()}
          disableBtn={disableButton}
          isDelete={true}
        ></Overlay>
      )}

      {showParamsToAdd && (
        <AddParamsOverlay
          parameters={parametersAdded}
          addParams={addParams}
          setShowParamsToAdd={setShowParamsToAdd}
        />
      )}
    </React.Fragment>
  );
};

export default ManageJobs;
