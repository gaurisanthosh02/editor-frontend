import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCmlf2RhqoW_o-rle_5gtz35qy9E3I05Qg",
  authDomain: "text-editor-6e5f5.firebaseapp.com",
  projectId: "text-editor-6e5f5",
  storageBucket: "text-editor-6e5f5.firebasestorage.app",
  messagingSenderId: "588382597949",
  appId: "1:588382597949:web:730cc8c43ca7b7f44ccb54",
  measurementId: "G-017C4QB5QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};