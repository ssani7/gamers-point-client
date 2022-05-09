// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmO-AsVJkSr5Y-WwITMp5JbC-raCaDch8",
    authDomain: "assignment11-gpu-incentory.firebaseapp.com",
    projectId: "assignment11-gpu-incentory",
    storageBucket: "assignment11-gpu-incentory.appspot.com",
    messagingSenderId: "89449813640",
    appId: "1:89449813640:web:21ede35564839936d1b13d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;