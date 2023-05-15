import React, { useState, useEffect } from "react";
import Overlay from "recruitment-components/Overlay/Overlay.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import Input from "recruitment-components/Input/Input.js";
import Textarea from "recruitment-components/Textarea/Textarea.js";
import { Text } from "../../../../context/provider";

import { PARAM_DESCRIPTION_ERROR, PARAM_NAME_ERROR } from "recruitment-message";
const AddParamsOverlay = (props) => {

  console.log(props, "PROPS")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const createParams = useStoreActions((actions) => actions.admin.createParams);
  // console.log(description)

  const saveParam = async () => {
    setNameError(false);
    if (name.trim() == "") {
      setNameError(true);
      return false;
    }
    if (description.trim() == "") {
      setDescriptionError(true);
      return false;
    }

    setDisableButton(true);
    let formData = {
      name: name,
      description: description,
    };
    let response = false;
    props.setShowParamsToAdd(false)
    response = await createParams(formData);

    setDisableButton(false);
  };
  // console.log(columns)

  return (
    <React.Fragment>
      <Overlay
        tempClose={props.tempClose}
        title={<Text tid="new-param-text" />}
        subTitle={""}
        closeOverlay={() => props.setShowParamsToAdd(false)}
        cancelOverlay={() => props.setShowParamsToAdd(false)}
        submitOverlay={() => saveParam()}
        wrapperClass={"mediumWrapper"}
        btnLabel={<Text tid="save-button-label-text" />}
      >
        <div className="row add-parameter">
          <div className="col-sm-8">
            <div className="formTitle">
              <span><Text tid="param-details-text" /></span>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <Input
                  label={<Text tid="param-name-text" />}
                  type={"text"}
                  value={name}
                  handleInputChange={(e) => setName(e.target.value)}
                  error={nameError}
                  placeholder={<Text tid="param-name-text" />} //shows object object
                  errorMessage={PARAM_NAME_ERROR}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <Textarea
                  label={<Text tid="param-description-text" />}
                  type={"text"}
                  value={description}
                  handleInputChange={(e) => setDescription(e.target.value)}
                  error={descriptionError}
                  placeholder={<Text tid="param-description-text" />}
                  errorMessage={PARAM_DESCRIPTION_ERROR}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-1 dividerOuter"></div>
        </div>
      </Overlay>
    </React.Fragment>
  );
};

export default AddParamsOverlay;