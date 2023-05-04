import React, { useState, useEffect, useContext } from "react";
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
// import AddParamsOverlay from "./AddParamsOverlay.js";
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

const Compare = (props) => {
  const [paramsData, setParamsData] = useState([]);
  const [parametersAdded, setParametersAdded] = useState([]);
  const [ value, setValue ] = useState([]);
  const [showParamsToAdd, setShowParamsToAdd] = useState();
  const [paramName, setParamName] = useState("");

  const [totalTests, setTotalTests] = useState(0);
  const [clientId, setClientId] = useState(0);

  const [jobId, setJobId] = useState(0);
  const [jobsData, setJobsData] = useState([]);
  const [jobName, setJobName] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [enData, setEnData] = useState([]);
  const [esData, setEsData] = useState([]);

  const [candidateData, setCandidateData] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedParams, setSelectedParams] = useState([]);

  const [showInviteCandidate, setShowInviteCandidate] = useState(false);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  const userProfile = useStoreState((state) => state.admin.userProfile);

  const getStripeProducts = useStoreActions(
    (actions) => actions.admin.getStripeProducts
  );
  const jobs = useStoreState((state) => state.admin.jobs);
  const parameters = useStoreState((state) => state.admin.parameters);
  const getJobs = useStoreActions((actions) => actions.admin.getJobs);

  const getActiveParams = useStoreActions(
    (actions) => actions.admin.getActiveParams
  );
  const getCandidatesForJobId = useStoreActions(
    (actions) => actions.admin.getCandidatesForJobId
  );
  const getCandidatesWithJob = useStoreActions(
    (actions) => actions.admin.getCandidatesWithJob
  );

  const { userLanguage } = useContext(LanguageContext);

  const [candidatesData, setCandidatesData] = useState([]);

  const getCandidates = useStoreActions(
    (actions) => actions.admin.getCandidates
  );

  const candidates = useStoreState((state) => state.admin.candidates);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    let cId = userProfile ? userProfile.id : user.id;
    let tests = userProfile ? userProfile.totalTests : user.totalTests;
    // setTotalTests(tests);
    setClientId(cId);
    getJobs({ clientId: cId });
    getActiveParams();
  }, []);

  useEffect(() => {
    if (parameters) {
      let tempArr = [];
      if (parameters.length) {
        parameters.map((obj, idx) => {
          tempArr.push({
            name: obj.name ,
            language: obj.language,
            id: obj._id,
          });
        });
      }
      setEnData(tempArr.filter((e) => e.language === "en"));
      setEsData(tempArr.filter((e) => e.language === "es"));
      setParamsData(tempArr);
    }
  }, [parameters]);


  useEffect(() => {
    if (jobs) {
      let tmpJobs = [];
      jobs.map((obj, idx) => {
        tmpJobs.push({ name: obj.name, id: obj._id });
      });

      setJobsData(tmpJobs);
    }
  }, [jobs]);

  const openInviteCandidate = (id) => {
    setJobId(id);
    let selJob = jobsData.find((e) => e._id == id);
    setSelectedJob(selJob);
    setShowInviteCandidate(true);
  };

  const closeInviteCandidate = () => {
    setJobId(0);
    setShowInviteCandidate(false);
  };

  const handleChange = async (jobId) => {
    const candidates = await getCandidatesWithJob({ jobId, clientId });
    setCandidateData(candidates);
  };

  const gradeSystem = [
    { name: "1", id: "1" },
    { name: "2", id: "2" },
    { name: "3", id: "3" },
    { name: "4", id: "4" },
    { name: "5", id: "5" },
    { name: "6", id: "6" },
    { name: "7", id: "7" },
    { name: "8", id: "8" },
    { name: "9", id: "9" },
    { name: "10", id: "10" },
  ];

  const handleSelectedData = (selectObj) => {
    const { allSelected, selectedCount, selectedRows } = selectObj;
    setSelectedCandidates(selectedRows);
  };
  const handleSelectedParams = (selectObj) => {
    const { allSelected, selectedCount, selectedRows } = selectObj;
    // setSelectedParams(selectedRows);
    setValue(selectedRows)
  };

  const paramsColumns = [
    {
      name: <Text tid="parameters-select-text" />,
      sortable: false,
      cell: (data) => data.name,
    },
  ];

  const candidateColumns = [
    {
      name: <Text tid="candidate-select-compare" />,
      sortable: false,
      cell: (data) => data.first_name + " " + data.last_name,
    },
    // },
    // {
    //   name: (
    //     <Button
    //         type="blue-button"
    //         onClick={() => {
    //           setShowParamsToAdd(true);
    //         }}
    //         label="Compare"
    //         extraClasses={"ml-2"}
    //       />
    //   ),
    //   sortable: false,
    //   cell: (data) => <></>,
    //   omit: (selectedCandidates && selectedCandidates.length == 0),
    // },
  ];

  return (
    <>
      <div className="formTitle">
        <span>
          <Text tid="compare-text" />
        </span>
      </div>
      <div className="row">
        <div className="m-l-40 col-lg-6">
          <SingleSelect
            label={<Text tid="jobs-text" />}
            placeholder={<Text tid="jobs-text" />}
            options={jobsData ? jobsData : []}
            changeOption={(id) => handleChange(id)}
            value={jobName}
            classNamePrefix={"cs-recruitment"}
            className={"custom-select-box"}
          />
        </div>
        <div className="col-lg-6">
          {candidateData && candidateData.length > 0 && (
            <TableOne
              columns={candidateColumns}
              data={candidateData}
              selectableRows={true}
              onSelectedRowsChange={handleSelectedData}
            />
          )}
        </div>
        <div className="col-lg-6">
          {selectedCandidates &&
            selectedCandidates.length > 0 &&
            paramsData &&
            paramsData.length > 0 && (
              <TableOne
                columns={paramsColumns}
                data={(userLanguage === 'en' ? enData : esData)}
                selectableRows={true}
                onSelectedRowsChange={handleSelectedParams}
              />
            )}
        </div>
      </div>
      {selectedCandidates?.length > 0 && value.length > 0 && (
        <table className="parameter-table m-l-40">
          <thead>
            <tr>
              <th>
                <Text tid="parameters-text" />
              </th>
              {selectedCandidates.map((candidate, i) => {
                return <th>{candidate.first_name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {/* {userLanguage === "en"
              ? enData.map((param, i) => {
                console.log(param , "PARAMSSSSSSS")
                  return (
                    <tr key={"row" + i}>
                      <td>{param.name}</td>
                      {selectedCandidates.map((candidate, i) => {
                        return <td>{"7"}</td>;
                      })}
                    </tr>
                  );
                })
              : esData.map((param, i) => {
                  return (
                    <tr key={"row" + i}>
                      <td>{param.name}</td>
                      {selectedCandidates.map((candidate, i) => {
                        return <td>{"7"}</td>;
                      })}
                    </tr>
                  );
                })} */}
                { value.map((param, i) => {
                  return (
                    <tr key={"row" + i}>
                      <td>{param.name}</td>
                      {selectedCandidates.map((candidate, i) => {
                        return <td>{"7"}</td>;
                      })}
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
      )}
    </>
  );
};

export default Compare;
