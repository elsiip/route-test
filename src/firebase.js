// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvNHknPOCwvFWPaObmEWM4XcHYbr4B1-Y",
  authDomain: "encome-alterra.firebaseapp.com",
  projectId: "encome-alterra",
  storageBucket: "encome-alterra.appspot.com",
  messagingSenderId: "840983702246",
  appId: "1:840983702246:web:373dc533df0580f5782927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };