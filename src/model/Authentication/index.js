import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";

import {
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  submitOTP,
  resendOTP,
  verifyUser
} from 'recruitment-api/AuthApi.js';

import {ERROR_RESET_PWD_WRONG_CODE, SUCCESS_VALIDATION_MESSAGE, FORGOT_PASSWORD, FAILURE_FORGET_PASSWORD } from 'recruitment-message';

const authenticationModel = {
	setToken: action((state, payload) => {
	    state.token = payload;
  	}),
	logoutUser: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await logoutUser(payload);
		if(!response.success) {
			return false
		}
	// 	 else {
	// 		toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
    //     toastId: 'toast-show'
    //   });
	// 		return true;
	// 	}
	}),

	browserDATA : action ((state,payload)=>{
		localStorage.setItem('isLoggedIn', "true");
		localStorage.setItem('loggedInUser', JSON.stringify(payload));
		localStorage.setItem('session', JSON.stringify(Date.now() + 3600000))
	}),

	loginUser: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await loginUser(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			localStorage.setItem('api_token', response.data.token);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return response.data;
		}
	}),
	submitOTP: thunk(async(actions, payload, {getStoreActions}) => {
		let response = await submitOTP(payload);
		toast.dismiss();
		if (response.status !== 200){
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  })
					return false
		}
		else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return true;
		}
	}),

	resendOTP: thunk(async(actions, payload, {getStoreActions}) => {
		let response = await resendOTP(payload);
		toast.dismiss();
		if (!response.success){
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			  })
					return false
		}
		else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />);
			return true;
		}
	}),
	forgetPassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await forgetPassword(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={FAILURE_FORGET_PASSWORD} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			toast.success(<ToastUI message={FORGOT_PASSWORD} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	resetPassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await resetPassword(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	}),
	verifyUser: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await verifyUser(payload);
		toast.dismiss();
		if(!response.success) {
			toast.error(<ToastUI message={response.message == 'signUpLinkExpired' ? ERROR_RESET_PWD_WRONG_CODE : ''	} type={"Error"} />, {
        toastId: 'toast-show'
      })
			return false
		} else {
			toast.success(<ToastUI message={SUCCESS_VALIDATION_MESSAGE} type={"Success"} />, {
        toastId: 'toast-show'
      });
			return true;
		}
	})
};

export default authenticationModel;
