import React from 'react';
import { Popup } from 'semantic-ui-react';
import { createHtmlMarkup } from 'recruitment-utils/Service.js';


const ToolTip = (props) => {
  const {children, note, position = 'bottom left'} = props;
    return (
      <Popup trigger={children} position={position}>
        <Popup.Content>
          <div dangerouslySetInnerHTML={createHtmlMarkup(note)}></div>
        </Popup.Content>
      </Popup>
    );
  }
export default ToolTip;
