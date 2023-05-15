import axios from "axios";
import {
  getToken,
  setToken,
  handleInvalidToken,
  logoutCompletely,
} from "recruitment-utils/Service.js";
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";

const AdminInstance = axios.create();
AdminInstance.interceptors.response.use(
  function (response) {
    if (response.headers) {
      //localStorage.setItem('api_token', response.headers.api_token);
    }
    let msg = response.data.error;
    // console.log(msg)
    if (msg == "Unauthorized") {
      handleInvalidToken();
      toast.error(
        <ToastUI
          message={"Session expired!!! Login again to continue."}
          type={"Error"}
        />
      );
    }
    return response;
  },
  function (error) {
    console.log(error);
    if (!error.response) {
      return { data: { data: "", message: "server_error", status: 500 } };
    } else {
      if (error.response.status == 500) {
        return {
          data: { data: "", message: "server_error", status: 500 },
        };
      }
      let msg = error.response.data.error;
      if (msg == "Unauthorized") {
        handleInvalidToken();
        toast.error(
          <ToastUI
            message={"Session expired!!! Login again to continue."}
            type={"Error"}
          />
        );
      }

      return Promise.reject(error);
    }
  }
);

AdminInstance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

const apiUrl = process.env.REACT_APP_RECRUITMENT_API;

export const changePassword = async (formData) => {
  try {
    let response = await AdminInstance.put(
      apiUrl + "/client/change-password",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createClient = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/admin/register-user",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const changeStatus = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/change-status/" + formData.clientId,
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const paramChangeStatus = async (formData) => {
  try {
    let response = await AdminInstance.post(apiUrl + '/admin/change-param-status', formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getActiveParams = async () => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/admin/get-active-parameters/",
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const jobChangeStatus = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + '/client/change-job-status/' + formData.clientId, formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getCandidates = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/get-candidates/" + formData.clientId
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getJobs = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/get-jobs/" + formData.clientId
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const createCandidate = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/create-candidate",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createJob = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/create-job",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateJob = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/update-job",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCandidate = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/delete-candidate/" + formData.clientId, formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteJob = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/delete-job",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCandidate = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/get-candidate/" + formData.id,
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getJob = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/get-job/" + formData.id,
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCandidate = async (formData) => {
  try {
    let response = await AdminInstance.put(
      apiUrl + "/client/update-candidate",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProfile = async (formData) => {
  try {
    let response = await AdminInstance.put(
      apiUrl + "/client/update-my-profile",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getUserProfile = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/profile",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllCandidates = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/common/get-all-candidates",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getCandidatesForJobId = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/get-candidates-without-job/",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getCandidatesWithJob = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/get-candidates-with-job/",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const uploadCandidateCSV = (file, onUploadProgress) => {
  debugger;
  let formData = new FormData();
  formData.append("file", file);
  return AdminInstance.post(apiUrl + "/client/upload-candidate-csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const uploadSubjectCSV = (file, onUploadProgress) => {
  debugger;
  let formData = new FormData();
  formData.append("file", file);
  return AdminInstance.post(apiUrl + "/client/upload-subject-csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};
export const sendInviteToCandidate = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/send-invite/",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getStripeProducts = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/get-products/",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getProductPrices = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/get-prices/" + formData.id
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createCheckoutSession = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/create-session",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const saveTransactionDetails = async (formData) => {
  try {
    let response = await AdminInstance.get(
      apiUrl + "/client/save-transaction-details/" + formData.id
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getDashboardData = async (formData) => {
  try {
    let response = await AdminInstance.post(
      apiUrl + "/client/get-dashboard-data/",
      formData
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getParams = async () => {
  try {
    let response = await AdminInstance.get(apiUrl + "/admin/get-parameters/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const importingCandidates = async (formdata) => {
  try {
    console.log(formdata);
    let response = await AdminInstance.post(
      apiUrl + "/client/import-candidates",
      formdata
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllTransactions = async (formdata) => {
  try {
    let response = await AdminInstance.get(apiUrl + "/client/get-all-transactions/" + formdata.id);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deactivateAccount = async (formdata) => {
  try {
    let response = await AdminInstance.get(apiUrl + "/client/deactivate-account/" + formdata.id);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createParams = async (formData) => {
  try {
    let response = await AdminInstance.post(apiUrl + '/admin/create-params', formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const jobIdByInviteId = async (formData) => {
  try { 
    let response = await AdminInstance.get(apiUrl + '/result/get-test-result-data/' + formData.clientId);
    return response.data;
  } catch(error) {
    return error.response.data
  }
}
export const getPdfDetails = async (formData) => {
  try { 
    let response = await AdminInstance.get(apiUrl + '/result/get-pdf-details/'+formData.id);
    return response.data;
  } catch(error) {
    return error.response.data
  }
}
export const downloadPdf = async (formData) => {
  try { 
    let lang = localStorage.getItem("rcml-lang")
    let response = await  AdminInstance.get(apiUrl + '/client/download-pdf/' + formData.inviteId + '/' + lang, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }})
    return response.data;
  } catch(error) {
    return error
  }
}

export const getJobsSkills = async (formData) => {
  console.log(formData, "FORDATAAA")
  try {
   let response = await AdminInstance.get(apiUrl + '/client/get-params') 
   return response.data;
  } catch(error) {
    return error
  }
}
