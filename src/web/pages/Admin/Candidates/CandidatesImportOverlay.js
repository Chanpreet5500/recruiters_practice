import React, { useState, useEffect } from 'react';
import Overlay from "recruitment-components/Overlay/Overlay.js";
import TableOne from "recruitment-components/TableOne/TableOne.js";
import { Text } from '../../../../context/provider';
const CandidatesImportOverlay = (props) => {
 const {tempClose}=props
  const columns = [
    {
      name: <div>
        <Text tid="name-text" />
      </div>,
      sortable: false,
      cell: (data) => data.first_name + " " + data.last_name,
      // cell: (data) => data.experience,
    },
    {
      name: <div>
        <Text tid="email-text" />
      </div>,
      sortable: false,
      cell: (data) => data.email,

    },
    {
      name: <div>
        <Text tid="phone-text" />
      </div>,
      sortable: false,
      cell: (data) => data.phone_number,
      width: "15%",
    },
    {
      name: <div>
        <Text tid="profession-text" />
      </div>,
      sortable: false,
      cell: (data) => data.profession,
    },
    {
      name: <div>
        <Text tid="experience-text" />
      </div>,
      sortable: false,
      cell: (data) => data.experience,
      width: "15%",
    },
    {
      name: <div>
        <Text tid="education-text" />
      </div>,
      sortable: false,
      cell: (data) => data.education,
    },

  ]
  // console.log(columns)

  return (
    <React.Fragment>
      <Overlay
        title={"Candidates to import"}
        tempClose={tempClose}
        subTitle={""}
        closeOverlay={() => props.setShowCandidatesToImport(false)}
        cancelOverlay={() => props.setShowCandidatesToImport(false)}
        submitOverlay={() => props.importCandidates()}
        wrapperClass={"mediumWrapper"}

      >
        <TableOne columns={columns} data={props.candidates} perPage={5} />
      </Overlay>
    </React.Fragment>
  );
};

export default CandidatesImportOverlay;

