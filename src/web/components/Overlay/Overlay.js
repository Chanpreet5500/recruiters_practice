import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Typography } from "@mui/material";
import Button from "recruitment-components/Button/Button.js";
import ClearIcon from '@mui/icons-material/Clear';
import { StyledBoxOverlay, StyledButtonBox, StyledCross, StyledHyperlink, StyledModal, StyledPopupFooter, StyledPopupSubTitle, StyledTitle, UnStyledButton } from "../../styledComponent/StyledComponents";

const Overlay = (props) => {


  const {
    title,
    closeOverlay,
    cancelOverlay,
    tempClose,
    subTitle,
    submitOverlay,
    backOverlay,
    showActions,
    wrapperClass
  } = props;


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(showActions)

  return (
    <React.Fragment>
      <StyledModal
        open={tempClose}
        onClose={handleClose}
      >
        <StyledBoxOverlay>
          <StyledCross varient="a" component="a" onClick={() => {
            closeOverlay();
          }}>
            <ClearIcon fontSize="medium" />
          </StyledCross>
          <StyledTitle varient="h1" component="h3">
            {title}
          </StyledTitle>
          {subTitle && <StyledPopupSubTitle varient="p">{subTitle}</StyledPopupSubTitle>}
          {props.children}

          {(showActions == undefined || showActions == true) && (
            <StyledButtonBox >
              <UnStyledButton onClick={() => cancelOverlay()}>
                {props.isBackBtn ? "Back" : "Cancel"}
              </UnStyledButton>
              <Button
                type={"blue-button"}
                extraClasses={`${props.disableBtn ? "loaderBtn disable ml-2" : "ml-2"
                  }`}
                onClick={() => (props.disableBtn ? "" : submitOverlay())}
                label={
                  props.isDelete
                    ? "Delete"
                    : props.btnLabel
                      ? props.btnLabel
                      : "Import"
                }
                disableBtn={props.disableBtn}
              />
              {/* <button className="blueBtn ml-2" onClick={() => submitOverlay()}>Save</button> */}
            </StyledButtonBox>
          )}
          {props.footer && (
            <StyledPopupFooter
              onClick={props.onClickFooter}
            >
              <Typography variant="b">
                <StyledHyperlink varient="a"> {props.footer}</StyledHyperlink>
              </Typography>
            </StyledPopupFooter>
          )}
        </StyledBoxOverlay>
      </StyledModal>
    </React.Fragment>
  );
};

export default Overlay;
