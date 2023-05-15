import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


const DateRangePickerComp = (props) => { 

  const {selectionRange, handleSelect, onChange} = props;
  console.log(selectionRange)

  return (
    <React.Fragment>
     <div className="formFieldOuter">
        <label className="fieldLabel">{props.label}</label>

        <div className="formField">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              maxDate={new Date()}
            />            
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

export default DateRangePickerComp;
