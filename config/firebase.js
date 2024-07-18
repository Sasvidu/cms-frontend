import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGWquDwKPsm_dN0W85Q658182tQegePLI",
  authDomain: "cms-news-e632a.firebaseapp.com",
  projectId: "cms-news-e632a",
  storageBucket: "cms-news-e632a.appspot.com",
  messagingSenderId: "97523940067",
  appId: "1:97523940067:web:77eaa8a1ae404266e2a3d6",
  measurementId: "G-R1LLZ765R8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
