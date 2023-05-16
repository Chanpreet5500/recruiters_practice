import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from "recruitment-utils/Validators.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import { logoutCompletely } from "recruitment-utils/Service.js";

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
import { Text } from "../../../src/context/provider";

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
import { Box, Table, TableContainer, TableHead } from "@mui/material";
import {
  ButtonContainer,
  ButtonPurchaseContainer,
  Buttons,
  CustomCell,
  CustomRow,
  Heading,
  HeadingBox,
  ImageContainer,
  InputContainer,
  ProductDescription,
  ProductDetailContainer,
  ProductName,
  ProductPrice,
  TableHeader,
  TypographyText,
  Image,
  MainContainer,
} from "./AccountsStyled";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddCircle } from "@mui/icons-material";
import Datagrid from "../components/DataGrid/Datagrid";
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
  const getAllTransactions = useStoreActions(
    (actions) => actions.admin.getAllTransactions
  );
  const createCheckoutSession = useStoreActions(
    (actions) => actions.admin.createCheckoutSession
  );
  const deactivateAccount = useStoreActions(
    (actions) => actions.admin.deactivateAccount
  );
  const logoutUser = useStoreActions(
    (actions) => actions.authentication.logoutUser
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
    getAllTransactions({ id: cId });
    if (!products) {
      getStripeProducts();
    }
    //getStripeProducts();
  }, []);

  // useEffect(() => {
  //   if (transactions) {
  //     setTransactionData(transactions);
  //   }
  // }, [transactions]);

  useEffect(() => {
    const show = [];
    if (transactions) {
      transactions.filter((e) => {
        return show.push({
          id: e.user_id,
          test: e.tests_purchased,
          date: e.date_updated,
          amount: "$" + (e.total_amount / 100).toFixed(2),
          status: e.status.toUpperCase(),
        });
      });
      setTransactionData(show);
    }
  }, [transactions]);

  console.log(transactions, "Data");
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
      field: "test",
      headerClassName: "bg-color",
      headerName: <Text tid="table-testpurchades-text" />,
      // minWidth: 60,
      flex: 1,
      resizable: false,
      // maxWidth: 100,
      // sortable: false,
      cell: (data) => {
        return data.tests_purchased;
      },
    },
    {
      name: <Text tid="table-date-text" />,
      field: "date",
      headerClassName: "bg-color",
      headerName: <Text tid="table-date-text" />,
      sortable: false,
      flex: 1,
      // minWidth: 60,
      // maxWidth: 100,
      // cell: (data) => {
      //   return data.date_created;
      // },
    },
    {
      name: <Text tid="table-amount-text" />,
      field: "amount",
      headerClassName: "bg-color",
      headerName: <Text tid="table-amount-text" />,
      sortable: false,
      flex: 1,
      // minWidth: 60,
      // maxWidth: 100,
      cell: (data) => {
        return "$" + (data.total_amount / 100).toFixed(2);
      },
    },
    {
      name: <Text tid="table-status-text" />,
      field: "status",
      headerClassName: "bg-color",
      headerName: <Text tid="table-status-text" />,
      sortable: false,
      flex: 1,
      // minWidth: 80,
      // width: 150,
      // maxWidth:200,
      cell: (data) => {
        return data.status.toUpperCase();
      },
    },
  ];

  // const columns = [
  //   {
  //     name: <Text tid="table-testpurchades-text" />,
  //     sortable: false,
  //     cell: (data) => {
  //       return data.tests_purchased;
  //     },
  //   },
  //   {
  //     name: <Text tid="table-date-text" />,
  //     sortable: false,
  //     cell: (data) => {
  //       return data.date_created;
  //     },
  //   },
  //   {
  //     name: <Text tid="table-amount-text" />,
  //     sortable: false,
  //     cell: (data) => {
  //       return "$" + (data.total_amount / 100).toFixed(2);
  //     },
  //   },
  //   {
  //     name: <Text tid="table-status-text" />,
  //     sortable: false,
  //     cell: (data) => {
  //       return data.status.toUpperCase();
  //     },
  //   },
  // ];

  const handleDeactivate = async () => {
    let res = await deactivateAccount({ id: clientId });
    if (res) {
      let response = await logoutUser({ email: userProfile.email });
      if (response) {
        logoutCompletely();
        history.push("/login");
      } else {
        logoutCompletely();
        history.push("/login");
      }
    }
  };
  return (
    <React.Fragment>
      {showFullPageLoader && <CustomLoader />}
      <MainContainer>
        <HeadingBox>
          <Heading>
            <Text tid="account-text" />
          </Heading>
          <ButtonContainer>
            <Buttons onClick={() => setConfirmPop(true)}>
              <Text tid="deactivate-button-text" />
            </Buttons>
            <Buttons
              startIcon={<AddCircle />}
              onClick={() => setShowPurchaseOverlay(true)}
            >
              <Text tid="purchasetest-button-text" />
            </Buttons>
          </ButtonContainer>
        </HeadingBox>
        <TypographyText>
          <Text tid="account-subtitle-text" />
        </TypographyText>
        <Box sx={{ width: '85%'}}>
        <Datagrid
          sx={{
            border: "none",
            backgroundColor: "#fff",
            fontSize: "16px",
            fontFamily: "Jost-Regular",
            display: "flex",
            justifyContent: "center",
            "& .bg-color": {
              color: "#fff",
              backgroundColor: "#91c6c8",
              fontSize: "20px",
              fontFamily: "Jost-Regular",
            },
            "& .css-10jrc7n-MuiDataGrid-root .MuiDataGrid-withBorderColor":{
              justifyContent: "center",
            }
          }}
          columns={columns}
          data={transactionData ? transactionData : []}
        />
        </Box>
      </MainContainer>
      {confirmPop && (
        <Overlay
          title={"Are you sure?"}
          subTitle={
            "Are you sure you want to deactivate your account? You cannot undo this action!"
          }
          closeOverlay={() => setConfirmPop(false)}
          cancelOverlay={() => setConfirmPop(false)}
          submitOverlay={() => {
            handleDeactivate();
          }}
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
        ></Overlay>
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
                    <CustomRow>
                      <ImageContainer>
                        <Image src={obj?.product?.images[0]} />
                      </ImageContainer>
                      <ProductDetailContainer>
                        <ProductName>{obj.product.name}</ProductName>
                        <ProductDescription>
                          {obj.product.description}
                        </ProductDescription>
                        <ProductPrice>${obj.unit_amount / 100}</ProductPrice>
                      </ProductDetailContainer>
                      <InputContainer>
                        <Input
                          label={""}
                          type={"text"}
                          value={obj.qty}
                          handleInputChange={(e) => handleQtyChange(e, obj.id)}
                          placeholder={changingLanguageText("Enter-qty.")}
                          key={"price-" + obj.id}
                        />
                      </InputContainer>
                    </CustomRow>
                  );
                })}
              {qtyToPurchase > 0 && (
                <ButtonPurchaseContainer >
                  <Button
                    type="blue-button"
                    label={"Purchase"}
                    onClick={reviewCart}
                  />
                </ButtonPurchaseContainer>
              )}
            </>
          ) : (
            <TableContainer>
              <Table>
                <CustomRow sx={{ fontFamily: "Jost-Bold" }}>
                  <CustomCell>Product Name</CustomCell>
                  <CustomCell>Price</CustomCell>
                  <CustomCell>Qty</CustomCell>
                  <CustomCell>Total</CustomCell>
                </CustomRow>
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
                          <CustomRow>
                            <CustomCell>{obj.product.name}</CustomCell>
                            <CustomCell>${obj.unit_amount / 100}</CustomCell>
                            <CustomCell>{obj.qty}</CustomCell>
                            <CustomCell>
                              ${(obj.unit_amount / 100) * obj.qty}
                            </CustomCell>
                          </CustomRow>
                        </>
                      );
                    })}
                  </>
                )}
              </Table>
              <ButtonPurchaseContainer>
                <Button
                  type="blue-button"
                  label={"Purchase"}
                  onClick={checkout}
                />
              </ButtonPurchaseContainer>
            </TableContainer>
          )}
        </Overlay>
      )}
    </React.Fragment>
  );
};

export default Accounts;
