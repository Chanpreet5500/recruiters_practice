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
import { Route, useParams } from "react-router-dom";
import { Text } from "../../../../context/provider";
import {
  ERROR_INVALID_EMAIL,
  FIRSTNAME_ERROR_MESSAGE,
  LASTNAME_ERROR_MESSAGE,
  ERROR_ADDRESS,
  ERROR_INVALID_DOB,
  ERROR_INVALID_PHONE,
} from "recruitment-message";
import { ALL_COUNTRIES } from "recruitment-countries";
import Datagrid from "../../../components/DataGrid/Datagrid";

const AssigningCandidate = (props) => {
  const history = useHistory();
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [inviteText, setInviteText] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [isCustomText, setIsCustomText] = useState(false);

  const getCandidatesForJobId = useStoreActions(
    (actions) => actions.admin.getCandidatesForJobId
  );

  useEffect(() => {
    const init = async () => {
      setShowFullPageLoader(true);
      if (props.jobId) {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        let clientId = userProfile ? userProfile.id : user.id;
        let candidates = await getCandidatesForJobId({
          id: props.jobId,
          clientId: clientId,
        });

        setCandidateData(candidates);
      }
      setShowFullPageLoader(false);
    };
    init();
  }, []);

  let filteredCandidateData = [];
  candidateData.filter((e) => {
    return filteredCandidateData.push({
      id: e._id,
      name: e.first_name + " " + e.last_name,
      email: e.email,
    });
  });

  const columns = [
    {
      name: <Text tid="invite-name-text" />,
      sortable: false,
      cell: (data) => data.first_name + " " + data.last_name,
      // cell: (data) => data.experience,
    },
    {
      name: <Text tid="invite-email-text" />,
      sortable: false,
      cell: (data) => data.email,
      // cell: (data) => data.experience,
    },
  ];

  const finalColumns = [
    {
      field: "name",
      headerName: <Text tid="invite-name-text" />,
      sortable: false,
      cell: (data) => data.first_name + " " + data.last_name,
    },
    {
      field: "email",
      headername: <Text tid="invite-email-text" />,
      sortable: false,
      cell: (data) => data.email,
    },
  ];

  const handleSelectedData = (selectObj) => {
    const { allSelected, selectedCount, selectedRows } = selectObj;
    setSelectedCandidates(selectedRows);
  };

  console.log(candidateData, "candidate data from assigning candidate");

  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      {!isCustomText ? (
        <>
          <TableOne
            columns={columns}
            data={candidateData}
            selectableRows={true}
            onSelectedRowsChange={handleSelectedData}
            perPage={5}
          />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-md-12">
              <div>
                <label className="fieldLabel invite-label">
                  <Text tid="add-invite-text" />
                </label>
                <div className={"formField"}>
                  <Textarea
                    label={""}
                    type={"text"}
                    value={inviteText}
                    handleInputChange={(e) => setInviteText(e.target.value)}
                    placeholder={"Add invite text"}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="text-center pt-2 d-block">
        {isCustomText && (
          <Button
            type="line-button"
            label={"Back"}
            onClick={() => setIsCustomText(false)}
          />
        )}
        {selectedCandidates.length > 0 && (
          <Button
            type="blue-button"
            onClick={() => {
              isCustomText
                ? props.handleSendInvite(selectedCandidates, inviteText)
                : setIsCustomText(true);
            }}
            label={!isCustomText ? "Add notes to Invite" : "Send Invite"}
            extraClasses={"ml-2"}
          />
        )}
      </div>
      {/* {candidateData?.length > 0 &&
        candidateData.map((obj, idx) => {
          return (
            <div className="assign-candidate-row" key={"candidates-" + idx}>
              <div>{obj.first_name + " " + obj.last_name}</div>
              <Button
                type="square-button"
                label={"Send Invite"}
                onClick={() => props.handleSendInvite(obj._id)}
              />
            </div>
          );
        })} */}
    </React.Fragment>
  );
};

export default AssigningCandidate;
