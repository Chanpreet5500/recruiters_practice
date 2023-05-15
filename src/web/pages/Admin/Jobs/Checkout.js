import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useStoreActions, useStoreState } from "easy-peasy";
import { Route, useParams, useHistory} from "react-router-dom";
import queryString from 'query-string';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


const Checkout = (props) => {
  const history = useHistory();
  const { mode } = useParams();
  const queryStrings = queryString.parse(window.location.search);
  const sessionId = queryStrings['session_id'];

  const saveTransactionDetails = useStoreActions(
    (actions) => actions.admin.saveTransactionDetails
  );

  useEffect(() => {
    if(sessionId && mode == 'success') {
      saveTransactionDetails({id: sessionId});
      history.push('/jobs');
    } else {
      history.push('/jobs');
    }
  }, [])

  return (
    <React.Fragment>
      
    </React.Fragment>
  );
};

export default Checkout;