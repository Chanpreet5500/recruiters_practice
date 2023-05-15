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
import { FaEdit, FaTrashAlt, FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FilePicker } from "react-file-picker";
import { csvFileToArray } from "recruitment-utils/Service";
import EmailOverlay from "./EmailOverlay";
import CandidatesImportOverlay from "./CandidatesImportOverlay";
import { saveAs } from 'file-saver'
import { Text } from '../../../../context/provider'
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
import ResetIcon from "recruitment-images/refresh-arrows-circle-with-clockwise-rotation.svg";
import { changingLanguageText } from "../../../../lib/utils/Service";

const Candidates = (props) => {
  const history = useHistory();
  let newRef = useRef(null);

  const userProfile = useStoreState((state) => state.admin.userProfile);

  const [noRecord, showNoRecord] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showCsvPopup, setShowCsvPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showDelete, setShowDelete] = useState(false);
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
  //for overlay
  const [showEmail, setShowEmail] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [candidateId, setCandidateId] = useState(0);
  const [clientId, setClientId] = useState(0);
  const candidates = useStoreState((state) => state.admin.candidates);
  const allYears = useStoreState((state) => state.admin.allYears);
  const subjects = useStoreState((state) => state.admin.subjects);
  const updateCandidate = useStoreActions((actions) => actions.admin.updateCandidate);
  const previousCandidateFilter = useStoreState(
    (state) => state.admin.previousCandidateFilter
  );
  const getCandidates = useStoreActions(
    (actions) => actions.admin.getCandidates
  );
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

    setClientId(clientId);
    getCandidates({ clientId: clientId });
  }, []);

  useEffect(() => {
    if (candidates) {
      setCandidatesData(candidates);
    }
  }, [candidates]);

  // console.log(jobs);


  const changeCandidateStatus = async (candidateId, status) => {
    setShowFullPageLoader(true);
    await changeStatus({ candidateId,clientId, status });
    setShowFullPageLoader(false);
  };
  const deleteCandidateCall = async (candidateId) => {

    setShowFullPageLoader(true);
    await deleteCandidate({ clientId, candidateId });
    setShowFullPageLoader(false);
  };
  const handleSearch = (val) => {
    setSearchText(val);
    let items = candidates.filter(
      (x) =>
        x.first_name.toLowerCase().includes(val.toLowerCase()) ||
        x.last_name.toLowerCase().includes(val.toLowerCase()) ||
        x.jobs.find((e) => e.name.toLowerCase().includes(val.toLowerCase()))
    );
    setCandidatesData(items);
  };

  const editCandidate = (id) => {
    goToUrl(`/candidate/edit/${id}`);
  };

  const showEmailOverlay = (id) => {
    setCandidateId(id);

    let selCandidate = candidatesData.find((e) => e._id == id);
    setSelectedCandidate(selCandidate);

    setShowEmail(true);
  }

  const downloadSample = () => {
    saveAs(
      "SampleCSV.csv", "sample_CSV"
    );
  }

  const columns = [
    {
      name: <div>
        <Text tid="job-name-text" />
      </div>,
      sortable: false,
      cell: (data) => data?.jobs.map((e) => e.name).join(", "),
      width: "15%",
    },
    {
      name: <div>
        <Text tid="name-text" />
      </div>,
      sortable: false,
      cell: (data) => data.first_name + " " + data.last_name,
      width: "15%",
    },
    {
      name: <div>
        <Text tid="profession-text" />
      </div>,
      sortable: false,
      cell: (data) => data.profession,
      width: "15%",
    },
    {
      name: <div>
        <Text tid="education-text" />
      </div>,
      sortable: false,
      cell: (data) => data.education.toUpperCase(),
      width: "15%",
    },
    {
      name: <div>
        <Text tid="email-text" />
      </div>,
      sortable: false,
      cell: (data) => data.email,
      width: "20%",
    },
    {
      name: "",
      sortable: false,
      cell: (data) => (
        <>
          <Button
            type="icon-button"
            label={
              <ToolTip note={data.status ? "Deactivate" : "Activate"}>
                {data.status ? <FaLock className="activate"/> : <FaLockOpen className="deactivate"/>}
              </ToolTip>
            }
            onClick={() => changeCandidateStatus(data._id, data.status ? 0 : 1)}
          />
          <Button
            type="icon-button"
            label={
              <ToolTip note="Delete Candidate">
                <FaTrashAlt />
              </ToolTip>
            }
            onClick={() => deleteCandidateCall(data._id)}
          />

          <Button
            type="icon-button"
            label={
              <ToolTip note="Edit Candidate">
                <FaEdit />
              </ToolTip>
            }
            onClick={() => editCandidate(data._id)}
          />
          <Button
            type="icon-button"
            label={
              <ToolTip note="Invite Candidates">
                <MdEmail />
              </ToolTip>
            }
            onClick={() => showEmailOverlay(data._id)}
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

  const handleFileChange = async (fileObj) => {
    let finalArr = [];
    if (fileObj) {
      let arr = await csvFileToArray(fileObj, ",", true);

      arr.map((obj, idx) => {

        if (obj.length == 11) {
          finalArr.push({
            first_name: obj[0],
            last_name: obj[1],
            email: obj[2],
            phone_number: obj[3],
            profession: obj[4],
            experience: obj[5],
            education: obj[6],
            street_address: obj[7],
            city: obj[8],
            zip_code: obj[9],
            country: obj[10],
            candidate_client_id: userProfile.id,
          });
        }
      });
      setCandidatesToImport(finalArr);
      setShowCandidatesToImport(true)
    }
  };

  const handleFileError = (err) => {
    console.log(err);
  };

  const importCandidates = async () => {
    setShowFullPageLoader(true);
    let formData = {
      candidates: candidatesToImport
    }
    let response = false;
    response = await importingCandidates(formData);
    setCandidatesToImport([]);
    setShowCandidatesToImport(false);
    setShowFullPageLoader(false);
  };



  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      <div>
        <div className="section pb-0">
          <h1 className="pageTitle">
            <span className="pr-4"><Text tid="candidate-text" /></span>
            <button
              className="topButton float-right"
              onClick={() => goToUrl("/add-candidate")}
            >
              <i className="fa fa-plus-circle" /> <Text tid="add-candidate-text" />
            </button>
            <FilePicker
              extensions={["csv"]}
              onChange={(FileObject) => handleFileChange(FileObject)}
              onError={(errMsg) => handleFileError(errMsg)}
            >
              <button className="topButton float-right">
                <i className="fa fa-plus-circle" />
                <Text tid="import-candidate-text" />
              </button>
            </FilePicker>
            <button className="topButton float-right" onClick={() => downloadSample()}>
              <i className="fa fa-plus-circle" />
              <Text tid="download-sample-text" />
            </button>
          </h1>
          <p className="titleInfo">
            <Text tid="title-managecandidate-text" />
          </p>
        </div>
        {candidates?.length > 0 && (
          <div className="search-text">
            <Input
              label={""}
              type={"text"}
              value={searchText}
              handleInputChange={(e) => handleSearch(e.target.value)}
              placeholder={changingLanguageText("search-by-job-name-text")}
            />
          </div>
        )}
        <TableOne columns={columns} data={candidatesData} />
      </div>
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

      {showCandidatesToImport && (
        <CandidatesImportOverlay
          tempClose={showCandidatesToImport}
          candidates={candidatesToImport}
          importCandidates={importCandidates}
          setShowCandidatesToImport={setShowCandidatesToImport}
        />
      )}

      {showEmail && (
        <EmailOverlay
          selectedCandidate={selectedCandidate}
          tempClose={showEmail}
          firstName={selectedCandidate.first_name}
          jobs={selectedCandidate.jobs}
          setShowEmail={setShowEmail}
        />
      )}
    </React.Fragment>
  );
};

export default Candidates;

