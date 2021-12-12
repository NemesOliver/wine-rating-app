import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB8-d1srQPrZwegCNKBgdwVU62lJ2lMXY4",
  authDomain: "fir-test-97ab8.firebaseapp.com",
  projectId: "fir-test-97ab8",
  storageBucket: "fir-test-97ab8.appspot.com",
  messagingSenderId: "528828613832",
  appId: "1:528828613832:web:d10f55576875d7223511fd",
};

const initializeFirebase = () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
};

export default initializeFirebase;
