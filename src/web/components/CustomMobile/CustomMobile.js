import React, { useState, useEffect } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';


const CustomMobile = (props) => { 

  return (
    <React.Fragment>
      <div className="formFieldOuter">
        <label className="fieldLabel">{props.label}</label>

        <div className="formField">
             <IntlTelInput
              containerClassName="intl-tel-input"
              value={props.value}
              inputClassName={props.error ? "fieldInput error" : "fieldInput"} 
              fieldName="phoneNumber"
              onPhoneNumberChange={(a, b, c, d) => props.handlePhoneChange(a, b, c, d)}
              onPhoneNumberBlur={(a, b, c, d) => props.handlePhoneChange(a, b, c, d)}
              autoPlaceholder={true}
              placeholder={'(XXX) XXX XXXX'}
              numberType={'MOBILE'}
              format={true}
              defaultValue={props.value}
              formatOnInit={true}
            /> 
            {/*<input 
              className={props.error ? "fieldInput error" : "fieldInput"} 
              name={props.name} 
              type="tel" value={props.value} 
              onChange={(event)=>{props.handlePhoneChange(event)}}
              onKeyPress={(e)=>props.handleInputKeyPress?props.handleInputKeyPress(e):()=>{}}
              placeholder={props.placeholder}
              />*/}
              
            {props.error && 
                <div className="errorMsg">
                  <span>!</span> 
                  <label>{props.errorMessage}</label>
                </div>
            }
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomMobile;
