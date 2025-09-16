// utils/db.js
import { firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

interface Course {
  id: string;
  [key: string]: any;
}

export const getCourseById = async (id: string): Promise<Course> => {
  const docRef = doc(firestore, "courses", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Course;
  } else {
    throw new Error("Course not found");
  }
};
