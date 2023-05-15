import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { MuiButton } from "../../pages/Admin/Jobs/JobStyled";
import { SpinnerBorder } from "../../pages/Admin/Jobs/JobStyled";

const Button = (props) => {
  const [btnClass, setBtnClass] = useState("blueBtn");
  const [loadingMsg, setLoadingMsg] = useState("Processing...");

  useEffect(() => {
    let className = "";
    if (props.type == "line-button") {
      className += "lineBtn ";
    } else if (props.type == "blue-button") {
      className += "blueBtn ";
    } else if (props.type == "theme-button") {
      className += "themeBtn ";
    } else if (props.type == "top-button") {
      className += "topButton ";
    } else if (props.type == "icon-button") {
      className += "iconButton ";
    } else if (props.type == "square-button") {
      className += "squareButton ";
    }

    if (props.extraClasses) {
      className = className + " " + props.extraClasses;
    }
    setBtnClass(className);
  }, [props]);

  return (
    <React.Fragment>
      <MuiButton
        type="button"
        className={btnClass}
        onClick={() => props.onClick()}
      >
        {props.label}
        {props.disableBtn && (
          <SpinnerBorder role="status">
            <Box component="span" className="sr-only">
              Loading...
            </Box>
          </SpinnerBorder>
        )}
      </MuiButton>
    </React.Fragment>
  );
};

export default Button;
