"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { auth, firestore } from "@/utils/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

const AuthContext = createContext({ user: null, isLoading: true });

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            isAdmin: false, // Default to non-admin
            createdAt: new Date(),
          });
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
  };
}
