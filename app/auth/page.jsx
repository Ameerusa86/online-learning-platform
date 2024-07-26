"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Redirect to home if already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Authentication Error:", error);
      setError(
        "There was an issue with your login credentials. Please try again."
      );
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (userCredential.additionalUserInfo.isNewUser) {
        await setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (userCredential.additionalUserInfo.isNewUser) {
        await setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
      }
      router.push("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        const email = error.customData.email;

        fetchSignInMethodsForEmail(auth, email).then((methods) => {
          if (
            methods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
          ) {
            // Prompt the user to sign in with the email/password method
            const password = prompt(
              "Please enter your password to link GitHub."
            );
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                linkWithCredential(userCredential.user, pendingCred)
                  .then(() => {
                    router.push("/");
                  })
                  .catch((linkError) => {
                    console.error("Linking Error:", linkError);
                    setError(
                      "Linking GitHub to existing account failed. Please try again."
                    );
                  });
              })
              .catch((signInError) => {
                console.error("Sign-in Error:", signInError);
                setError("Sign-in failed. Please try again.");
              });
          } else if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
            // Sign in with Google and link the credentials
            const googleProvider = new GoogleAuthProvider();
            signInWithPopup(auth, googleProvider)
              .then((userCredential) => {
                linkWithCredential(userCredential.user, pendingCred)
                  .then(() => {
                    router.push("/");
                  })
                  .catch((linkError) => {
                    console.error("Linking Error:", linkError);
                    setError(
                      "Linking GitHub to existing account failed. Please try again."
                    );
                  });
              })
              .catch((signInError) => {
                console.error("Sign-in Error:", signInError);
                setError("Sign-in failed. Please try again.");
              });
          } else {
            setError(
              "An account already exists with a different credential. Please try a different login method."
            );
          }
        });
      } else {
        console.error("GitHub Login Error:", error);
        setError("GitHub login failed. Please try again.");
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? "Create an account" : "Login to your account"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <FaGoogle />
            <span>Google</span>
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <FaGithub />
            <span>GitHub</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
