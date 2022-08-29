import { createSlice } from '@reduxjs/toolkit';

export const reportSlice = createSlice({

    name: 'report',

    initialState: {
        isModalActive: false,
        isLoadingReport: false,
        reports: null,
        activeReport: null,
        isLoadingActiveReport: false
    },

    reducers: {

        onActiveModal: (state) => {
            state.isModalActive = true;
        },

        desActiveModal: (state) => {
            state.isModalActive = false;
        },

        loadReport: (state) => {
            state.isLoadingReport = true;
        },

        unLoadReport: (state) => {
            state.isLoadingReport = false;
        },

        stablishReports: (state, { payload }) => {
            state.reports = payload;
        },

        cleanReports: (state) => {
            state.reports = [];
        },

        onActiveReport: (state, { payload }) => {
            state.activeReport = payload;
        },

        desActiveReport: (state) => {
            state.activeReport = null
        },

    }
});


// Action creators are generated for each case reducer function
export const { onActiveModal, desActiveModal, loadReport, unLoadReport, stablishReports, cleanReports, onActiveReport, desActiveReport } = reportSlice.actions;