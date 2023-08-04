import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const FIREBASE = initializeApp({
  apiKey: "AIzaSyBv3_vyVJnest7hjDU-8lVpASKPp9quc1g",
  authDomain: "react-native-crud-fireba-ea6c9.firebaseapp.com",
  databaseURL:
    "https://react-native-crud-fireba-ea6c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-crud-fireba-ea6c9",
  storageBucket: "react-native-crud-fireba-ea6c9.appspot.com",
  messagingSenderId: "322123156336",
  appId: "1:322123156336:web:64fa6bb3325ad837145db5",
});

const db = getDatabase(FIREBASE);
const auth = getAuth(FIREBASE);
export { db, auth };
