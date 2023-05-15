import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import Sidebar from "recruitment-components/Sidebar/Sidebar.js";
import "react-toastify/dist/ReactToastify.css";
import { MainContainer, MainBody } from "./AdminLayoutStyled";
import { Box } from "@mui/material";

TopBarProgress.config({
  barColors: {
    0: "#0c0058",
    "1.0": "#0c0058",
  },
});

const AdminLayout = (allowedPrivileges) => (WrappedComponent) => {
  console.log("adminlayout")
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showLoader: true,
        rightSection: false,
      };
    }
    componentDidMount() {
      let _this = this;
      setTimeout(function () {
        _this.setState({ showLoader: false });
      }, 2000);
    }

    render() {
      const handleSidebar = (val) => {
        this.setState({ rightSection: val });
      };

      return (
        <React.Fragment>
          {this.state.showLoader && <TopBarProgress />}
          <MainContainer
            sx={{
              paddingLeft: this.state.rightSection ? "91px" : "291px",
            }}
          >
            <Sidebar handleSidebar={handleSidebar.bind(this)} />
            <MainBody
              sx={{
                padding:
                  allowedPrivileges &&
                  allowedPrivileges.length > 0 &&
                  allowedPrivileges[0] == false
                    ? "0px"
                    : "50px",
              }}
            >
              <WrappedComponent />
            </MainBody>
          </MainContainer>
        </React.Fragment>
      );
    }
  };
};

export default AdminLayout;
