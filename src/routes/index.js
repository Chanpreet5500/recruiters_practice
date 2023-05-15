import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { isLoggedIn } from 'recruitment-utils/Service.js';
import Login from 'recruitment-pages/Authentication/Login';
import ForgotPassword from 'recruitment-pages/Authentication/ForgotPassword';
import ResetPassword from 'recruitment-pages/Authentication/ResetPassword';
import Verify from 'recruitment-pages/Authentication/Verify';
import Dashboard from 'recruitment-pages/Admin/Dashboard';
import AdminLayout from 'recruitment-pages/Admin/AdminLayout';
import Candidates from 'recruitment-pages/Admin/Candidates/Candidate';
import importCandidates from 'recruitment-pages/Admin/Candidates/CandidatesImportOverlay.js';
import Jobs from 'recruitment-pages/Admin/Jobs/Jobs';
import ManageCandidates from 'recruitment-pages/Admin/Candidates/ManageCandidate';
import Compare from 'recruitment-pages/Admin/CompareCandidates/CompareCandidate';


import ManageJobs from 'recruitment-pages/Admin/Jobs/ManageJobs';
import Results from 'recruitment-pages/Admin/Results/Results.js';
import Checkout from 'recruitment-pages/Admin/Jobs/Checkout';
import Profile from 'recruitment-pages/Admin/Profile.js';
import Accounts from 'recruitment-pages/Accounts.js';
import Register from 'recruitment-pages/Authentication/Register.js';
import Thanks from 'recruitment-pages/Authentication/Thanks.js';
import GeneratePdf from 'recruitment-pages/Authentication/GeneratePdf.js';
import DownloadFormatOfPdf from 'recruitment-pages/Authentication/DownloadFormatOfPdf';

function auth() {
  return isLoggedIn();
}

//import {} from 'recruitment-constants';
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !auth() ? (
      <Component {...props} />
    ) :
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }} />

  )} />
)

const Routes = () => {
  return (
    <Switch>
      <PublicRoute path={"/login"} component={Login} exact />
      <PublicRoute path={"/register"} component={Register} exact />
      <PublicRoute path={"/thanks"} component={Thanks} exact />
      <PublicRoute path={"/forgot-password"} component={ForgotPassword} exact />
      <PublicRoute path={"/reset-password/:token"} component={ResetPassword} exact />
      <PublicRoute path={"/verify-sign-up/:token"} component={Verify} exact />
      <PublicRoute path={"/generate-pdf/:id/:lang"} component={DownloadFormatOfPdf} exact />
      <Route path={"/view-report/:id/:lang"} component={GeneratePdf} exact />

      // Private Routes
      <Route path={"/dashboard"} component={(AdminLayout([]))(Dashboard)} exact />

      <Route path={"/candidates"} component={(AdminLayout([false]))(Candidates)} exact />
      <Route path={"/import-candidates"} component={(AdminLayout([false]))(importCandidates)} exact />
      <Route path={"/add-candidate"} component={(AdminLayout([]))(ManageCandidates)} exact />
      <Route path={"/candidate/edit/:id"} component={(AdminLayout([]))(ManageCandidates)} exact />

      <Route path={"/jobs"} component={(AdminLayout([]))(Jobs)} exact />
      <Route path={"/add-job"} component={(AdminLayout([]))(ManageJobs)} exact />
      <Route path={"/job/edit/:id"} component={(AdminLayout([]))(ManageJobs)} exact />
      <Route path={"/checkout/:mode"} component={(AdminLayout([]))(Checkout)} exact />

      <Route path={"/compare"} component={(AdminLayout([]))(Compare)} exact />


      {/* <Route path={"/params"} component={(AdminLayout([false]))(Jobs)} exact />
      <Route path={"/add-params"} component={(AdminLayout([]))(ManageJobs)} exact />
      <Route path={"/params/edit/:id"} component={(AdminLayout([]))(ManageJobs)} exact /> */}


      <Route path={"/results"} component={(AdminLayout([false]))(Results)} exact />

      <Route path={"/profile"} component={(AdminLayout([]))(Profile)} exact />
      <Route path={"/accounts"} component={(AdminLayout([]))(Accounts)} exact />


      <Route path="/" render={() => <Redirect to="/login" />} exact />
    </Switch>
  );
};
export default Routes;