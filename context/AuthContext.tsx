import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import initializeFirebase from "../firebase";

export const AuthContext = createContext({} as AuthProviderValue);

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthProviderValue {
  isSignedIn: boolean | null;
  currentUserId: string;
  userDocId: string;
  setUserDocId: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [userDocId, setUserDocId] = useState("");

  useEffect(() => {
    initializeFirebase();
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setCurrentUserId(user.uid);
      } else {
        setIsSignedIn(false);
        setCurrentUserId("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, currentUserId, userDocId, setUserDocId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
