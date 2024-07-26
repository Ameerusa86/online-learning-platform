// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading };
};

export default useAuth;
