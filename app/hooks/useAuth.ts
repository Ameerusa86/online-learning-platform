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
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Get the ID token result, which includes custom claims like isAdmin
          const idTokenResult = await firebaseUser.getIdTokenResult();

          // Extract uid, email, displayName, and photoURL from the Firebase user object
          const { uid, email, displayName, photoURL } = firebaseUser;

          // Explicitly cast isAdmin to a boolean (defaulting to false if undefined)
          const isAdmin = !!idTokenResult.claims.isAdmin;

          // Set the user state with the correct User object, including isAdmin
          setUser({
            uid,
            name: displayName || "Anonymous", // Fallback for name
            email: email || "No Email", // Fallback for email
            photoURL, // Assign photoURL
            isAdmin, // Correctly typed boolean
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
