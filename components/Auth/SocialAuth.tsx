import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from "firebase/auth";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { firestore } from "@/utils/firebase";
import User from "@/types/User";

const SocialAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any | null>(null);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider
    try {
      const result: UserCredential = await signInWithPopup(getAuth(), provider);
      const firebaseUser = result.user;

      // Prepare the user data to be stored
      const customUser: User = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        isAdmin: false,
      };

      // Set the user state and save to Firestore
      setUser(customUser);
      const userRef = doc(firestore, "users", firebaseUser.uid);
      await setDoc(userRef, customUser, { merge: true });

      console.log("User saved or updated in Firestore:", customUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError({ errorCode, errorMessage, email, credential });
      console.error("Error during Google sign-in:", errorCode, errorMessage);
    }
  };

  // Handle GitHub Sign-In
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider(); // Initialize GithubAuthProvider
    try {
      const result: UserCredential = await signInWithPopup(getAuth(), provider);
      const firebaseUser = result.user;

      // Prepare the user data to be stored
      const customUser: User = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        isAdmin: false,
      };

      // Set the user state and save to Firestore
      setUser(customUser);
      const userRef = doc(firestore, "users", firebaseUser.uid);
      await setDoc(userRef, customUser, { merge: true });

      console.log("User saved or updated in Firestore:", customUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      setError({ errorCode, errorMessage, email, credential });
      console.error("Error during GitHub sign-in:", errorCode, errorMessage);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn}>
          <FaGoogle size={25} />
        </button>

        {/* GitHub Sign-In Button */}
        <button onClick={handleGithubSignIn}>
          <FaGithub size={25} />
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
