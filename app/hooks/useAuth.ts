import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/utils/firebase";
import User from "@/types/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Extract uid, email, displayName, and photoURL from the Firebase user object
          const { uid, email, displayName, photoURL } = firebaseUser;

          // Set the user state with the correct User object
          setUser({
            uid,
            name: displayName, // Assign displayName to name
            email,
            photoURL, // Assign photoURL
          });
        } else {
          // If no user is authenticated, set the user state to null
          setUser(null);
        }
      }
    );

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  return user;
};
