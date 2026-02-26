// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANbWoTse6RR9onhBmUd5kYXwk6iX7Ni_4",
  authDomain: "atal-new-auth.firebaseapp.com",
  projectId: "atal-new-auth",
  storageBucket: "atal-new-auth.firebasestorage.app",
  messagingSenderId: "1037963961985",
  appId: "1:1037963961985:web:ab4dc2bf7439f691e48f80",
  measurementId: "G-1HJWYS47WV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);