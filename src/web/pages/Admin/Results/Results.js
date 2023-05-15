import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from "recruitment-utils/Validators.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Button from "recruitment-components/Button/Button.js";
import ToolTip from "recruitment-components/Tooltip/Tooltip.js";
import validator from "validator";
import Moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import Input from "recruitment-components/Input/Input.js";
import { FaEdit, FaTrashAlt, FaLock, FaLockOpen, FaEye, FaDownload } from "react-icons/fa";
import { FilePicker } from "react-file-picker";
import { csvFileToArray } from "recruitment-utils/Service";
import { saveAs } from 'file-saver'
import ResultOverlay from "./Resultsoverlay"
import { changingLanguageText } from "../../../../lib/utils/Service";
// import CandidatesImportOverlay from "./CandidatesImportOverlay";
// import { Text } from "recruitment-context/provider"
import { Text } from "../../../../context/provider"
import {
  NAME_ERROR_MESSAGE,
  INVALID_FNAME,
  INVALID_LNAME,
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
} from "recruitment-message";
import lodash from "lodash";
import { uploadCandidateCSV } from "recruitment-api/AdminApi.js";
import { Box, Grid, Typography } from "@mui/material";
import ResetIcon from "recruitment-images/refresh-arrows-circle-with-clockwise-rotation.svg";
import { StyledPageTitle, StyledSpan, StyledTitleInfo, StyledResultParentBox, StyledResultChildBox, StyledInputBox } from "../../../styledComponent/StyledComponents";


const Results = (props) => {
  const history = useHistory();
  let newRef = useRef(null);

  const userProfile = useStoreState((state) => state.admin.userProfile);
  const [noRecord, showNoRecord] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showCsvPopup, setShowCsvPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [showDelete, setShowDelete] = useState(true);
  const [deleteCandidateId, setDeleteCandidateId] = useState(0);
  const [showCustomLoader, setShowCustomLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [searchCandidates, setSearchCandidates] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);
  const [saveCandidate, setSaveCandidate] = useState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [yearsData, setYearsData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [candidatesToImport, setCandidatesToImport] = useState([]);

  const [newJobs, setNewJobs] = useState([]);

  const [showResult, setShowResult] = useState(false);
  const [pdf, setPdf] = useState([]);

  const candidates = useStoreState((state) => state.admin.candidates);
  const resultData = useStoreState((state) => state.admin.resultData);
  const downloadPdf = useStoreActions((actions) => actions.admin.downloadPdf);
  const allYears = useStoreState((state) => state.admin.allYears);
  const subjects = useStoreState((state) => state.admin.subjects);
  const updateCandidate = useStoreActions((actions) => actions.admin.updateCandidate);
  const previousCandidateFilter = useStoreState(
    (state) => state.admin.previousCandidateFilter
  );
  const getCandidates = useStoreActions(
    (actions) => actions.admin.getCandidates
  );
  const jobIdByInviteId = useStoreActions((actions) => actions.admin.jobIdByInviteId)

  const changeStatus = useStoreActions((actions) => actions.admin.changeStatus);
  const deleteCandidate = useStoreActions(
    (actions) => actions.admin.deleteCandidate
  );
  const createCandidate = useStoreActions(
    (actions) => actions.admin.createCandidate
  );
  const importingCandidates = useStoreActions((actions) => actions.admin.importingCandidates)
  const getAllYears = useStoreActions((actions) => actions.admin.getAllYears);
  const getSubjects = useStoreActions((actions) => actions.admin.getSubjects);
  const setUserProfile = useStoreActions(
    (actions) => actions.admin.setUserProfile
  );
  const setPreviousFilterOfCandidate = useStoreActions(
    (actions) => actions.admin.setPreviousFilterOfCandidate
  );
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [nameError, setNameError] = useState();

  //Add candidate modal
  const [email, setEmailAddress] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [forenameError, setForenameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [dobError, setDobError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [testResultData, setTestResultData] = useState([]);

  const [showCandidatesToImport, setShowCandidatesToImport] = useState(false);

  //Darg and Drop constants

  let dragCounter = useRef(0);
  const [dragFileList, setDragFileList] = useState([]);
  const [fileListError, setFileListError] = useState(false);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const [confirmText, setConfirmText] = useState("");
  const [candidatesFullData, setCandidatesFullData] = useState([]);

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userProfile) {
      //let name = user.firstname + " " + user.lastname;
      setUserProfile(user);
    }
    let clientId = userProfile ? userProfile.id : user.id;
    getCandidates({ clientId: clientId });
  }, []);


  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userProfile) {
      //let name = user.firstname + " " + user.lastname;
      setUserProfile(user);
    }
    let clientId = userProfile ? userProfile.id : user.id;
    jobIdByInviteId({ clientId: clientId });
  }, [])

  // useEffect(() => {
  //   if (candidates) {
  //     setCandidatesData(candidates.filter(e => e.jobs.length));
  //   }
  // }, [candidates]);

  useEffect(() => {
    if (resultData) {
      setCandidatesData(resultData);
    }
  }, [resultData])

  const deleteCandidateCall = async (candidateId) => {
    setShowFullPageLoader(true);
    await deleteCandidate({ candidateId });
    setShowFullPageLoader(false);
  };
  const handleSearch = (val) => {
    setSearchText(val);
    let items = resultData.filter(
      (x) => {
        const filterData = (x) ? (
          x.candidateId.first_name.toLowerCase().includes(val.toLowerCase()) ||
          x.candidateId.last_name.toLowerCase().includes(val.toLowerCase())
          // x.jobs.find((e) => e.name.toLowerCase()?.includes(val.toLowerCase()))  &&
          // x.jobs.find((e) => e.job_id.toLowerCase()?.includes(val.toLowerCase()))
        ) : x
        return filterData;
      }
    );
    const renderData = ((items.length == "") ? candidatesData : setCandidatesData(items));
    return renderData;
    ;
  };

  const pdfFromBackend = async (data) => {
    setShowFullPageLoader(true)
    const id = data.inviteId
    let pdf = await downloadPdf(data)
    const blob = new Blob([pdf], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `report-${id}.pdf`
    link.click()
    setShowFullPageLoader(false)

  }

  const viewPdf = (data) => {

    const id = data.inviteId
    const lang = localStorage.getItem("rcml-lang")

    window.open(`/view-report/${id}/${lang}`, '_blank')

  }


  const columns = [
    {
      name: <Text tid="result-table-jobname-text" />,
      sortable: false,
      cell: (data) => data?.jobId?.name,
      // width: "30%",
    },
    {
      name: <Text tid="result-table-name-text" />,
      sortable: false,
      cell: (data) => data?.candidateId?.first_name + " " + data?.candidateId?.last_name,
      // width: "15%",
    },
    {
      name: <Text tid="result-table-jobID-text" />,
      sortable: false,
      cell: (data) => data?.jobId?.job_id,
      // width: "25%",
    },
    {
      name: <Text tid="result-table-inviteID-text" />,
      sortable: false,
      cell: (data) => data?.inviteId,
      // width: "25%",
    },
    {
      name: <Text tid="result-table-score-text" />,
      sortable: false,
      cell: (data) => 0, //Math.floor(Math.random(99) * 100),
      // width: "10%",
    },
    {
      name: "",
      sortable: false,
      cell: (data) => (
        <>
          {<Button
            type="icon-button"
            label={
              <ToolTip note="See report">
                <FaEye />
              </ToolTip>
            }
            onClick={() => viewPdf(data)}
          />}
          <Button
            type="icon-button"
            label={
              <ToolTip note="Download report">
                <FaDownload />
              </ToolTip>
            }
            onClick={() => pdfFromBackend(data)}
          />
        </>
      ),
      width: "20%",
      center: false,
    },
  ];

  const goToUrl = (url) => {
    history.push(url);
  };





  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      <StyledResultParentBox>
        <StyledResultChildBox>
          <StyledPageTitle variant="h4">
            <StyledSpan variant="span">
              <Text tid="result-text" />
            </StyledSpan>
          </StyledPageTitle>
          <StyledTitleInfo variant="p">
            <Text tid="title-info-result" />
          </StyledTitleInfo>
        </StyledResultChildBox>
        {candidates?.length > 0 && (
          <StyledInputBox >
            <Input
              label={""}
              type={"text"}
              value={searchText}
              handleInputChange={(e) => handleSearch(e.target.value)}
              placeholder={changingLanguageText('search-text')}
            />
          </StyledInputBox>
        )}
        <TableOne columns={columns} data={candidatesData} />
      </StyledResultParentBox>
      {showDelete && (
        <Overlay
          title={"Are you sure?"}
          tempClose={showDelete}
          subTitle={confirmText}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => { }}
          disableBtn={disableButton}
        ></Overlay>
      )}


    </React.Fragment>
  );
};

export default Results;
