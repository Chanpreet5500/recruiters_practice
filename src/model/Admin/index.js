import { Action, action, thunk, Thunk } from 'easy-peasy';
import { ToastContainer, toast } from "react-toastify";
import ToastUI from "recruitment-components/ToastUI/ToastUI.js";
import {
	STATUS_CHANGED,
	CLIENT_UPDATED,
	CLIENT_CREATED,
	JOB_DELETED,
	JOB_UPDATED,
	JOB_CREATED,
	CANDIDATE_DELETED,
	CANDIDATE_UPDATED,
	CANDIDATE_CREATED,
	PASSWORD_CHANGE
} from "recruitment-message";
import {
	changePassword,
	createCandidate,
	createClient,
	getCandidates,
	changeStatus,
	paramChangeStatus,
	getActiveParams,
	jobChangeStatus,
	getCandidate,
	updateCandidate,
	deleteCandidate,
	updateProfile,
	getUserProfile,
	getAllCandidates,
	createJob,
	getJobs,
	getJob,
	updateJob,
	deleteJob,
	getCandidatesForJobId,
	sendInviteToCandidate,
	getStripeProducts,
	getProductPrices,
	createCheckoutSession,
	saveTransactionDetails,
	getDashboardData,
	getParams,
	importingCandidates,
	getAllTransactions,
	deactivateAccount,
	createParams,
	getCandidatesWithJob,
	jobIdByInviteId,
	downloadPdf,
	getPdfDetails,
	getJobsSkills
} from 'recruitment-api/AdminApi.js';
const adminModel = {
	setUserProfile: action((state, payload) => {
		state.userProfile = payload;
	}),
	setCandidates: action((state, payload) => {
		state.candidates = payload;
	}),

	setCandidate: action((state, payload) => {
		state.candidate = payload;
	}),
	setJobs: action((state, payload) => {
		state.jobs = payload;
	}),
	setJob: action((state, payload) => {
		state.job = payload;
	}),
	setProducts: action((state, payload) => {
		state.products = payload;
	}),
	setProductPrices: action((state, payload) => {
		state.productPrices = payload;
	}),
	setDashboardData: action((state, payload) => {
		state.dashboardData = payload;
	}),
	setCandidateSuggestion: action((state, payload) => {
		state.candidateSuggestion = payload;
	}),
	setParams: action((state, payload) => {
		state.parameters = payload;
	}),
	setTransaction: action((state, payload) => {
		state.transactions = payload;
	}),
	setInvite : action((state, payload) =>{
		state.invite = payload
	}),
	setResultData : action((state, payload) => {
		state.resultData = payload
	}),
	setDownloadPdf : action((state, payload) => {
		state.generatePdf = payload
	}),
	setPdfData : action((state, payload) => {
		state.pdfData = payload
	}),
	setJobsParams : action((state, payload) => {
		state.jobsParams = payload
	}),
	createCandidate: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createCandidate(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			//await actions.setCandidates(response.data.candidates);
			actions.setCandidate(undefined)

			toast.success(<ToastUI message={CANDIDATE_CREATED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),
	//----getting parameters------->
	getParams: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getParams(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {

			await actions.setParams(response.data.parameters);
			return true;
		}
	}),

	createJob: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createJob(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			//await actions.setCandidates(response.data.candidates);
			actions.setCandidate(undefined)

			toast.success(<ToastUI message={JOB_CREATED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),
	updateJob: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateJob(payload);
		
		toast.success(<ToastUI message={JOB_UPDATED} type={"Success"} />, {
			toastId: 'toast-show'
		});
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			//await actions.setCandidates(response.data.candidates);
			await actions.setJob(undefined)
			console.log(JOB_UPDATED)

			return true;
		}
	}),
	createClient: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createClient(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.errors.email.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			//await actions.setCandidates(response.data.candidates);
			//actions.setCandidate(undefined)

			toast.success(<ToastUI message={CLIENT_CREATED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),
	changeStatus: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await changeStatus(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			toast.success(<ToastUI message={STATUS_CHANGED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			await actions.setCandidates(response.data.candidates);
			return true;
		}
	}),


	paramChangeStatus: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await paramChangeStatus(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			toast.success(<ToastUI message={STATUS_CHANGED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			await actions.setParams(response.data.parameters);
			return true;
		}
	}),

	getActiveParams: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getActiveParams(payload);
		//toast.dismiss();
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setParams(response.data.parameters);
		}
	}),

	jobChangeStatus: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await jobChangeStatus(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			toast.success(<ToastUI message={STATUS_CHANGED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			await actions.setJobs(response.data.jobs);
			return true;
		}
	}),

	updateCandidate: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateCandidate(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setCandidates(response.data.candidates);
			actions.setCandidate(undefined)
			toast.success(<ToastUI message={CANDIDATE_UPDATED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),

	getCandidates: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getCandidates(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setCandidates(response.data.candidates);
			return true;
		}
	}),

	deleteCandidate: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteCandidate(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setCandidates(response.data.candidates);
			toast.success(<ToastUI message={CANDIDATE_DELETED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),

	deleteJob: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await deleteJob(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setJobs(response.data.jobs);
			toast.success(<ToastUI message={JOB_DELETED} type={"Success"} />, {
				toastId: 'toast-show'
			});
			return true;
		}
	}),

	getCandidate: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getCandidate(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {

			return response.data.candidate;
		}
	}),
	getJob: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getJob(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {

			return response.data.job;
		}
	}),
	getCandidatesForJobId: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getCandidatesForJobId(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			return response.data.candidates;
		}
	}),
	getCandidatesWithJob: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getCandidatesWithJob(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			return response.data.candidates;
		}
	}),

	setProfile: action((state, payload) => {
		state.profile = payload;
	}),
	createParams: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createParams(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: "toast-show",
			});
			return false;
		} else {
			await actions.setParams(response.data.param);

			return true;
		}
	}),

	updateProfile: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await updateProfile(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			toast.success(<ToastUI message={CLIENT_UPDATED} type={"Success"} />, { toastId: 'toast-show' });
			await actions.setUserProfile(response.data.user);
			return true;
		}
	}),
	getAllCandidates: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getAllCandidates();
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setAllCandidates(response.data);
		}
	}),
	getJobs: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getJobs(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setJobs(response.data.jobs);
		}
	}),
	sendInviteToCandidate: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await sendInviteToCandidate(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
			await actions.setUserProfile(response.data.user);
			toast.success(<ToastUI message={response.data.message} type={"Success"} />, { toastId: 'toast-show' });
			return true;
		}
	}),
	changePassword: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await changePassword(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			toast.success(<ToastUI message={PASSWORD_CHANGE} type={"Success"} />);
			return true;
		}
	}),
	getStripeProducts: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getStripeProducts(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.message} type={"error"} />);
			return false
		} else {
			await actions.setProducts(response.data.products)
			return true;
		}
	}),
	getProductPrices: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getProductPrices(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			await actions.setProductPrices(response.data.prices)
			return true;
		}
	}),
	createCheckoutSession: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await createCheckoutSession(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			return response.data.redirectUrl;
		}
	}),
	saveTransactionDetails: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await saveTransactionDetails(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			toast.success(<ToastUI message={"Tests purchased successfully"} type={"Success"} />);
			await actions.setUserProfile(response.data.user);
			localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
			return true
		}
	}),
	getDashboardData: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getDashboardData(payload);
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"error"} />);
			return false
		} else {
			await actions.setDashboardData(response.data.dashboardData);
			return true
		}
	}),
	getUserProfile: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getUserProfile(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.setUserProfile(response.data.user);
			return true
		}
	}),

	importingCandidates: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await importingCandidates(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.a.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await actions.getCandidates({ clientId: payload.candidates[0].candidate_client_id })
		}
	}),

	getAllTransactions: thunk(async (action, payload, { getStoreActions }) => {
		let response = await getAllTransactions(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			await action.setTransaction(response.data.transactions)
			return true
		}
	}),
	deactivateAccount: thunk(async (action, payload, { getStoreActions }) => {
		let response = await deactivateAccount(payload);
		
		if (!response.success) {
			toast.error(<ToastUI message={response.data.message} type={"Error"} />, {
				toastId: 'toast-show'
			});
			return false
		} else {
			return true
		}
	}),

	jobIdByInviteId: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await jobIdByInviteId(payload);
		if(!response) {
			return false
		} else  {
			await actions.setResultData(response.data.data)
			return true
		}
	}),

	downloadPdf: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await downloadPdf(payload);
		if(!response) {
			return false
		} else { 
			return response
		}
	}),

	getPdfDetails: thunk(async (actions, payload, { getStoreActions }) => {
		let response = await getPdfDetails(payload);
		if(!response) {
			return false
		} else { 
			await actions.setPdfData(response.data)
		}
	}),

	getJobsSkills: thunk(async (actions, payload, { getStoreActions }) => {

		console.log(actions, payload, "EVRY--ACTION")
		let response = await getJobsSkills(payload);

		if(!response) {
			return false
		} else {
			await actions.setJobsParams(response.data)
		}
	}),

};



export default adminModel;
