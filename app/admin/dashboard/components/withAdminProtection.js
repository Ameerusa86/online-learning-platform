import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { firestore, auth } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const withAdminProtection = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkAdminStatus = async (user) => {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          console.log("User document:", userDoc.data()); // Debugging line
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.isAdmin) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              toast.error("You are not authorized to access this page.");
              router.push("/");
            }
          } else {
            setIsAdmin(false);
            toast.error("User data not found. Please try again.");
            router.push("/");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          toast.error("An error occurred. Please try again.");
          router.push("/");
        }
      };

      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("Current user:", user); // Debugging line
          checkAdminStatus(user);
        } else {
          setIsAdmin(false);
          toast.error("You need to log in to access this page.");
          router.push("/auth");
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (isAdmin === null) {
      return <p>Loading...</p>;
    }

    return isAdmin ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminProtection;
