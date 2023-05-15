import React, { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Pie, Line } from "react-chartjs-2";
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
import moment from "moment";
import NoDocImg from "recruitment-images/no-documents.svg";
import UserImg from "recruitment-images/user.jpg";
import NoConnections from "recruitment-images/no-connection.svg";
import { clearUserData } from "../../../lib/utils/Service";
import { useHistory } from "react-router-dom";
import CustomLoader from "recruitment-components/CustomLoader/CustomLoader.js";
import BarGraph from "recruitment-components/Graphs/Bar/Bar.js";
import DateRangePickerComp from "recruitment-components/DateRangePicker/DateRangePicker.js";
import { Text } from "../../../context/provider";
import {
  ChartContainer,
  DateTypography,
  FormField,
  GreetingHeading,
  InputField,
  MainContainer,
  RangePickerContainer,
  TittleInfo,
} from "./DashboardStyling";
import { Box } from "@mui/material";

const data = [
  {
    name: "January",
    clients: 54,
  },
  {
    name: "Feb",
    clients: 45,
  },
  {
    name: "March",
    clients: 28,
  },
  {
    name: "April",
    clients: 65,
  },
  {
    name: "May",
    clients: 35,
  },
  {
    name: "June",
    clients: 14,
  },
  {
    name: "July",
    clients: 19,
  },
  {
    name: "Aug",
    clients: 76,
  },
  {
    name: "Sep",
    clients: 61,
  },
  {
    name: "Oct",
    clients: 88,
  },
  {
    name: "Nov",
    clients: 25,
  },
  {
    name: "Dec",
    clients: 37,
  },
];

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "left",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = (props) => {
  const history = useHistory();
  const ref = useRef(null);
  const [customLoader, setCustomLoader] = useState(false);
  const [forename, setForename] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [avtarGenderMale, setAvtarGenderMale] = useState(true);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const apiFormat = "MM-dd-yyyy";
  const viewFormat = "MMM dd, yyyy";
  const getUserProfile = useStoreActions(
    (actions) => actions.admin.getUserProfile
  );
  const getDashboardData = useStoreActions(
    (actions) => actions.admin.getDashboardData
  );
  const getStudentsStatus = useStoreActions(
    (actions) => actions.admin.getStudentsStatus
  );
  const studentStatus = useStoreState((state) => state.admin.studentStatus);
  const getTeacherStatus = useStoreActions(
    (actions) => actions.admin.getTeacherStatus
  );
  const dashboardData = useStoreState((state) => state.admin.dashboardData);
  const [studentChartData, setStudentChartData] = useState({});
  const [teacherChartData, setTeacherChartData] = useState({});
  const [clientData, setClientData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [testPurchasedData, setTestPurchasedData] = useState([]);
  const [cientsData, setClientsData] = useState([]);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [clientId, setClientId] = useState(0);
  // const getTeacherTopPerformance = useStoreActions((actions) => actions.admin.getTeacherTopPerformance);
  const teacherTopPerformance = useStoreState(
    (state) => state.admin.teacherTopPerformance
  );
  const getStudentTopPerformance = useStoreActions(
    (actions) => actions.admin.getStudentTopPerformance
  );
  const studentTopPerformance = useStoreState(
    (state) => state.admin.studentTopPerformance
  );
  const [selectionRange, setSelectionRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: new Date(),
    key: "selection",
  });
  const [topStudentData, setTopStudentData] = useState([]);
  const [topTeachertData, setTopTeachertData] = useState([]);
  const [weeklyPerformance, setWeeklyPerformance] = useState({});

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showRangePicker && ref.current && !ref.current.contains(e.target)) {
        setShowRangePicker(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showRangePicker]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userProfile) {
      //let name = user.firstname + " " + user.lastname;
      //setUserProfile(user);
    }
    let cId = userProfile ? userProfile.id : user.id;
    setClientId(cId);
    getDashboardData({
      startDate: format(startOfMonth(new Date()), apiFormat),
      endDate: format(new Date(), apiFormat),
      clientId: cId,
    });
  }, []);

  useEffect(() => {
    if (dashboardData) {
      let jobs = dashboardData.jobs;
      createDataForJobs(jobs);
      let candidatesPerJob = dashboardData.candidatesPerJob;
      createDataForCandidates(candidatesPerJob);
      let testPurchased = dashboardData.testPurchased;
      createDataForTestPurchased(testPurchased);
      // let clients = dashboardData.clients;
      // createDataForClients(clients);
    }
  }, [dashboardData]);

  const createDataForJobs = (jobs) => {
    let graphData = [];
    let total = 0;
    jobs.map((obj, idx) => {
      graphData.push({ name: obj._id, jobs: obj.count });
      total += obj.count;
    });
    setJobsData({ graphVal: graphData, totalCount: total });
  };
  // const createDataForClients = (clients) => {
  //   console.log("123", clients);
  //   let graphData = []
  //   let total = 0
  //   // clients.map((obj, idx) => {
  //   //   graphData.push({name: obj._id, clients : obj.count})
  //   //   total += obj.count
  //   // })
  //   setClientsData({graphVal : graphData, totalCount : total});
  // }

  const createDataForCandidates = (candidatesPerJob) => {
    let graphData = [];
    let total = 0;
    candidatesPerJob.map((obj, idx) => {
      graphData.push({ name: obj.name, candidates: obj.candidates });
      total += obj.candidates;
    });
    setCandidatesData({ graphVal: graphData, totalCount: total });
  };

  const createDataForTestPurchased = (testPurchased) => {
    let graphData = [];
    let total = 0;
    if (testPurchased) {
      testPurchased.map((obj, idx) => {
        graphData.push({
          name: obj._id,
          totalTestPurchased: obj.totalTestPurchased,
        });
        total += obj.totalTestPurchased;
      });
      setTestPurchasedData({ graphVal: graphData, totalCount: total });
    }
  };

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = today.toLocaleString("default", { month: "long" }); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + " " + mm + " " + yyyy;
    setTodayDate(today);
    if (userProfile) {
      setForename(userProfile.first_name);
    }
  }, [userProfile]);

  const greeting = () => {
    const hour = moment().hour();
    if (hour > 16) {
      return <Text tid="greeting-evening" />;
    }
    if (hour > 11) {
      return <Text tid="greeting-afternoon" />;
    }
    return <Text tid="greeting-morning" />;
  };

  const getGetOrdinal = (n) => {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const durationData = [
    { id: "daily", name: "Daily" },
    { id: "monthly", name: "Monthly" },
    { id: "yearly", name: "Yearly" },
  ];
  const handleDurationChange = async (date) => {
    setSelectionRange(date.selection);
    const { startDate, endDate } = date.selection;
    await getDashboardData({
      startDate: format(startDate, apiFormat),
      endDate: format(endDate, apiFormat),
      clientId: clientId,
    });
    if (startDate != endDate) setShowRangePicker(false);
  };
  return (
    <React.Fragment>
      <DateTypography>{todayDate}</DateTypography>
      <GreetingHeading>{greeting()}</GreetingHeading>
      <TittleInfo>
        <Text tid="title-info-text" />
      </TittleInfo>
      <TittleInfo>
        <Text tid="Data-Range-shown-text" />
        <Box>
          <InputField
            InputProps={{
              style: { color: "#0c0058", fontFamily: "Jost-Regular" },
            }}
            type="text"
            size={"small"}
            placeholder="Jan - Mar 2021"
            value={`${format(
              selectionRange.startDate,
              viewFormat
            )}  -  ${format(selectionRange.endDate, viewFormat)}`}
            onClick={() => setShowRangePicker(true)}
          />
        </Box>
        {showRangePicker && (
          <RangePickerContainer ref={ref}>
            <DateRangePickerComp
              selectionRange={selectionRange}
              handleSelect={handleDurationChange}
            />
          </RangePickerContainer>
        )}
      </TittleInfo>

      <MainContainer>
        <ChartContainer>
          <BarGraph
            data={jobsData.graphVal}
            totalCount={jobsData.totalCount}
            xKey={"name"}
            yKey={"jobs"}
            title={<Text tid="total-jobs-text" />}
            colorCode={"#8884d8"}
            handleDurationChange={handleDurationChange}
          />
        </ChartContainer>
        <ChartContainer>
          <BarGraph
            data={candidatesData.graphVal}
            totalCount={candidatesData.totalCount}
            xKey={"name"}
            yKey={"candidates"}
            title={<Text tid="total-invites-text" />}
            colorCode={"#B84F39"}
            handleDurationChange={handleDurationChange}
          />
        </ChartContainer>
        <ChartContainer>
          <BarGraph
            data={testPurchasedData.graphVal}
            totalCount={testPurchasedData.totalCount}
            xKey={"name"}
            yKey={"totalTestPurchased"}
            title={<Text tid="test-purchased-text" />}
            colorCode={"#8884d8"}
            handleDurationChange={handleDurationChange}
          />
        </ChartContainer>
        <ChartContainer>
          <BarGraph
            data={data}
            // totalCount={cientsData.totalCount}
            xKey={"name"}
            yKey={"jobs"}
            title={<Text tid="test-performed" />}
            colorCode={"#F8C7BC"}
            handleDurationChange={handleDurationChange}
          />
        </ChartContainer>
      </MainContainer>
    </React.Fragment>
  );
};

export default Dashboard;
