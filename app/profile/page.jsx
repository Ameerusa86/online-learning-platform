// app/profile/page.js
"use client";

import { useEffect, useState } from "react";
import { auth, firestore } from "../../utils/firebase";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUser(user);
        const snapshot = await firestore
          .collection("users")
          .doc(user.uid)
          .collection("courses")
          .get();
        setCourses(snapshot.docs.map((doc) => doc.data()));
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>{user.email}</h1>
        <h2>Enrolled Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.title}</li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
