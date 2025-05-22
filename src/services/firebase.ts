
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration from the user
const firebaseConfig = {
  apiKey: "AIzaSyB49vRPX8YaWuTP5GS3lsBDqdAaz_hJYAw",
  authDomain: "onlineshop-849c8.firebaseapp.com",
  databaseURL: "https://onlineshop-849c8.firebaseio.com",
  projectId: "onlineshop-849c8",
  storageBucket: "onlineshop-849c8.appspot.com",
  messagingSenderId: "883512833370",
  appId: "1:883512833370:web:a1c8412b158f8744afef63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
