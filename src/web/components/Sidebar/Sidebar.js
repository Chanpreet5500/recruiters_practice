import React, { useContext, useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logoutCompletely } from "recruitment-utils/Service.js";
import Logo from "recruitment-images/h4.png";
import es from "recruitment-images/es.png";
import en from "recruitment-images/en.png";
import { LanguageContext, Text } from "../../../context/provider";
import { languageOptions } from "../../../locales/localization";

import smallLogo from "recruitment-images/iso3.png";
import UsersImg from "recruitment-images/user.jpg";
import graphImg from "recruitment-images/graph-bar.svg";
import StudentsImg from "recruitment-images/students.svg";
import TeacherImg from "recruitment-images/teachers.svg";
import SubjectsImg from "recruitment-images/subjects.svg";
import TimetableImg from "recruitment-images/timetable.svg";
import SchoolImg from "recruitment-images/school.svg";
import MsgImg from "recruitment-images/messages.svg";
import LeftArrowImg from "recruitment-images/left_arrow.svg";
import RightArrowImg from "recruitment-images/right_arrow.svg";
import {
  LogoLarge,
  LogoLarge2,
  LogoSmall,
  TestText,
  UserImage,
  UserName,
  OnlineBadge,
  ButtonInform,
  ListContainer,
  Listitems,
  Links,
  ListText,
  LanguageBox,
  LanguageImage,
  ModalBox,
  ModalBoxLinks,
  LogoutContainer,
  UserSection,
  LeftRightarrow,
  SmallLogoImage,
  LargeLogoImage,
  MinimizeArrow,
  MaximizeArrow,
  MainContainer,
  UserBox,
  DownArrowIcon,
  UpArrowIcon,
  CustomDrawer,
} from "./SidebarStyles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import BarChartIcon from "@mui/icons-material/BarChart";
import {
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import List from "./List";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const NavigationList = [
  {
    to: "/dashboard",
    icon: <BarChartIcon />,
    textId: "dashboard-text",
  },
  {
    to: "/jobs",
    icon: <MenuRoundedIcon />,
    textId: "jobs-text",
  },
  {
    to: "/candidates",
    icon: <MenuRoundedIcon />,
    textId: "candidate-text",
  },
  {
    to: "/results",
    icon: <MenuRoundedIcon />,
    textId: "result-text",
  },
  {
    to: "/compare",
    icon: <MenuRoundedIcon />,
    textId: "compare-text",
  },
];

const Sidebar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const logoutUser = useStoreActions(
    (actions) => actions.authentication.logoutUser
  );
  const [showSubmenu, setShowSubMenu] = useState(false);
  const [hideLeftSection, setHideLeftSection] = useState(
    localStorage.getItem("leftSection") == "true" ? true : false
  );

  const [menu, setMenu] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const setUserProfile = useStoreActions(
    (actions) => actions.admin.setUserProfile
  );
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const [disableLogout, setDisableLogout] = useState(false);
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  useEffect(() => {
    if (localStorage.getItem("leftSection")) {
      props.handleSidebar(
        localStorage.getItem("leftSection") == "true" ? true : false
      );
      setHideLeftSection(
        localStorage.getItem("leftSection") == "true" ? true : false
      );
      console.log("true in useeffect");
    }
    // else {
    //   console.log('false in useeffect' )
    //   localStorage.setItem("leftSection",hideLeftSection);
    // }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("leftSection", hideLeftSection);
  //    JSON.parse(localStorage.getItem("leftSection"));

  //   console.log( "localaa");
  // }, [hideLeftSection]);

  useEffect(() => {
    setLoggedInUser(userProfile);
  }, [userProfile]);

  useEffect(() => {
    let path = location.pathname.replace("/", "");
    setMenu(path);
    let submenu = ["forms", "years", "students", "teachers"];
    if (submenu.indexOf(path) > -1) {
      setShowSubMenu(true);
    }
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userProfile) {
      setUserProfile(user);
    }
    if (user) {
      //let name = user.firstname + " " + user.lastname;
      setLoggedInUser(user);
      //setUserProfile(user);
      //getUserProfile({email: user.email});
    } else {
      history.push("/login");
    }
  }, []);
  /*  useEffect(() => {
      if (userProfile) {
        let name = userProfile.firstname + " " + userProfile.lastname;
        setLoggedInUser(name);
        //setProfileImg(userProfile.image_url);
      }
    }, [userProfile])
  */
  const logMeOut = async () => {
    setDisableLogout(true);
    setTimeout(async () => {
      if (userProfile) {
        let response = await logoutUser({ email: userProfile.email });
        if (response) {
          logoutCompletely();
          history.push("/login");
        } else {
          logoutCompletely();
          history.push("/login");
        }
      } else {
        logoutCompletely();
        history.push("/login");
      }
      setDisableLogout(false);
    }, 1000);
  };

  const toggleMenu = () => {
    setShowSubMenu(!showSubmenu);
  };
  // set selected language by calling context method
  const handleLanguageChange = (id) => userLanguageChange(id);
  const haldleLeftSelection = () => {
    localStorage.setItem("leftSection", !hideLeftSection);
    props.handleSidebar(!hideLeftSection);
    setHideLeftSection(!hideLeftSection);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(hideLeftSection, "hidesection");
  return (
    <React.Fragment>
      <CustomDrawer
        variant="permanent"
        // open={!hideLeftSection}
        open={JSON.parse(localStorage.getItem("leftSection"))}
        // onClose={!JSON.parse(localStorage.getItem("leftSection"))}
        elevation={20}
        // hideBackdrop={true}
        PaperProps={{
          sx: {
            width: hideLeftSection ? "90px" : "291px",
          },
        }}
      >
        {!hideLeftSection && (
          <MinimizeArrow
            position={"fixed"}
            onClick={() => haldleLeftSelection()}
          >
            <LeftRightarrow src={RightArrowImg} />
          </MinimizeArrow>
        )}
        {hideLeftSection && (
          <MaximizeArrow
            position={"fixed"}
            onClick={() => haldleLeftSelection()}
          >
            <LeftRightarrow src={LeftArrowImg} />
          </MaximizeArrow>
        )}
        {!hideLeftSection && (
          <LogoSmall>
            <Link to={`/dashboard`}>
              <LargeLogoImage src={Logo} />
            </Link>
          </LogoSmall>
        )}
        {hideLeftSection && (
          <LogoLarge2>
            <Link to={`/dashboard`}>
              <SmallLogoImage src={smallLogo} />
            </Link>
          </LogoLarge2>
        )}
        <LogoLarge>
          <Link to={`/dashboard`}>
            <SmallLogoImage src={smallLogo} />
          </Link>
        </LogoLarge>

        <Box
          sx={{ display: "flex" }}
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {loggedInUser.firstname ? (
            <OnlineBadge variant="dot" overlap="circular" color="success">
              <UserImage src="/images/user.jpg" />
            </OnlineBadge>
          ) : (
            <Skeleton
              animation="wave"
              variant="circular"
              width={50}
              height={50}
            />
          )}
          <UserBox sx={{ display: hideLeftSection ? "none" : "block" }}>
            <UserName>
              {loggedInUser.firstname ? (
                loggedInUser.firstname + " " + loggedInUser.lastname
              ) : (
                <Skeleton width={170} />
              )}
            </UserName>
            {loggedInUser.firstname ? (
              <TestText>{`Total tests available - ${loggedInUser.totalTests}`}</TestText>
            ) : (
              <TestText>
                <Skeleton width={170} />
              </TestText>
            )}
          </UserBox>
          {loggedInUser && (
            <>
              {!hideLeftSection && !open && <DownArrowIcon />}
              {!hideLeftSection && open && <UpArrowIcon />}
            </>
          )}
        </Box>
        <ModalBox
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ModalBoxLinks to="/profile">
            <Text tid="my-profile-text" />
          </ModalBoxLinks>
          <Divider />
          <ModalBoxLinks to="/accounts">
            <Text tid="account-text" />
          </ModalBoxLinks>

          <Divider />
          <ModalBoxLinks disabled={disableLogout} onClick={() => logMeOut()}>
            {disableLogout ? (
              <>
                <LogoutContainer role="status">
                  <Typography variant="span" color={"gray"}>
                    <CircularProgress size={20} sx={{ color: "gray" }} />
                  </Typography>
                  <Typography variant="span" color={"gray"}>
                    <Text tid="logging-out-text" />
                  </Typography>
                </LogoutContainer>
              </>
            ) : (
              <Text tid="log-out-text" />
            )}
          </ModalBoxLinks>
        </ModalBox>
        {/* <List
          NavigationList={NavigationList}
          hideLeftSection={hideLeftSection}
          // key={}
        /> */}
        <ListContainer>
          {NavigationList.map((element, index) => {
            const { to, icon, textId } = element;
            return (
              <>
                <Listitems key={index}>
                  <Links
                    variant={NavLink}
                    to={to}
                    sx={{ paddingLeft: hideLeftSection ? "13px" : "18px" }}
                    key={index}
                  >
                    {icon}
                    <ListText
                      key={index}
                      sx={{ display: !hideLeftSection ? "block" : "none" }}
                    >
                      <Text tid={textId} key={index} />
                    </ListText>
                  </Links>
                </Listitems>
              </>
            );
          })}
        </ListContainer>

        <LanguageBox sx={{ flexDirection: hideLeftSection ? "column" : "row" }}>
          {Object.entries(languageOptions).map(([id, name], index) => {
            return (
              <LanguageImage
                sx={{ opacity: userLanguage == id ? 1 : 0.5 }}
                src={`${id == "es" ? es : en}`}
                onClick={() => handleLanguageChange(id)}
                alt={name}
                key={index}
              />
            );
          })}
        </LanguageBox>
      </CustomDrawer>
    </React.Fragment>
  );
};

export default React.memo(Sidebar);
