import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'recruitment-routes'
import history from 'recruitment-history'
import "recruitment-theme/css/unicons.css";
import "recruitment-theme/css/tabler-icons.css";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import { LanguageProvider } from "./context/provider";


const App = () => {
  return (
    <React.Fragment>
        <LanguageProvider>
            <Router history={history}>
              <Routes />
            </Router>
            <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
      </LanguageProvider>
    </React.Fragment>
  );
};

export default App;
