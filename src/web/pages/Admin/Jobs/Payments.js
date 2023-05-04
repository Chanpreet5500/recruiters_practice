import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStoreActions, useStoreState } from "easy-peasy";
import { Route, useParams, useHistory } from "react-router-dom";
import { Text } from "../../../../context/provider";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KXR1NHM3RH7dCWvQX9g35c7GVFvgQaRxTHe9xUwjRjW9KnWgCvrXxaRoPP5p47NcgYMU674eExO68NHz7EpsfBw000H7HSJoW');


const Payments = (props) => {
  const history = useHistory();
  const userProfile = useStoreState((state) => state.admin.userProfile);
  const { id } = useParams();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);

  const getCandidatesForJobId = useStoreActions(
    (actions) => actions.admin.getCandidatesForJobId
  );
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: 'sk_test_51KXR1NHM3RH7dCWvN2rHalA2EOrBWnIFqEEXSTRCO8GBh9FbeMTljI9vDOnwSuLoKHOr7XLhDisFxthT7JoeDd3w00WwrewFkM',
    // Fully customizable with appearance API.
    appearance: {/*...*/ },
  };


  return (
    <React.Fragment>
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button><Text tid="submit-bttn-text" /></button>
        </form>
      </Elements>
    </React.Fragment>
  );
};

export default Payments;