// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjodJA7k71TUqxfdEjTLe5wwVEx8rtD9Q",
    authDomain: "reports-6305b.firebaseapp.com",
    projectId: "reports-6305b",
    storageBucket: "reports-6305b.appspot.com",
    messagingSenderId: "612675533005",
    appId: "1:612675533005:web:28ae881fe42976d12a9184"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp)