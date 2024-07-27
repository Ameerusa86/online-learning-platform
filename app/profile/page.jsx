"use client";

import { useEffect, useState } from "react";
import { auth, firestore, storage } from "../../utils/firebase";
import ProtectedRoute from "../components/ProtectedRoute";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion";
import { FaUserEdit, FaSave, FaUpload } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
          setName(currentUser.displayName || "");

          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.isAdmin);
          }

          const coursesSnapshot = await getDocs(
            collection(firestore, "courses")
          );
          const userCourses = coursesSnapshot.docs.filter(
            (doc) => doc.data().userId === currentUser.uid
          );
          setCourses(userCourses.map((doc) => doc.data()));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      const userDocRef = doc(firestore, "users", currentUser.uid);

      if (name) {
        await updateProfile(currentUser, { displayName: name });
      }
      if (password) {
        await updatePassword(currentUser, password);
      }
      if (profilePic) {
        const storageRef = ref(storage, `profilePics/${currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, profilePic);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload error:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(currentUser, { photoURL: downloadURL });
            await setDoc(
              userDocRef,
              { photoURL: downloadURL },
              { merge: true }
            );
            setProfilePic(null);
          }
        );
      }

      // Save additional user data to Firestore
      await setDoc(
        userDocRef,
        {
          displayName: name,
          isAdmin: isAdmin,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Profile
        </h1>
        <div className="mb-6 flex flex-col items-center">
          {user && (
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2">
            <FaUpload />
            <span>Upload New Picture</span>
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          {user?.providerData[0].providerId === "password" && (
            <div>
              <label className="block text-lg font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          )}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={isAdmin ? "Admin" : "User"}
              disabled
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
            >
              <FaSave />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Enrolled Courses
          </h2>
          <ul className="list-disc pl-5 text-gray-800">
            {courses.map((course, index) => (
              <li key={index} className="mb-2">
                {course.title}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
