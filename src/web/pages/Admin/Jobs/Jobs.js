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
import AssigningCandidate from "./AssigningCandidate.js";
import { Text } from "../../../../context/provider.js";
import { changingLanguageText } from "../../../../lib/utils/Service.js";
// import { components, Select } from "react-select";
import Select from "react-select";
import {
  AddJobButton,
  PurchaseTestButton,
  JobsHeading,
  JobHeadingChild,
  TitleInfo,
  SearchText,
  SearchJobInput,
  ProductRow,
} from "./JobStyled.js";
import AddIcon from "@mui/icons-material/Add";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import {
  FaEdit,
  FaTrashAlt,
  FaLock,
  FaLockOpen,
  FaUserPlus,
} from "react-icons/fa";
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
import lodash, { set } from "lodash";
import { uploadJobCSV } from "recruitment-api/AdminApi.js";
import ResetIcon from "recruitment-images/refresh-arrows-circle-with-clockwise-rotation.svg";
import CustomTable from "../../../components/CustomTable/CustomTable.js";
import Datagrid from "../../../components/DataGrid/Datagrid.js";

const Jobs = (props) => {
  const history = useHistory();
  let newRef = useRef(null);

  const userProfile = useStoreState((state) => state.admin.userProfile);
  const [noRecord, showNoRecord] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [reusableData, setReusableData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showPurchaseOverlay, setShowPurchaseOverlay] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(0);
  const [qtyToPurchase, setQtyToPurchase] = useState(0);
  const [showCustomLoader, setShowCustomLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showReviewCart, setShowReviewCart] = useState(false);
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);
  const [searchJobs, setSearchJobs] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [qty, setQty] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [jobId, setJobId] = useState(0);
  const [totalTests, setTotalTests] = useState(0);
  const [clientId, setClientId] = useState(0);
  const [candidatesData, setCandidatesData] = useState([]);
  const [pricesData, setPricesData] = useState([]);

  const [comparedSkillsWithJobs, setComparedSkillsWithJobs] = useState([]);

  const products = useStoreState((state) => state.admin.products);
  const productPrices = useStoreState((state) => state.admin.productPrices);
  const candidates = useStoreState((state) => state.admin.candidates);
  const jobs = useStoreState((state) => state.admin.jobs);
  const getJobs = useStoreActions((actions) => actions.admin.getJobs);
  const changeStatus = useStoreActions((actions) => actions.admin.changeStatus);
  const jobChangeStatus = useStoreActions(
    (actions) => actions.admin.jobChangeStatus
  );
  const getAllSkills = useStoreState((state) => state.admin.jobsParams?.skills);

  const deleteJob = useStoreActions((actions) => actions.admin.deleteJob);
  const createJob = useStoreActions((actions) => actions.admin.createJob);
  const createCheckoutSession = useStoreActions(
    (actions) => actions.admin.createCheckoutSession
  );
  const setAllSkills = useStoreActions(
    (actions) => actions.admin.getJobsSkills
  );

  const getCandidates = useStoreActions(
    (actions) => actions.admin.getCandidates
  );
  const sendInviteToCandidate = useStoreActions(
    (actions) => actions.admin.sendInviteToCandidate
  );
  const getStripeProducts = useStoreActions(
    (actions) => actions.admin.getStripeProducts
  );
  const getProductPrices = useStoreActions(
    (actions) => actions.admin.getProductPrices
  );
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [nameError, setNameError] = useState();

  const [searchText, setSearchText] = useState("");
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);

  //Darg and Drop constants

  // const skillsvalues = getAllSkills.map(e => e)

  let dragCounter = useRef(0);
  const [jobsSkills, setJobsSkills] = useState(getAllSkills);

  const newSkills = [];

  newSkills.push(
    getAllSkills?.map((e) => {
      return { value: e.name, label: e.name };
    })
  );

  const [dragFileList, setDragFileList] = useState([]);
  const [stripeProducts, setStripeProducts] = useState([]);
  const [fileListError, setFileListError] = useState(false);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const [confirmText, setConfirmText] = useState("");
  const [jobsFullData, setJobsFullData] = useState([]);

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userProfile) {
      //let name = user.firstname + " " + user.lastname;
      //setUserProfile(user);
    }
    let cId = userProfile ? userProfile.id : user.id;
    let tests = userProfile ? userProfile.totalTests : user.totalTests;
    setTotalTests(tests);
    setClientId(cId);
    getJobs({ clientId: cId });
    getStripeProducts();
    setAllSkills();
  }, []);

  useEffect(() => {
    if (jobs) {
      setJobsData(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    if (products) {
      setStripeProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (candidates) {
      setCandidatesData(candidates);
    }
  }, [candidates]);

  const changeJobStatus = async (jobId, status) => {
    // console.log(jobId, status, 'from changeJobStatus')
    setShowFullPageLoader(true);

    await jobChangeStatus({ jobId, status, clientId });
    setShowFullPageLoader(false);
  };
  const deleteJobCall = async (jobId) => {
    setShowFullPageLoader(true);
    await deleteJob({ jobId });
    setShowFullPageLoader(false);
  };
  const handleSearch = (val) => {
    setSearchText(val);
    let items = jobs.filter(
      (x) =>
        x.name.toLowerCase().includes(val.toLowerCase()) ||
        x.job_id.toLowerCase().includes(val.toLowerCase())
    );
    setJobsData(items);
  };

  const editJob = (id) => {
    goToUrl(`/job/edit/${id}`);
  };

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

  let ans = [];

  useEffect(() => {
    let show = [];
    console.log(jobsData,'Table Data')
    jobsData.filter((e) => {
      return show.push({
        id: e._id,
        name: e.name,
        organisationUnit: e.type,
        education: e.education,
        jobId: e.job_id,
        status: e.status,
      });
    });
    setReusableData(show);
  }, [jobsData]);

  // reusableData.map((e) => {
  //   ans.push(Object.values(e));
  // });

  const openInviteCandidate = (id) => {
    console.log(id, "inviteCandidate");
    setJobId(id);
    let selJob = jobsData.find((e) => e._id == id);
    setSelectedJob(selJob);
    setShowInviteCandidate(true);
  };

  const closeInviteCandidate = () => {
    setJobId(0);
    setShowInviteCandidate(false);
  };

  const closePurchaseOverlay = () => {
    setShowPurchaseOverlay(false);
  };

  const goToUrl = (url) => {
    history.push(url);
  };

  const handleSendInvite = async (candidates, inviteText) => {
    if (totalTests > 0) {
      setShowFullPageLoader(true);
      let response = await sendInviteToCandidate({
        jobId: jobId,
        candidates: candidates,
        inviteText: inviteText,
        clientId: clientId,
      });
      setShowFullPageLoader(false);
      closeInviteCandidate();
    } else {
      toast.error(
        <ToastUI
          message={
            "You don't have enough tests to send invite. Please purchase tests first."
          }
          type={"Error"}
        />,
        {
          toastId: "toast-show",
        }
      );
      return false;
    }
  };

  const getPrices = async (id) => {
    setShowFullPageLoader(true);
    setSelectedProduct(products.find((e) => e.id == id));
    await getProductPrices({ id });
    setShowFullPageLoader(false);
  };
  const handleQtyChange = (e, id) => {
    e.preventDefault();
    let qty = e.target.value;
    const re = /^[0-9\b]+$/;
    qty = re.test(qty) ? qty : "";
    if (qty === "" || re.test(qty)) {
      let product = stripeProducts.find((e) => e.id == id);
      let prods = [...stripeProducts];
      let productIndex = prods.findIndex((e) => e.id == id);
      product.qty = qty;
      prods[productIndex] = product;
      let allQty = prods.reduce((total, num) => {
        return num.qty ? total + Math.round(num.qty) : total;
      }, 0);
      if (allQty > 0) {
        setQtyToPurchase(allQty);
      }
      setStripeProducts(prods);
    }
  };

  const handleChange = (options) => {
    const x = jobs.find((e) => e.parameters.name == options.value);
    setComparedSkillsWithJobs(x);
  };

  const reviewCart = () => {
    setShowReviewCart(true);
  };

  const checkout = async () => {
    let url = await createCheckoutSession({
      lineItems: stripeProducts,
      userId: clientId,
    });
    window.location.href = url;
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: "backgroundColor",
      width:160,
    },
    {
      field: "organisationUnit",
      headerName: "Organisation Unit",
      headerClassName: "backgroundColor",
      width:160,
    },
    {
      field: "education",
      headerName: "Education",
      headerClassName: "backgroundColor",
      width:160,
    },
    {
      field: "jobId",
      headerName: "Job ID",
      headerClassName: "backgroundColor",
      width:160,
    },
    {
      field: "Action",
      headerName: "Action",
      headerClassName: "backgroundColor",
      sortable: false,
      width:360,
      renderCell: (data) => (
        <>
          <Button
            type="icon-button"
            label={
              <ToolTip note={data.row.status ? "Deactivate" : "Activate"}>
                {data.row.status ? (
                  <LockIcon sx={{ color: "red" }} />
                ) : (
                  <LockOpenIcon sx={{ color: "red" }} />
                )}
              </ToolTip>
            }
            onClick={() => changeJobStatus(data.id, data.row.status ? 0 : 1)}
          />
          <Button
            type="icon-button"
            label={
              <ToolTip note="Delete Job">
                <DeleteIcon sx={{ color: "#000" }} />
              </ToolTip>
            }
            onClick={() => deleteJobCall(data.id)}
          />
          <Button
            type="icon-button"
            label={
              <ToolTip note="Edit Job">
                <EditIcon sx={{ color: "#000" }} />
              </ToolTip>
            }
            onClick={() => editJob(data.id)}
          />
          <Button
            type="icon-button"
            label={
              <ToolTip note="Invite Candidates">
                <PersonAddAltIcon sx={{ color: "#000" }} />
              </ToolTip>
            }
            onClick={() => openInviteCandidate(data.id)}
          />
        </>
      ),
    },
  ];

  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      <Box>
        <Box>
          <JobsHeading className="pageTitle">
            <JobHeadingChild className="pr-4">
              <Text tid="jobs-text" />
            </JobHeadingChild>
            <AddJobButton onClick={() => goToUrl("/add-job")}>
              <AddIcon /> <Text tid="add-job-text" />
            </AddJobButton>

            <PurchaseTestButton
              // className="topButton float-right"
              onClick={() => setShowPurchaseOverlay(true)}
            >
              <AddIcon /> <Text tid="purchase-tests-text" />
            </PurchaseTestButton>
          </JobsHeading>
          <TitleInfo className="titleInfo">
            <Text tid="jobs-title-info-text" />
          </TitleInfo>
        </Box>
        {jobs?.length > 0 && (
          <SearchText className="search-text">
            <SearchJobInput
              variant="filled"
              label={changingLanguageText("search-job-text")}
              InputProps={{ disableUnderline: true }}
              type={"text"}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              // placeholder={changingLanguageText('search-job')}

              // placeholder={changingLanguageText("search-job-text")}
            />
          </SearchText>
        )}
        <Box
          sx={{
            "& .backgroundColor": {
              backgroundColor: "#91c6c8",
              fontSize: "20px",
              fontFamily: "Jost-Regular",
            },
          }}
        >
          <Datagrid
            sx={{
              border: "none",
              backgroundColor: "#fff",
            }}
            data={reusableData ? reusableData : []}
            columns={columns}
          />
        </Box>
        {getAllSkills && (
          <div>
            {/* <h3>hello</h3> */}
            {/* <Select  options={newSkills[0]} onChange={(e) => handleChange(e)}  isMulti/>  */}
          </div>
        )}
      </Box>
      {showDelete && (
        <Overlay
          title={"Are you sure?"}
          subTitle={confirmText}
          closeOverlay={() => setShowDelete(false)}
          cancelOverlay={() => setShowDelete(false)}
          submitOverlay={() => {}}
          disableBtn={disableButton}
        ></Overlay>
      )}
      {showInviteCandidate && (
        <Overlay
          title={<Text tid="invite-candidate" />}
          subTitle={
            changingLanguageText("for-job-text") + " " + `${selectedJob?.name}`
          }
          closeOverlay={() => {
            closeInviteCandidate();
          }}
          cancelOverlay={() => {
            closeInviteCandidate();
          }}
          submitOverlay={() => {}}
          disableBtn={disableButton}
          footer={""}
          onClickFooter={() => {
            setShowInviteCandidate(false);
          }}
          showActions={false}
          wrapperClass={"mediumWrapper"}
        >
          <AssigningCandidate
            jobId={jobId}
            handleSendInvite={(id) => handleSendInvite(id)}
          />
        </Overlay>
      )}
      {showPurchaseOverlay && (
        <Overlay
          title={<Text tid="Purchase-test" />}
          subTitle={<Text tid="Enter-qun.-to-purchase" />}
          closeOverlay={() => {
            closePurchaseOverlay();
          }}
          cancelOverlay={() => {
            closePurchaseOverlay();
          }}
          submitOverlay={() => {}}
          disableBtn={disableButton}
          footer={""}
          showActions={false}
          wrapperClass={"mediumWrapper"}
        >
          {!showReviewCart ? (
            <>
              {selectedProduct == "" &&
                stripeProducts?.length > 0 &&
                stripeProducts.map((obj, idx) => {
                  if (obj.unit_amount == 0 || obj.unit_amount == null)
                    return false;

                  return (
                    <ProductRow
                    /*onClick={() => getPrices(obj.id)}*/
                    >
                      <div
                        // component="img"
                        className="image"
                        // src={obj?.product?.image[0]}
                      >
                        <img src={obj?.product?.images[0]} />
                      </div>
                      <div className="product-info">
                        <span className="product-name">{obj.product.name}</span>
                        <span className="product-desc">
                          {obj.product.description}
                        </span>
                        <span className="product-price">
                          ${obj.unit_amount / 100}
                        </span>
                      </div>
                      <div>
                        <Input
                          label={""}
                          type={"text"}
                          value={obj.qty}
                          handleInputChange={(e) => handleQtyChange(e, obj.id)}
                          placeholder={changingLanguageText("Enter-qty.")}
                          key={"price-" + obj.id}
                        />
                      </div>
                    </ProductRow>
                  );
                })}
              {qtyToPurchase > 0 && (
                <div
                  className="product-row"
                  /*onClick={() => getPrices(obj.id)}*/
                >
                  <Button
                    type="blue-button"
                    label={"Purchase"}
                    onClick={reviewCart}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="product-review-container">
              <div className="product-row header">
                <div>
                  <Text tid="product-name-text" />
                </div>
                <div>
                  <Text tid="price-text" />
                </div>
                <div>
                  <Text tid="quantity-text" />
                </div>
                <div>
                  <Text tid="total-text" />
                </div>
              </div>
              {selectedProduct == "" && stripeProducts?.length > 0 && (
                <>
                  {stripeProducts.map((obj, idx) => {
                    if (
                      obj.unit_amount == 0 ||
                      obj.unit_amount == null ||
                      !obj.qty
                    )
                      return false;

                    return (
                      <>
                        <div
                          className="product-row"
                          /*onClick={() => getPrices(obj.id)}*/
                        >
                          <div>{obj.product.name}</div>
                          <div>${obj.unit_amount / 100}</div>
                          <div>{obj.qty}</div>
                          <div>${(obj.unit_amount / 100) * obj.qty}</div>
                        </div>
                      </>
                    );
                  })}
                  <div className="product-row footer">
                    <Button
                      type="blue-button"
                      label={"Purchase"}
                      onClick={checkout}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </Overlay>
      )}
    </React.Fragment>
  );
};

export default Jobs;
