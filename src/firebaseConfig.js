// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyAXAQmgLFZfhp2g1LCeDDn2SbD_ckntsoo",
  authDomain: "authen-9804d.firebaseapp.com",
  projectId: "authen-9804d",
  storageBucket: "authen-9804d.appspot.com",
  messagingSenderId: "1020898927578",
  appId: "1:1020898927578:web:373e7725ed2c39f2b416e3",
  measurementId: "G-TH94JF2EQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
