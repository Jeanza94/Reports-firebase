import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { firebaseAuth, firebaseDB } from "./config";
import { collection, addDoc, getDocs, query, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";



export const registerUsertWithEmailPassword = async (name, email, password) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;
        console.log(user);

        //update displayname because is null at the first
        await updateProfile(firebaseAuth.currentUser, {
            displayName: name,
            photoURL: "http://www.w3.org/TR/SVG-access/tiger.png"
        });

        return { uid: user.uid, photoURL: user.photoURL }
    }

    catch (error) {
        throw new Error(error.message);
    }
}

export const loginWithEmailPassword = async (email, password) => {

    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        return { uid: user.uid, photoURL: user.photoURL, name: user.displayName }

    }

    catch (error) {
        throw new Error(error.message);
    }

}

export const loginWithGoogle = async () => {

    try {

        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(firebaseAuth, provider);

        const { displayName, email, uid, photoURL } = user;
        return {
            name: displayName,
            email,
            uid,
            photoURL
        }

    } catch (error) {
        throw new Error(error);
    }
}

export const loginWithFacebook = async () => {

    try {

        const provider = new FacebookAuthProvider();
        const { user } = await signInWithPopup(firebaseAuth, provider);

        const { displayName, email, uid, photoURL } = user;
        return {
            name: displayName,
            email,
            uid,
            photoURL
        }

    } catch (error) {

        throw new Error("no acepto nada", error);
    }
}

export const addReportFirestore = async (path, title, description, date) => {

    try {
        const docRef = await addDoc(collection(firebaseDB, path), {
            title,
            description,
            date,
            id: new Date().getTime()
        });


    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'We couldnt add the report'
        })
        console.error("Error adding document: ", error);
    }
}

export const getReports = async (path) => {

    try {

        // const resp = await getDocs(collection(firebaseDB, path))

        // resp.forEach(doc => {
        //     reports.push(doc.data());

        // })
        const reports = [];
        const q = await getDocs((query(collection(firebaseDB, path), orderBy("id"))));
        q.forEach(doc => {
            reports.push({ id: doc.id, data: doc.data() });

        })

        return reports;

    } catch (error) {
        console.log(error.message)
    }
}

export const UpdateReportFirestore = async (title, description, newDate, path) => {

    try {

        await setDoc(doc(firebaseDB, path), {
            title,
            description,
            date: newDate,
            id: new Date().getTime()
        });
        console.log("ok")


    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteReport = async (path) => {

    try {

        await deleteDoc(doc(firebaseDB, path));
        console.log("ok");

    } catch (error) {
        throw new Error(error);
    }
}