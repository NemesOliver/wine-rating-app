import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import initializeFirebase from "../firebase";

export const AuthContext = createContext({} as AuthProviderValue);

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthProviderValue {
  isSignedIn: boolean;
  currentUser: string;
}

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    initializeFirebase();
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setCurrentUser(user.uid);
      } else {
        setIsSignedIn(false);
        setCurrentUser("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
