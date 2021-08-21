import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZRBnEUdVppkiH-pxMGMRLIAFKyUMOiZ4",
    authDomain: "kitact-24125.firebaseapp.com",
    projectId: "kitact-24125",
    storageBucket: "kitact-24125.appspot.com",
    messagingSenderId: "778667575523",
    appId: "1:778667575523:web:b6214c23d78cc09a471dd6",
    measurementId: "G-TP8QPGQSC1"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase.auth());

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};