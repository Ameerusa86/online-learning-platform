"use client";

import { useEffect, useState } from "react";
import { firestore, auth } from "@/utils/firebase"; // Ensure correct path
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserFullName, setNewUserFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        setUsers(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword || !newUserFullName) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        email: newUserEmail,
        fullName: newUserFullName,
        isAdmin: false,
        createdAt: new Date(),
      });

      setUsers([
        ...users,
        {
          id: user.uid,
          email: newUserEmail,
          fullName: newUserFullName,
          isAdmin: false,
        },
      ]);
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserFullName("");
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use.");
      } else {
        console.error("Error adding user:", error.message);
        setErrorMessage("Error adding user.");
      }
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { isAdmin: !isAdmin });

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error toggling admin status:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={newUserFullName}
          onChange={(e) => setNewUserFullName(e.target.value)}
          className="border p-2 rounded-md mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add User
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {users.map((user) => (
          <div key={user.id} className="border p-4 m-2 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{user.email}</h2>
            <p>{user.isAdmin ? "Admin" : "User"}</p>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
              className={`${
                user.isAdmin ? "bg-gray-500" : "bg-blue-500"
              } text-white px-4 py-2 rounded-md shadow-md hover:${
                user.isAdmin ? "bg-gray-600" : "bg-blue-600"
              } focus:ring-2 focus:${
                user.isAdmin ? "ring-gray-500" : "ring-blue-500"
              } focus:ring-opacity-50 mt-2 ml-2`}
            >
              {user.isAdmin ? "Downgrade to User" : "Upgrade to Admin"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersDashboard;
