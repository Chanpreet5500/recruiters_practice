import React, { useState, useEffect } from 'react';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import SingleSelect from "recruitment-components/SingleSelect/SingleSelect.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import Candidates from './Candidate';
import Button from "recruitment-components/Button/Button.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import { ToastContainer, toast } from "react-toastify";
import { Text } from "../../../../context/provider"


const EmailOverlay = (props) => {

  const [jobsData, setJobsData] = useState([]);

  const [jobId, setJobId] = useState(0);

  const [jobName, setJobName] = useState("")

  const [inviteText, setInviteText] = useState("");
  const [selectedJobs, setSelectedJobs] = useState(0)
  const [isCustomText, setIsCustomText] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);

  const [totalTests, setTotalTests] = useState(0);
  const [clientId, setClientId] = useState(0);
  const getJobs = useStoreActions((actions) => actions.admin.getJobs);
  const jobs = useStoreState((state) => state.admin.jobs);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const sendInviteToCandidate = useStoreActions(
    (actions) => actions.admin.sendInviteToCandidate
  );

  useEffect(() => {
    if (!jobs) {
      let user = JSON.parse(localStorage.getItem("loggedInUser"));
      let cId = userProfile ? userProfile.id : user.id;
      let tests = userProfile ? userProfile.totalTests : user.totalTests;
      setTotalTests(tests);
      setClientId(cId);
      getJobs({ clientId: cId });
    }
  }, [])

  useEffect(() => {
    if(userProfile) {
      setClientId(userProfile.id);
      setTotalTests(userProfile.totalTests)
    }
  }, [userProfile])

  useEffect(() => {
    if (jobs) {
      let newJobs = jobs.filter(e => !props.jobs.find(j => j._id == e._id))
      let tempArr = []
      if (jobs.length) {
        newJobs.map((obj, idx) => {
          tempArr.push({ name: obj.name, id: obj._id })
        });
      }
      if (tempArr.length == 0) {
        setDisableBtn(true);
        toast.error(<ToastUI message={"Selected candidate has been invited for all jobs. Please select different candidate."} type={"Error"} />, {
          toastId: 'toast-show'
        });
      }

      setJobsData(tempArr)
    }
  }, [jobs])

  const jobsSelector = (id) => {
    setJobId(id);
    let selJob = jobsData.find((e) => e.id == id);
    setSelectedJobs(selJob);
  }

  const closeInviteCandidate = () => {
    setJobId(0);
    setShowInviteCandidate(false);
    props.setShowEmail(false);
  };

  const handleSendInvite = async () => {
    if (totalTests > 0) {
      setShowFullPageLoader(true);
      let response = await sendInviteToCandidate({
        jobId: jobId,
        candidates: [props.selectedCandidate],
        inviteText: inviteText,
        clientId: clientId
      });
      setShowFullPageLoader(false);
      closeInviteCandidate();
    }
    else {
      toast.error(<ToastUI message={"You don't have enough tests to send invite. Please purchase tests first."} type={"Error"} />, {
        toastId: 'toast-show'
      });
      return false;
    }
    if (selectedJobs == 0) {
      toast.error(<ToastUI message={"Please select jobs first."} type={"Error"} />, {
        toastId: 'toast-show'
      });
      return false;
    }
    if (!inviteText) {
      toast.error(<ToastUI message={"Please enter invite text."} type={"Error"} />, {
        toastId: 'toast-show'
      });
      return false
    }
  };

  console.log(jobsData)
  return (
    <React.Fragment>
      <Overlay
        title={"Send Invitation"}
        subTitle={`to - ${props.firstName}`}
        closeOverlay={() => props.setShowEmail(false)}
        cancelOverlay={() => props.setShowEmail(false)}
        submitOverlay={() => handleSendInvite()}
        wrapperClass={"mediumWrapper"}
        btnLabel={"Send Invite"}
        showActions={!disableBtn}

      >
        <div className="row m-b-20">
          <div className="col-md-12">
            <label className="fieldLabel invite-label"><Text tid="jobs-text" /></label>
            <SingleSelect
              label={""}
              placeholder={"Jobs"}
              options={jobsData ? jobsData : []}
              changeOption={(id) => jobsSelector(id)}
              value={selectedJobs}

            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div>
              <label className="fieldLabel invite-label"><Text tid="add-invite-text" /></label>
              <div className={'formField'}>
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

        {/* <div className="text-center pt-2 d-block">
          {isCustomText && (
            <Button
              type="line-button"
              label={"Back"}
              onClick={() => setIsCustomText(false)}
            />
          )}
          {props.selectedCandidate.length > 0 && (
            <Button
              type="blue-button"
              onClick={() => {
                isCustomText
                  ? props.handleSendInvite()
                  : setIsCustomText(true);
              }}
              label={!isCustomText ? "Add notes to Invite" : "Send Invite"}
              extraClasses={"ml-2"}
            />
          )}
        </div> */}
      </Overlay>
    </React.Fragment>
  );
};

export default EmailOverlay;

