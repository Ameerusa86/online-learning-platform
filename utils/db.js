// utils/db.js
import { firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCourseById = async (id) => {
  const docRef = doc(firestore, "courses", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Course not found");
  }
};
