import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from "recruitment-utils/Validators.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import { logoutCompletely } from 'recruitment-utils/Service.js';

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

// import { Text } from "../../context/provider"
import { Text } from "../../../src/context/provider"

// import AssigningCandidate from "./AssigningCandidate.js";
import {
  FaEdit,
  FaTrashAlt,
  FaLock,
  FaLockOpen,
  FaMailBulk,
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
import lodash from "lodash";
import { uploadJobCSV } from "recruitment-api/AdminApi.js";
import ResetIcon from "recruitment-images/refresh-arrows-circle-with-clockwise-rotation.svg";

import { changingLanguageText } from "../../lib/utils/Service";

const Accounts = (props) => {
  const history = useHistory();
  let newRef = useRef(null);

  const userProfile = useStoreState((state) => state.admin.userProfile);
  const [noRecord, showNoRecord] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [confirmPop, setConfirmPop] = useState(false);
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

  const products = useStoreState((state) => state.admin.products);
  const productPrices = useStoreState((state) => state.admin.productPrices);
  const candidates = useStoreState((state) => state.admin.candidates);
  const jobs = useStoreState((state) => state.admin.jobs);
  const transactions = useStoreState((state) => state.admin.transactions);
  const getJobs = useStoreActions((actions) => actions.admin.getJobs);
  const changeStatus = useStoreActions((actions) => actions.admin.changeStatus);
  const deleteJob = useStoreActions((actions) => actions.admin.deleteJob);
  const createJob = useStoreActions((actions) => actions.admin.createJob);
  const getAllTransactions = useStoreActions((actions) => actions.admin.getAllTransactions);
  const createCheckoutSession = useStoreActions((actions) => actions.admin.createCheckoutSession);
  const deactivateAccount = useStoreActions((actions) => actions.admin.deactivateAccount);
  const logoutUser = useStoreActions((actions) => actions.authentication.logoutUser);
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

  let dragCounter = useRef(0);
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
    getAllTransactions({id: cId});
    if(!products) {
      getStripeProducts();
    }
    //getStripeProducts();
  }, []);

  useEffect(() => {
      if (transactions) {
          setTransactionData(transactions)
      }
  }, [transactions]);



  useEffect(() => {
    if (products) {
      setStripeProducts(products);
    }
  }, [products]);


  const changeJobStatus = async (jobId, status) => {
    setShowFullPageLoader(true);
    await changeStatus({ jobId, status });
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

  const closePurchaseOverlay = () => {
    setShowPurchaseOverlay(false);
  };

  const goToUrl = (url) => {
    history.push(url);
  };

  const handleSendInvite = async (candidates, inviteText) => {
    if(totalTests > 0) {
      setShowFullPageLoader(true);
      let response = await sendInviteToCandidate({
        jobId: jobId,
        candidates: candidates,
        inviteText: inviteText,
        clientId: clientId
      });
      setShowFullPageLoader(false);
      closeInviteCandidate();      
    } else {
      toast.error(<ToastUI message={"You don't have enough tests to send invite. Please purchase tests first."} type={"Error"} />, {
        toastId: 'toast-show'
      });
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

  const reviewCart = () => {
    setShowReviewCart(true);
  };

  const checkout = async () => {
    let url = await createCheckoutSession({lineItems : stripeProducts, userId: clientId});
    window.location.href = url;
  };

  const columns = [
    {
      name: <Text tid="table-testpurchades-text" />,
      sortable: false,
      cell: (data) => {
          return data.tests_purchased;
      },
    },
    {
      name:  <Text tid="table-date-text" />,
      sortable: false,
      cell: (data) => {
        return data.date_created;
      },
    },
    {
      name: <Text tid="table-amount-text" />,
      sortable: false,
      cell: (data) => {
        return "$"+((data.total_amount/100).toFixed(2));
      },
    },
    {
      name: <Text tid="table-status-text" />,
      sortable: false,
      cell: (data) => {
        return data.status.toUpperCase(); 
      },
    },
  ];

  const handleDeactivate = async () => {
    let res = await deactivateAccount({id: clientId});
    if(res) {
      let response = await logoutUser({email:userProfile.email});
      if (response) {
        logoutCompletely();
        history.push('/login');
      }  else {
        logoutCompletely();
        history.push('/login');
      }   
    }

  }
  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      <div>
        <div className="section pb-0">
          <h1 className="pageTitle">
            <span className="pr-4"><Text tid="account-text" /></span>
            <button
              className="topButton float-right"
              onClick={() => setShowPurchaseOverlay(true)}
            >
              <i className="fa fa-plus-circle" /> <Text tid="purchasetest-button-text" />
            </button>
            <button
              className="topButton float-right"
              onClick={() => setConfirmPop(true)}
            >
              <Text tid="deactivate-button-text" />
            </button>
          </h1>
          <p className="titleInfo">
          <Text tid="account-subtitle-text" />          </p>
        </div>
        <TableOne columns={columns} data={transactionData} />
      </div>
      {confirmPop && (
        <Overlay
          title={"Are you sure?"}
          subTitle={"Are you sure you want to deactivate your account? You cannot undo this action!"}
          closeOverlay={() => setConfirmPop(false)}
          cancelOverlay={() => setConfirmPop(false)}
          submitOverlay={() => {handleDeactivate()}}
          disableBtn={disableButton}
          btnLabel={"Deactivate"}
        ></Overlay>
      )}
      {showInviteCandidate && (
        <Overlay
          title={"Invite Candidate"}
          subTitle={`for job - ${selectedJob?.name}`}
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
          {/* <AssigningCandidate
            jobId={jobId}
            handleSendInvite={handleSendInvite}
          /> */}
        </Overlay>
      )}
      {showPurchaseOverlay && (
        <Overlay
          title={<Text tid = "Purchase-test" />}
          subTitle={<Text tid = "Enter-qun.-to-purchase" />}
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
                    <div
                      className="product-row"
                      /*onClick={() => getPrices(obj.id)}*/
                    >
                      <div className="image">
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
                          placeholder={changingLanguageText('Enter-qty.')}
                          key={"price-" + obj.id}
                        />
                      </div>
                    </div>
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
                <div>Product Name</div>
                <div>Price</div>
                <div>Qty</div>
                <div>Total</div>
              </div>
              {selectedProduct == "" &&
                stripeProducts?.length > 0 &&
                  <>
                    {
                      stripeProducts.map((obj, idx) => {
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
                      })
                  }
                  <div className="product-row footer">
                    <Button
                      type="blue-button"
                      label={"Purchase"}
                      onClick={checkout}
                    />
                  </div>
                </>
              }
            </div>
          )}
        </Overlay>
      )}
    </React.Fragment>
  );
};

export default Accounts;
