import { configureStore } from '@reduxjs/toolkit'
import { authSlice, reportSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        report: reportSlice.reducer
    },
})