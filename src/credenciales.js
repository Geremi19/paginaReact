// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1o7Ui--eIDc-HqIvr6xxqHPQoQZKCVr8",
  authDomain: "uniride-ec144.firebaseapp.com",
  projectId: "uniride-ec144",
  storageBucket: "uniride-ec144.appspot.com",
  messagingSenderId: "353443467693",
  appId: "1:353443467693:web:7d2e594bd0c337eb24d124"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
