
import { async } from "@firebase/util";
import { addReportFirestore, deleteReport, getReports, UpdateReportFirestore } from "../firebase/provider";
import { loadReport, stablishReports, unLoadReport } from "../store/reportSlice"



export const startAddReportFirestore = (path, title, description, date) => {

    return async (dispatch, getState) => {
        dispatch(loadReport());
        try {

            await addReportFirestore(path, title, description, date);
            const { uid } = getState().auth

            const reports = await getReports(`/users/${uid}/reports`);

            dispatch(stablishReports(reports))



        } catch (error) {
            throw new Error(error);
        }
        dispatch(unLoadReport());
    }
}

export const startGettingReports = () => {

    return async (dispatch, getState) => {

        dispatch(loadReport());

        try {


            const { uid } = getState().auth
            const reports = await getReports(`/users/${uid}/reports`);

            dispatch(stablishReports(reports));


        } catch (error) {
            throw new Error(error);
        }
        dispatch(unLoadReport());
    }
}

export const startUpdatingReport = (title, description, newDate, path) => {

    return async (dispatch, getState) => {
        try {
            await UpdateReportFirestore(title, description, newDate, path);
            const { uid } = getState().auth
            const reports = await getReports(`/users/${uid}/reports`);

            dispatch(stablishReports(reports));
        } catch (error) {
            console.log(error)
        }

    }
}

export const startDeletingReport = () => {

    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;
            const { activeReport } = getState().report;

            const resp = await deleteReport(`/users/${uid}/reports/${activeReport.id}`);

            const reports = await getReports(`/users/${uid}/reports`);

            dispatch(stablishReports(reports));

        } catch (error) {
            throw new Error(error);
        }
    }
}


