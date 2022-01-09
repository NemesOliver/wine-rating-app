import { initializeApp, getApps } from "firebase/app";

// Test config
const firebaseConfig = {
  apiKey: "AIzaSyBoa-HHCVG_0Iu9ANc6uuE3J42cMG9_W0Y",
  authDomain: "wine-app-6647b.firebaseapp.com",
  projectId: "wine-app-6647b",
  storageBucket: "wine-app-6647b.appspot.com",
  messagingSenderId: "30412945252",
  appId: "1:30412945252:web:4e71384c05a31eb008ec71"
};

const initializeFirebase = () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
};

export default initializeFirebase;
