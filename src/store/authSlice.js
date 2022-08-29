import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({

    name: 'auth',

    initialState: {
        authentication: "checking",
        name: null,
        uid: null,
        email: null,
        photoURL: null
    },

    reducers: {

        startAuthentication: (state) => {
            state.authentication = "checking";
        },

        login: (state, { payload }) => {
            state.authentication = "authenticated";
            state.name = payload.name || payload.displayName;
            state.uid = payload.uid;
            state.email = payload.email;
            state.photoURL = payload.photoURL;
            localStorage.setItem("user", JSON.stringify(payload));
        },

        logout: (state) => {
            state.authentication = "not-authenticated";
            state.name = null;
            state.uid = null;
            state.email = null;
            state.photoURL = null;
            localStorage.clear();
        }

    }
});


// Action creators are generated for each case reducer function
export const { startAuthentication, login, logout } = authSlice.actions;