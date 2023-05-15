import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BoxErrorMessage, ButtonFieldInput, CustomDropBox, MenuOptions, SelectBarSingleSelect, TypographyErrorSpan, TypographyLabel, TypographyOptions, TypographySelectLabel } from './Styled';
import { Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SingleSelect = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const [label, setLabel] = useState(props.placeholder);

  useEffect(() => {
    if (props.value) {
      let selectedValue = props.options.find(e => e.id.toString().toUpperCase() === props.value.toString().toUpperCase());
      if (selectedValue) {
        setLabel(selectedValue);
      }
    }
    else {
      setLabel(props.placeholder);
    }
  }, [props.value, props.options])

  

  const handleChange = (event) => {
    
    setLabel(event.target.value);
    props.changeOption(event.target.value.name);
  };
  return (
    <React.Fragment>
      <FormControl fullWidth>
        {(props.label) && <TypographySelectLabel >{props.label}</TypographySelectLabel>}  
        <SelectBarSingleSelect
          onClick={() => setShowOptions(!showOptions)}
          value={label}
          disableUnderline={true}
          onChange={handleChange}
          variant='standard'
        >
          {props.options && props.options.map((obj, idx) => {
            return (<MenuOptions key={obj.id} value={obj} > {obj.name}</MenuOptions>)
          })}
        </SelectBarSingleSelect>
      </FormControl>


      {/* <FormControl fullWidth>
        {(props.label) && <TypographySelectLabel >{props.label}</TypographySelectLabel>}
        <SelectBarSingleSelect

          disableUnderline={true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={label?label:"Education"}
          onChange={changeOption}
          variant='standard'
          // onBlur={() => { setShowOptions(false) }}
        >

          {props.options && props.options.map((obj, idx) => {
            return (<MenuOptions key={obj.id} value={obj} > {obj.name}</MenuOptions>)
          })}

        </SelectBarSingleSelect>
      </FormControl> */}


      {/* <div className={`formField ${props.extraClasses}`}>


        <ButtonFieldInput 
         disableRipple= {true}
       
          onClick={() => setShowOptions(!showOptions)} onBlur={()=>{setShowOptions(false)}}>
          <Typography >{label}</Typography>
{!showOptions? (<KeyboardArrowDown/>):(<KeyboardArrowUp/>)}
 
       
        {showOptions && props.options.length > 0 && 
          <div className={`customDropdown max-h-150 text-left ${props.DropUpClass}`} style={{fontFamily: 'neue_helveticaroman'}}>
            {props.options && props.options.map((obj, idx) => {
                return (<TypographyOptions key={idx} onClick={() => changeOption(obj)}> {obj.name}</TypographyOptions>)
            })}
          </div>
        }
        {showOptions && props.options.length == 0 &&
          <CustomDropBox
        
           > 
            <Typography> No {props.placeholder}</Typography>
          </CustomDropBox>
        }
        </ButtonFieldInput> */}



      {props.error &&
        <BoxErrorMessage

        >
          <TypographyErrorSpan>!</TypographyErrorSpan>
          <Typography sx={{ paddingTop: '4px', fontSize: '12px !important' }}>{props.errorMessage}</Typography>
        </BoxErrorMessage>
      }


      {/* </div> */}
    </React.Fragment>
  );
};

export default SingleSelect;