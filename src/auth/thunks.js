import { async } from "@firebase/util";
import { collection, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { loginWithEmailPassword, loginWithFacebook, loginWithGoogle, registerUsertWithEmailPassword } from "../firebase/provider";
import { login, logout, startAuthentication } from "../store"


export const startCreatingUserWithEmailPassword = (name, email, password) => {

    return async (dispatch, getState) => {

        try {
            dispatch(startAuthentication());
            const { uid, photoURL } = await registerUsertWithEmailPassword(name, email, password);

            if (!!uid) {
                dispatch(login({ name, email, uid, photoURL }));
            }
        }

        catch (error) {

            dispatch(logout());
            console.log(error);
            throw new Error(error.message)
        }
    }
}

export const startSignInWithEmailPassword = (email, password) => {

    return async (dispatch, getState) => {

        try {
            dispatch(startAuthentication());
            const { name, uid, photoURL } = await loginWithEmailPassword(email, password);

            if (!!uid) {

                dispatch(login({ name, email, uid, photoURL }));
            }
        }

        catch (error) {

            dispatch(logout());

            Swal.fire({
                icon: 'error',
                title: 'this user does not exist',
            })

            throw new Error("the authentication is not valid")
        }
    }
}

export const startLoginWithGoogle = () => {

    return async (dispatch) => {

        try {


            const user = await loginWithGoogle();
            dispatch(login(user));
            console.log("ok")

        } catch (error) {
            dispatch(logout())
            throw new Error(error)
        }
    }
}

export const startLoginWithFacebook = () => {

    return async (dispatch) => {

        try {

            const user = await loginWithFacebook();
            dispatch(login(user));

        } catch (error) {
            dispatch(logout());
            throw new Error(error);
        }
    }
}