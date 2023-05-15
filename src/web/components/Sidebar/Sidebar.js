import React, { useContext, useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useHistory, useLocation } from "react-router-dom";
import { logoutCompletely } from 'recruitment-utils/Service.js';
import Logo from "recruitment-images/h4.png";
import es from "recruitment-images/es.png";
import en from "recruitment-images/en.png";
import { LanguageContext, Text } from '../../../context/provider'
import { languageOptions } from '../../../locales/localization';

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


const Sidebar = (props) => {

  const history = useHistory();
  const location = useLocation();
  const logoutUser = useStoreActions((actions) => actions.authentication.logoutUser);
  const [showSubmenu, setShowSubMenu] = useState(false)
  const [hideLeftSection, setHideLeftSection] = useState(false)
  const [menu, setMenu] = useState('')
  const [loggedInUser, setLoggedInUser] = useState({})
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const setUserProfile = useStoreActions((actions) => actions.admin.setUserProfile);
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const [disableLogout, setDisableLogout] = useState(false);
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  useEffect(() => {
    if (localStorage.getItem('leftSection')) {
      props.handleSidebar(localStorage.getItem('leftSection') == 'true' ? true : false);
      setHideLeftSection(localStorage.getItem('leftSection') == 'true' ? true : false);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('leftSection', hideLeftSection);
  }, [hideLeftSection])
  useEffect(() => {
    setLoggedInUser(userProfile)
  }, [userProfile])

  useEffect(() => {
    let path = location.pathname.replace('/', '');
    setMenu(path);
    let submenu = ['forms', 'years', 'students', 'teachers'];
    if (submenu.indexOf(path) > -1) {
      setShowSubMenu(true);
    }
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!userProfile) {
      setUserProfile(user);
    }
    if (user) {
      //let name = user.firstname + " " + user.lastname;
      setLoggedInUser(user);
      //setUserProfile(user);
      //getUserProfile({email: user.email});      
    } else {
      history.push('/login');
    }
  }, [])
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
    if (userProfile) {
      let response = await logoutUser({ email: userProfile.email });
      if (response) {
        logoutCompletely();
        history.push('/login');
      } else {
        logoutCompletely();
        history.push('/login');
      }
    } else {
      logoutCompletely();
      history.push('/login');
    }
    setDisableLogout(false)
  }

  const toggleMenu = () => {
    setShowSubMenu(!showSubmenu);
  }
  // set selected language by calling context method
  const handleLanguageChange = (id) => userLanguageChange(id);
  const haldleLeftSelection = () => {
    props.handleSidebar(!hideLeftSection)
    console.log(hideLeftSection, "one")
    setHideLeftSection(!hideLeftSection)
  }


  return (
    <React.Fragment>
      <div className={hideLeftSection ? "leftNevbar hideLeftSection" : "leftNevbar"}>{/*hideLeftSection*/}
        {!hideLeftSection && <a className="minimizeSection" onClick={() => haldleLeftSelection()}><img src={RightArrowImg} /></a>}
        {hideLeftSection && <a className="maximizeSection" onClick={() => haldleLeftSelection()}><img src={LeftArrowImg} /></a>}
        <span className="leftLogo large-logo"><Link to={`/dashboard`}><img src={Logo} /></Link></span>
        <span className="leftLogo small-logo"><Link to={`/dashboard`}><img src={smallLogo} /></Link></span>
        {/* <div className="userSection">
          <span className="userPic" style={{background: 'url('+UsersImg+')'}} />
          <h5><div className="text-ellipsis">{loggedInUser}</div></h5>
          <p>Admin</p>
          <i className="uil uil-angle-down" />
          <div className="customDropdown">
            <Link to="/profile">My profile</Link>
            <Link to="/school-terms">School information</Link>
            <div className="border-top" />
            <a onClick={() => logMeOut()}>Log out</a>
          </div>
        </div> */}
        <div className="userSection">
          <button className="userSectionButton" onClick={() => { setShowProfileMenu(!showProfileMenu) }} onBlur={() => { setShowProfileMenu(false) }}>
            <span className="userPic" style={{ background: `url(${profileImg ? 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(profileImg))) : UsersImg})` }} />
            <h5><div className="text-ellipsis">{loggedInUser.firstname ? loggedInUser.firstname + " " + loggedInUser.lastname : ""}</div></h5>
            <p>{loggedInUser.username}</p>
            <p className="total-tests">{`Total tests available - ${loggedInUser.totalTests}`}</p>
            <i className={showProfileMenu ? "uil uil-angle-up" : "uil uil-angle-down"} />
          </button>
          <div className={showProfileMenu ? "customDropdown d-block" : "customDropdown"}>
            <Link to="/profile"><Text tid="my-profile-text" /></Link>
            <div className="border-top" />
            <Link to="/accounts">< Text tid="account-text" /></Link>
            <div className="border-top" />
            <a disabled={disableLogout} className={disableLogout ? "disable" : ""} onClick={() => logMeOut()}>
              {(disableLogout ?
                <>
                  <div className="spinner-border" style={{ width: "1rem", height: "1rem", marginRight: "5px" }} role="status">
                    <span className="sr-only"><Text tid="loading-text" /></span>
                  </div>
                  <Text tid="logging-out-text" />
                </>
                : <Text tid="log-out-text" />)}
            </a>
          </div>
        </div>
        <ul className="customNav">
          <li><Link to={'/dashboard'} className={menu == 'dashboard' ? "active" : ""}><img src={graphImg} /><span><Text tid="dashboard-text" /></span></Link></li>
          {/*<li><a onClick={() => toggleMenu()}><img src={SchoolImg} /><span>School</span></a>
          <ul style={{ display: (showSubmenu) ? "block" : "none" }}>
            <li><Link className={menu == 'years' ? "active" : ""} to={'/years'}>Years</Link></li>
            <li><Link className={menu == 'forms' ? "active" : ""} to={'/forms'}>Forms</Link></li>
            <li><Link className={menu == 'students' ? "active" : ""} to={'/students'}>Students</Link></li>
            <li><Link to={'/teachers'} className={menu == 'teachers' ? "active" : ""}>Teachers</Link></li>
          </ul>
        </li>*/}
          <li><Link className={menu == 'jobs' ? "active" : ""} to={'/jobs'}><img src={SubjectsImg} /><span><Text tid="jobs-text" /></span></Link></li>
          <li><Link className={menu == 'candidates' ? "active" : ""} to={'/candidates'}><img src={SubjectsImg} /><span><Text tid="candidate-text" /></span></Link></li>
          <li><Link className={menu == 'results' ? "active" : ""} to={'/results'}><img src={SubjectsImg} /><span><Text tid="result-text" /></span></Link></li>
          <li><Link className={menu == 'compare' ? "active" : ""} to={'/compare'}><img src={SubjectsImg} /><span><Text tid="compare-text" /></span></Link></li>
        </ul>
        <div id="lang-switch">
          {
            Object.entries(languageOptions).map(([id, name]) => {

              return (
                <img src={`${(id == "es") ? es : en}`} class={`${id} ${(id == userLanguage) ? 'active-flag' : ''}`} onClick={() => handleLanguageChange(id)} alt={name} />

              )
            })
          }

        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;